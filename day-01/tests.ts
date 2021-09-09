import { expect} from 'chai'
import {readLineByLine } from '../utils/utils'

const testInput = ["1721", "979", "366", "299", "675", "1456"]

function partOne(input :string[]) :number {
    // find the two entries that sum 2020
    let d :Record<number, number> = {};

    for (let i in input) {
        let val = parseInt(input[i]);
        d[val] = 2020 - val; 
    }

    for (let k in d) { 
        if (d[k]) {
            return parseInt(k) * d[k];
        }
    }
    
    return 0;
}

function findPartThatSums(d :Record<number, number>, find :number) :number {
    for (let k in d) { 
        let val = find - parseInt(k);
        if (d[val]) { 
            return parseInt(k) * val;
        }
    }
    
    return 0
}

function partTwo(input :string[]) :number {
    let d :Record<number, number> = {};

    for (let i in input) {
        let val = parseInt(input[i]);
        d[val] = 2020 - val; 
    }

    for (let k in d) {
        let missing = 2020 - parseInt(k)
        let v = findPartThatSums(d, missing)
        if (v != 0) {
            return parseInt(k) * v
        }
    }
    
    return 0;
}

describe('Day ONE', function(){
    it('Part one works with initial test case', () => {
        expect(partOne(testInput)).to.equal(514579);
    });

    it('Part one works with my input', async () => {
        expect(partOne(await readLineByLine("./day-01/input.txt"))).to.equal(73371);
    });

    it('Part two works with initial test case', () => {
        expect(partTwo(testInput)).to.equal(241861950);
    });

    it('Part two works with my input', async () => {
        expect(partTwo(await readLineByLine("./day-01/input.txt"))).to.equal(127642310);
    });
});

   