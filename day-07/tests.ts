import { expect } from "chai";
import * as fs from "fs";

const sampleInput = "light red bags contain 1 bright white bag, 2 muted yellow bags.\ndark orange bags contain 3 bright white bags, 4 muted yellow bags.\nbright white bags contain 1 shiny gold bag.\nmuted yellow bags contain 2 shiny gold bags, 9 faded blue bags.\nshiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.\ndark olive bags contain 3 faded blue bags, 4 dotted black bags.\nvibrant plum bags contain 5 faded blue bags, 6 dotted black bags.\nfaded blue bags contain no other bags.\ndotted black bags contain no other bags.";

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

describe("Day Seven", () => {
    it("Part one, example", () => { 
        expect(partOne(sampleInput,"shiny gold")).to.eq(4);
    });

    it("Part one, my input", () => { 
        expect(partOne(fs.readFileSync("./day-07/input.txt").toString('utf-8'),"shiny gold")).to.eq(289);
    });
});