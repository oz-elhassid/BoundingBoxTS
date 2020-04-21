import { BoundingBox, checkRelation, checkArray, boxRelation, pointsToBox } from "./BoundingBox";

const passed: string = "Test passed";
const failed: string = "Test failed"
let totalTests: number = 0;
let passedTests: number = 0;

const test = (str1: string, str2: string) : string => {
    totalTests++;
    if (str1.slice(0, str2.length) === (str2)) {
        passedTests++;
        return passed;
    }
    return failed;
}

const testLen = (arr: BoundingBox[], n: number) : string => {
    totalTests++;
    if (arr.length <= n){
        passedTests++;
        return passed;
    }
    return failed;
}

const boxA: BoundingBox = {left: 10, right: 30, top: 30, bottom: 10};
const boxAbyPoints: BoundingBox = pointsToBox({x:10, y:30}, {x:30, y:10});
const boxB: BoundingBox = {left: 20, right: 50, top: 50, bottom: 20};
const boxC: BoundingBox = {left: 70, right: 90, top: 90, bottom: 70};
const boxD: BoundingBox = {left: 100.9, right: 200.9, top: 200.9, bottom: 100.9};
const boxE: BoundingBox = {left: 150, right: 190.5, top: 190.5, bottom: 150.5};
const boxF: BoundingBox = {left: 40, right: 30, top: 30, bottom: 10};
const arr: BoundingBox[] = [boxA, boxB, boxC, boxD, boxE, boxB, boxD];

console.log("boxA and boxF: " + checkRelation(boxA, boxF) + " - " + test(checkRelation(boxA, boxF), boxRelation.invalidHorizontal));
console.log("boxA and boxB: " + checkRelation(boxA, boxB) + " - " + test(checkRelation(boxA, boxB), boxRelation.intersect));
console.log("boxA and boxC: " + checkRelation(boxA, boxC) + " - " + test(checkRelation(boxA, boxC), boxRelation.separate));
console.log("boxD and boxE: " + checkRelation(boxD, boxE) + " - " + test(checkRelation(boxD, boxE), boxRelation.separate));         // separate is the default for a box in a box
console.log("a separate array created from arr:");
console.log(checkArray(arr));
console.log("the array's length is " + (testLen(checkArray(arr), 4) === passed ? " <= 4 - " + passed : " > 4 - " + failed));
console.log("boxD and boxE not assuming a box in a box is separate: " + checkRelation(boxD, boxE, boxRelation.inside) + " - " + test(checkRelation(boxD, boxE, boxRelation.inside), boxRelation.inside));
console.log("a separate array created from arr not assuming a box in a box is separate:");
console.log(checkArray(arr, boxRelation.inside));
console.log("the array's length is " + (testLen(checkArray(arr, boxRelation.inside),3) === passed ? " <= 3 - " + passed : " > 3 - " + failed));
console.log("comparing boxA created using four edges to boxA created using two points - " + test(JSON.stringify(boxA), JSON.stringify(boxAbyPoints)));
console.log("passed " + passedTests + "/" + totalTests + " tests");
