# BoundingBoxTS

Running the project is pretty straight forward.

First, install [Node.js](https://nodejs.org/en/download/).

Then, clone the repository:
```
git clone https://github.com/oz-elhassid/BoundingBoxTS.git
```
if you don't have git installed or don't want to use the command line, you can use the green `Clone or download` button to download as zip.

Then, to install the package, navigate to the cloned directory and run:
```
npm install
```
In order to run the tests, run:
```
npm test
```
## Test Cases
The `tests.ts` file includes a few simple tests, and some basic usage examples.  
It creates 6 BoundingBoxes, and creates an array containing said BoundingBoxes.  
Than it goes on to check the relations between some of the boxes and creates an array of separate boxes from the original array.  
The `tests.ts` file demonstrate how to use the optional `inside` argument. By passing one of the `boxRelation` enum items, one can decide how to treat a box inside another box (default is to treat the boxes as separate).  
That functionality is tested by checking the relation between a box inside another box twice, once with the parameter set to `inside` and once without passing the parameter at all.  
The array is also tested twice, when the two boxes are not considered separate, one of the boxes is removed.