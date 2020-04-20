import { BoundingBox, checkRelation, checkArray, boxRelation } from "./BoundingBox";

const boxA: BoundingBox = {left: 10, right: 30, top: 30, bottom: 10};
const boxB: BoundingBox = {left: 20, right: 50, top: 50, bottom: 20};
const boxC: BoundingBox = {left: 70, right: 90, top: 90, bottom: 70};
const boxD: BoundingBox = {left: 100.9, right: 200.9, top: 200.9, bottom: 100.9};
const boxE: BoundingBox = {left: 150, right: 190.5, top: 190.5, bottom: 150.5};
const arr: BoundingBox[] = [boxA, boxB, boxC, boxD, boxE, boxB, boxD];

console.log(checkRelation(boxA, boxB));
console.log(checkRelation(boxA, boxC));
console.log(checkRelation(boxD, boxE));
console.log(checkArray(arr));
console.log(checkRelation(boxD, boxE, boxRelation.inside));
console.log(checkArray(arr, boxRelation.inside));
