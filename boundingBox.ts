const intersectText: string = "intersect";
const separateText: string = "separate";
const invalidVertical: string = "invalid - top should be above bottom";
const invalidHorizontal: string = "invalid - right value should be greater than left value";

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

const checkBox = (box: BoundingBox) : Error => {
    if (box.left > box.right)
        return new RangeError(invalidHorizontal);
    if (box.bottom > box.top)
        return new RangeError(invalidVertical);
    return null;
}

export const checkRelation = (box1: BoundingBox, box2: BoundingBox) : string => {
    const valid1 = checkBox(box1);
    const valid2 = checkBox(box2);
    if (valid1 !== null)
        return valid1.message + " - box1";
    if (valid2 !== null)
        return valid2.message + " - box2";
    if (box1.left <= box2.right && box2.left <= box1.right && box1.bottom <= box2.top && box2.bottom <= box1.top)
        return intersectText;
    return separateText;
}

let rectA: BoundingBox = {left: 10, right: 30, top: 30, bottom: 10};
let rectB: BoundingBox = {left: 20, right: 50, top: 50, bottom: 20};
let rectC: BoundingBox = {left: 70, right: 90, top: 90, bottom: 170};

console.log(checkRelation(rectA, rectB));
console.log(checkRelation(rectA, rectC));