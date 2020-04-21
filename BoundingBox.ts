export interface point {
    x: number;
    y: number;
}

export const pointsToBox = (p1: point, p2: point) : BoundingBox => {
    return {left: p1.x < p2.x ? p1.x : p2.x,
            right: p1.x > p2.x ? p1.x : p2.x,
            top: p1.y > p2.y ? p1.y : p2.y,
            bottom: p1.y < p2.y ? p1.y : p2.y};
}

export const enum boxRelation {
    intersect = "intersect",
    separate = "separate",
    invalidVertical = "invalid - top should be above bottom",
    invalidHorizontal = "invalid - right value should be greater than left value",
    invalidInside = "invalid - one box is inside the other",
    inside = "one box is inside the other"
}
const defaultInside: boxRelation = boxRelation.separate;

export interface BoundingBox {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

const checkBox = (box: BoundingBox) : Error => {
    if (box.left > box.right)
        return new RangeError(boxRelation.invalidHorizontal);
    if (box.bottom > box.top)
        return new RangeError(boxRelation.invalidVertical);
    return null;
}

// check whether box1 intersects box2. Choose how to treat a box inside a box by using the optional inside parameter 
export const checkRelation = (box1: BoundingBox, box2: BoundingBox, inside: boxRelation = defaultInside) : string => {
    const valid1 = checkBox(box1);
    const valid2 = checkBox(box2);
    if (valid1 !== null)
        return valid1.message + " - box1";
    if (valid2 !== null)
        return valid2.message + " - box2";
    if (box1.left <= box2.right && box2.left <= box1.right && box1.bottom <= box2.top && box2.bottom <= box1.top) {
        if ((box1.left > box2.left && box1.right < box2.right && box1.top < box2.top && box1.bottom > box2.bottom) || (box2.left > box1.left && box2.right < box1.right && box2.top < box1.top && box2.bottom > box1.bottom))
            return inside;
        return boxRelation.intersect;
    }
    return boxRelation.separate;
}

// returns arr without box and every BoundingBox that intersects with it
const removeIntersect = (arr: BoundingBox[], box: BoundingBox, inside: boxRelation = defaultInside) : BoundingBox[] => {
    return arr.filter((box2) => checkRelation(box, box2, inside) === boxRelation.separate);
}

// returns a subset of arr, containing only separate BoundingBoxes
export const checkArray = (arr: BoundingBox[], inside: boxRelation = defaultInside) : BoundingBox[] => {
    let sortedArr: BoundingBox[] = arr.sort((box1, box2) => box1.right - box2.right !== 0 ? box1.right - box2.right : box1.top - box2.top);
    let output: BoundingBox[] = [];
    while (sortedArr.length > 0) {
        output.push(sortedArr[0]);
        sortedArr = removeIntersect(sortedArr, sortedArr[0], inside);
    }
    return output;
}
