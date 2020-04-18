enum relation {
    intersect = "intersect",
    separate = "separate"
}

export interface point {
    x: number;
    y: number;
};

export class BoundingBox {
    left: number;
    right: number;
    top: number;
    bottom: number;

    constructor (left: number, right: number, top: number, bottom: number) {
        if (left > right)
            throw new RangeError("invalid: right value should be greater than left value");
        if (bottom > top)
            throw new RangeError("invalid: bottom should be below top");
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }

    static pointsToBox (p1: point, p2: point) : BoundingBox {
        if (p1.x > p2.x) {                      // p1 is to the right of p2
            if (p1.y > p2.y)                    // p1 is above p2
                return new BoundingBox (p2.x, p1.x, p1.y, p2.y);
            return new BoundingBox (p2.x, p1.x, p2.y, p1.y);
        }
        if (p1.y > p2.y)                        // p1 is above and to the left of p2
            return new BoundingBox (p1.x, p2.x, p1.y, p2.y);
        return new BoundingBox (p1.x, p2.x, p2.y, p1.y);
    }
};

export const checkRelation = (box1: BoundingBox, box2: BoundingBox) : string => {
    if (box1.left <= box2.right && box2.left <= box1.right && box1.bottom <= box2.top && box2.bottom <= box1.top)
        return relation.intersect;
    return relation.separate;
}

var rectA = new BoundingBox(10, 30, 30, 10);
var rectB = new BoundingBox(20, 50, 50, 20);
var rectC = new BoundingBox(70, 90, 90, 70);

console.log(checkRelation(rectA, rectB));  // returns true
console.log(checkRelation(rectA, rectC));  // returns false