const intersectText: string = "intersect";
const separateText: string = "separate";
const invalidVertical: string = "invalid - top should be above bottom";
const invalidHorizontal: string = "invalid - right value should be greater than left value";
const subsetIntersect: boolean = true;              // weather a box inside another considered intersection

export interface BoundingBox {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

const linesToBox = (left: number, right: number, top: number, bottom: number) : BoundingBox => {
    let box =  {left: left, right: right, top: top, bottom: bottom};
    checkBox(box);
    return box;
}

const checkBox = (box: BoundingBox) : Error => {
    if (box.left > box.right)
        return new RangeError(invalidHorizontal);
    if (box.bottom > box.top)
        return new RangeError(invalidVertical);
    return null;
}

export const checkRelation = (box1: BoundingBox, box2: BoundingBox, insideIntersect: boolean = subsetIntersect ) : string => {
    const valid1 = checkBox(box1);
    const valid2 = checkBox(box2);
    if (valid1 !== null)
        return valid1.message + " - box1";
    if (valid2 !== null)
        return valid2.message + " - box2";
    if (box1.left <= box2.right && box2.left <= box1.right && box1.bottom <= box2.top && box2.bottom <= box1.top) {
        if (insideIntersect)
            return intersectText;
        else
            if (!(box1.left > box2.left && box1.right < box2.right && box1.top < box2.top && box1.bottom > box2.bottom) && !(box2.left > box1.left && box2.right < box1.right && box2.top < box1.top && box2.bottom > box1.bottom))
                return intersectText;
    }
    return separateText;
}

// returns arr without box and every BoundingBox that intersects with it
const removeIntersect = (arr: BoundingBox[], box: BoundingBox) : BoundingBox[] => {
    return arr.filter((box2) => checkRelation(box, box2) === separateText);
}

// returns a subset of arr, containing only separate BoundingBoxes
export const checkArray = (arr: BoundingBox[]) : BoundingBox[] => {
    let sortedArr: BoundingBox[] = arr.sort((box1, box2) => box1.right - box2.right !== 0 ? box1.right - box2.right : box1.top - box2.top);
    let output: BoundingBox[] = [];
    while (sortedArr.length > 0) {
        output.push(sortedArr[0]);
        sortedArr = removeIntersect(sortedArr, sortedArr[0]);
    }
    return output;
}
