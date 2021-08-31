import * as fs from "fs";
import expect from 'expect'
import readline from 'readline';

const testMap :string[] = [
  "..##.......",
  "#...#...#..",
  ".#....#..#.",
  "..#.#...#.#",
  ".#...##..#.",
  "..#.##.....",
  ".#.#.#....#",
  ".#........#",
  "#.##...#...",
  "#...##....#",
  ".#..#...#.#",
];

async function readMapFile(filename :string) {
  let myMap :string[] = [];
  const fileStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

 for await (const line of rl) { 
  myMap.push(line);
 }

  return myMap;
}

function part_one(useMap :string[], r: number, d: number){
  let currCol :number = 0;
  let currRow :number = 0;
  let lineLength = useMap[0].length;
  let currTrees :number = 0;

  while (currRow < useMap.length) {
    currCol = (currCol+r)%lineLength;
    currRow += d
    let currWord = useMap[currRow];
    if (currRow < useMap.length && currWord.charAt(currCol) === '#') {
      currTrees += 1;
    }
  }
  
  return currTrees;
}

describe('calculate', function() {
    it('add', function() {
      let result = 5+2;
      expect(result).toBe(7);
    }); 
  });

describe('Day 3', () =>{
  it("should pass example from the site", () => {
    expect(part_one(testMap, 3, 1)).toBe(7)
  });

  it("it should be possible to read the map from the file", async () => {
    let theMap :string[] = await readMapFile('test_input.txt');

    expect(theMap.length).toBe(11); // 10 lines
    expect(theMap[0].charAt(3)).toBe('#'); // just a simple example
  });

  it("should work all the way for part one", async () => {
    let theMap :string[] = await readMapFile('test_input.txt');
    expect(part_one(theMap, 3, 1)).toBe(7);
  });
  
  it("should work all the way for part one, my input", async () => {
    let theMap :string[] = await readMapFile('input.txt');
    expect(part_one(theMap, 3, 1)).toBe(181);
  });

});