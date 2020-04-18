enum relation {
    intersect = "intersect",
    separate = "separate"
}

export interface point {
    x: number;
    y: number;
};

export interface BoundingBox {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

const linesToBox = (left: number, right: number, top: number, bottom: number) : BoundingBox => {
    let box =  {left: left, right: right, top: top, bottom: bottom};
    checkBox(box);
    return box;
}

const pointsToBox =  (p1: point, p2: point) : BoundingBox  => {
    if (p1.x > p2.x) {                      // p1 is to the right of p2
        if (p1.y > p2.y)                    // p1 is above p2
            return {left: p2.x, right: p1.x, top: p1.y, bottom: p2.y};
        return {left: p2.x, right: p1.x, top: p2.y, bottom: p1.y};
    }
    if (p1.y > p2.y)                        // p1 is above and to the left of p2
        return {left: p1.x, right: p2.x, top: p1.y, bottom: p2.y};
    return {left: p1.x, right: p2.x, top: p2.y, bottom: p1.y};
}

const checkBox = (box: BoundingBox) : Error => {
    if (box.left > box.right)
        return new RangeError("invalid: right value should be greater than left value");
    if (box.bottom > box.top)
        return new RangeError("invalid: bottom should be below top");
    return null;
}

export const checkRelation = (box1: BoundingBox, box2: BoundingBox) : string => {
    const valid1 = checkBox(box1);
    const valid2 = checkBox(box2);
    if (valid1 !== null)
        return (valid1.message);
    if (valid2 !== null)
        return (valid2.message);
    if (box1.left <= box2.right && box2.left <= box1.right && box1.bottom <= box2.top && box2.bottom <= box1.top)
        return relation.intersect;
    return relation.separate;
}

let rectA: BoundingBox = {left: 10, right: 30, top: 30, bottom: 10};
let rectB: BoundingBox = {left: 20, right: 50, top: 50, bottom: 20};
let rectC: BoundingBox = {left: 70, right: 90, top: 90, bottom: 170};

console.log(checkRelation(rectA, rectB));
console.log(checkRelation(rectA, rectC));