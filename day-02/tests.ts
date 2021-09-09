import { expect } from "chai";
import {readLineByLine } from '../utils/utils'

const testSample :string[] = ["1-3 a: abcde","1-3 b: cdefg","2-9 c: ccccccccc"];

function parsePasswordPartOne(input :string) :boolean {
    let count = 0;
    let parts = input.split(" ");
    let indexes = parts[0].split("-")
    let idx1 = parseInt(indexes[0]);
    let idx2 = parseInt(indexes[1]);
    let letter = parts[1][0]

    for (let i=0; i< parts[2].length; i++) {
        let c = parts[2][i];

        if (c === letter) count += 1;
    }

    return count >= idx1 && count <= idx2;
}

function parsePasswordPartTwo(input :string) :boolean {
    let count = 0;
    let parts = input.split(" ");
    let indexes = parts[0].split("-")
    let idx1 = parseInt(indexes[0]);
    let idx2 = parseInt(indexes[1]);
    let letter = parts[1][0]

    if (parts[2][idx1-1] === letter ) count+=1
    if (parts[2][idx2-1] === letter ) count+=1
    
    return count === 1;
}

function partOne(input :string[]) :number { 
    let count :number = 0;
    for (let i in input) {
        if (parsePasswordPartOne(input[i])) count += 1
    }
    
    return count;
}

function partTwo(input :string[]) :number { 
    let count :number = 0;
    for (let i in input) {
        if (parsePasswordPartTwo(input[i])) count += 1
    }
    
    return count;
}

describe("Day 2", () => {
    it("Part one, sample test", () => {
        expect(partOne(testSample)).to.eq(2);
    });

    it("Part one, my input", async () => {
        expect(partOne(await readLineByLine("./day-02/input.txt"))).to.eq(628);
    });

    it("Part two, sample test",() => {
        expect(partTwo(testSample)).to.eq(1);
    })

    it("Part two, my input", async () => {
        expect(partTwo(await readLineByLine("./day-02/input.txt"))).to.eq(705);
    });
});