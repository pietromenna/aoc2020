import { expect } from "chai";
import * as fs from "fs";


const firstExample :string = "abcx\nabcy\nabcz";
const secondExample :string = "abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb";

function partOne(input :string) :number {
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

function processByGroup(input :string, f: (i: string) => number ) :number {
    let count = 0;
    const groups = input.split("\n\n");

    groups.forEach((g) => {
        count += f(g);
    });

    return count;
}

function partTwo(input :string) :number {
    // break into array of strings separated
    const lines = input.split("\n");
    const questions :Map<string, any>= new Map();
    let count = 0;

    lines.forEach((line) => {
        for(let i=0; i< line.length; i++){
            if (questions.has(line[i])) {
                questions.set(line[i], questions.get(line[i])+1);
            } else {
                questions.set(line[i],1);
            }
        };
    });

    questions.forEach((_, v) => {
        if (questions.get(v) === lines.length) count += 1;
    })

    return count;
}

describe("Day Six", () => {
    it("Part one, first example", () => {
        expect(processByGroup(firstExample, partOne)).to.eq(6);
    });

    it("Part one, second example", () => {
        expect(processByGroup(secondExample, partOne)).to.eq(11);
    });

    it("Part One, my input", () => {
        expect(processByGroup(fs.readFileSync("./day-06/input.txt").toString('utf-8'), partOne)).to.eq(6521);
    });

    it("Part Two, example",() => {
        expect(processByGroup(secondExample, partTwo)).to.eq(6);
    });

    it("Part Two, my input",() => {
        expect(processByGroup(fs.readFileSync("./day-06/input.txt").toString('utf-8'), partTwo)).to.eq(3305);
    });
});