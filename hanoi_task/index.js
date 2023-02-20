const fileContent = require("fs").readFileSync(process.argv[2], "utf-8");
const lines = fileContent.split(/\r?\n/);
let tileCount, stackCount, eachLine = [];
var first = [];

for (let i = 0; i < lines.length; i++) {
    arr = lines[i].split(" ");
    eachLine.push([arr[0],arr[1]]);
}
tileCount = Number(eachLine[0][0]);
stackCount = Number(eachLine[0][1]);

eachLine.shift();
var stacks = {};
for (let g = 1; g <= stackCount; g++){
    stacks[g]=[];
}
for (let i = tileCount; i >= 1; i--) {
    stacks[1].push(i);
    first.push(i);
}
console.log(stacks);
for( let x = 0; x < eachLine.length; x++){
    let from = eachLine[x][0];
    let to = eachLine[x][1];
    let element = stacks[from].pop();
    let lastElement = stacks[to][stacks[to].length-1];
    if( lastElement < element){
        console.error("You can't place bigger tile on the smaller one!!");
        process.exit(1);
    }
    stacks[to].push(element);
    console.table(stacks);
}
if( first.toString() != stacks[stackCount].toString() ){
    console.error("You have not finished the puzzle, please continue!")
    process.exit(1);
}
console.log("Congratulations! You have successfully solved the Hanoi puzzle.");
