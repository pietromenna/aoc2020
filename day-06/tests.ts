import { expect } from "chai";
import * as fs from "fs";


const firstExample :string = "abcx\nabcy\nabcz";
const secondExample :string = "abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb\n";

function partOneEachGroup(input :string) :number {
    // break into array of strings separated
    const lines = input.split("\n");
    const questions :Set<string>= new Set();
    let count = 0;

    lines.forEach((line) => {
        for(let i=0; i< line.length; i++) questions.add(line[i]);
    });

    questions.forEach(() => { 
        count += 1;
    })

    return count;
}

function partOne(input :string) :number {
    let count = 0;
    const groups = input.split("\n\n");

    groups.forEach((g) => {
        count += partOneEachGroup(g);
    });

    return count;
}

describe("Day Six", () => {
    it("Part one, first example", () => {
        expect(partOne(firstExample)).to.eq(6);
    });

    it("Part one, second example", () => {
        expect(partOne(secondExample)).to.eq(11);
    });

    it("Part One, my input", () => {
        expect(partOne(fs.readFileSync("./day-06/input.txt").toString('utf-8'))).to.eq(6521);
    })
});