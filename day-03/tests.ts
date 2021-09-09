import { readLineByLine } from '../utils/utils'
import { expect } from "chai";

const testMap: string[] = [
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

function part_one(useMap: string[], r: number, d: number) {
    let currCol: number = 0;
    let currRow: number = 0;
    let lineLength = useMap[0].length;
    let currTrees: number = 0;

    while (currRow < useMap.length) {
        currCol = (currCol + r) % lineLength;
        currRow += d
        let currWord = useMap[currRow];
        if (currRow < useMap.length && currWord.charAt(currCol) === '#') {
            currTrees += 1;
        }
    }

    return currTrees;
}

function part_two(useMap: string[]) {
    const r1 = part_one(useMap, 1, 1);
    const r2 = part_one(useMap, 3, 1);
    const r3 = part_one(useMap, 5, 1);
    const r4 = part_one(useMap, 7, 1);
    const r5 = part_one(useMap, 1, 2);

    return r1 * r2 * r3 * r4 * r5;
}

describe('Day 3', () => {
    it("should pass example from the site", () => {
        expect(part_one(testMap, 3, 1)).to.eq(7)
    });

    it("it should be possible to read the map from the file", async () => {
        expect(testMap.length).to.eq(11); // 10 lines
        expect(testMap[0].charAt(3)).to.eq('#'); // just a simple example
    });

    it("should work all the way for part one", async () => {
        expect(part_one(testMap, 3, 1)).to.eq(7);
    });

    it("should work all the way for part one, my input", async () => {
        let theMap = await readLineByLine("./day-03/input.txt")
        expect(part_one(theMap, 3, 1)).to.eq(181);
    });

    it("should work example of part 2", () => {
        expect(part_two(testMap)).to.eq(336);
    });

    it("part 2 - my input", async () => {
        let theMap = await readLineByLine("./day-03/input.txt")
        expect(part_two(theMap)).to.eq(1260601650);
    });
});
