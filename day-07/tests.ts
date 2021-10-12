import { expect } from "chai";
import * as fs from "fs";

const sampleInput = "light red bags contain 1 bright white bag, 2 muted yellow bags.\ndark orange bags contain 3 bright white bags, 4 muted yellow bags.\nbright white bags contain 1 shiny gold bag.\nmuted yellow bags contain 2 shiny gold bags, 9 faded blue bags.\nshiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.\ndark olive bags contain 3 faded blue bags, 4 dotted black bags.\nvibrant plum bags contain 5 faded blue bags, 6 dotted black bags.\nfaded blue bags contain no other bags.\ndotted black bags contain no other bags.";
const sampleInput2 = "shiny gold bags contain 2 dark red bags.\ndark red bags contain 2 dark orange bags.\ndark orange bags contain 2 dark yellow bags.\ndark yellow bags contain 2 dark green bags.\ndark green bags contain 2 dark blue bags.\ndark blue bags contain 2 dark violet bags.\ndark violet bags contain no other bags.";

interface Bag {
    name: string,
    children: Record<string,number>
}

function parseLine(input :string) :Bag{ 
    const name = input.match(/^(\w+ \w+)/)?.[0] ?? '';
    const contained = input.match(/(\d+) (\w+ \w+)/g);
    const children :Record<string, number> = {}
    contained?.forEach((l) => {
        const qty = parseInt(l);
        const words = l.split(" ");
        const children_name :string = words[1] + " " + words[2]; // I need to learn in a more elegant way to do this... ugly
        children[children_name] = qty;
    });
    
    return { 
        name: name,
        children: children,
    }
}

function parseBags(input: string) :Map<string, Bag> {
    const bags = new Map<string, Bag>();
    const lines = input.split("\n")
    lines.forEach((line) => {
        const bag = parseLine(line);
        bags.set(bag.name, bag);
     });

    return bags;
}

function canContain(name :string, lf :string, bags : Map<string, Bag>) :boolean {
    const b = bags.get(name);
    if (lf === name) return true;
    for (const k in b?.children) {
        if (canContain(k, lf, bags)) return true;
    }
    return false;
}

function partOne(input: string, bag :string) :number {
    const bags = parseBags(input);
    let count = 0;
    bags.forEach((_, n) => {
        if (n !== bag && canContain(n, bag, bags)) count += 1;
    });

    return count;
}

function containsBags(name :string, bags : Map<string, Bag>) :number {
    let count = 1;
    const b = bags.get(name);
    for (const k in b?.children) {
        count += b?.children[k]! * containsBags(k,bags);
    }
    return count;
}

function partTwo(input: string, bag :string) :number {
    const bags = parseBags(input);

    return containsBags(bag, bags) - 1 ;
}

describe("Day Seven", () => {
    it("Part one, example", () => { 
        expect(partOne(sampleInput,"shiny gold")).to.eq(4);
    });

    it("Part one, my input", () => { 
        expect(partOne(fs.readFileSync("./day-07/input.txt").toString('utf-8'),"shiny gold")).to.eq(289);
    });

    it("part two, example 1", () => {
        expect(partTwo(sampleInput,"shiny gold")).to.eq(32);
    });

    it("part two, example 2", () => {
        expect(partTwo(sampleInput2,"shiny gold")).to.eq(126);
    });

    it("part two, my input", () => {
        expect(partTwo(fs.readFileSync("./day-07/input.txt").toString('utf-8'),"shiny gold")).to.eq(30055);
    });
});