import { expect } from "chai";
import { readLineByLine } from '../utils/utils'

class BoardingPass {
    public row :number;
    public col :number;

    public sId() :number {
        return (this.row * 8) + this.col;
     }
    
     constructor(i :string) { 
        let lR = 0;
        let hR = 127;
        let lC = 0;
        let hC = 7;
        for(let c=0;c < i.length; c++) { 
            switch (i[c]) { 
                case "F": {
                    hR = Math.floor(hR - (((hR - lR) / 2)));
                    //console.log("hR to"+ hR);
                    break;
                }
                case "B": { 
                    lR = Math.floor(lR +1 + ((hR - lR) / 2));
                    // console.log("lR to"+ lR);
                    break;
                }
                case "L": { 
                    hC = Math.floor(hC - (((hC - lC) / 2)));
                    // console.log("hC to"+ hC);
                    break;
                }
                case "R": {
                    lC = Math.floor(lC + 1 +  ((hC - lC) / 2));
                    // console.log("lC to"+ lC);
                    break;
                }
            }

        }
        this.row = lR;
        this.col = lC;
    }
}

function partOne(i :string[]) :number {
    let highest = 0;

    i.forEach((l) => {
        let bp :BoardingPass = new BoardingPass(l);
        if (highest <= bp.sId()) {
            highest = bp.sId();
        }
    })

    return highest;
}

function partTwo(i :string[]) :number {
    let mySeat = 0;
    let allBp :boolean[] = [];
    for (let i=0; i<1024; i++) {
        allBp.push(false);
    }

    i.forEach((l) => {
        let bp :BoardingPass = new BoardingPass(l);
        allBp[bp.sId()] = true
    })

    for (let i=0; i<1024; i++) {
        if (!allBp[i] && allBp[i+1] && allBp[i-1]) mySeat = i
    }
    
    return mySeat;
}

describe("Day - 5 F I V E", () => {
    it("Part One, Sample data FBFBBFFRLR", () => {
        let bp :BoardingPass = new BoardingPass("FBFBBFFRLR");
        expect(bp.row).to.equal(44);
        expect(bp.col).to.equal(5);
    });
    
    it("Part One, Sample data BFFFBBFRRR", () => {
        let bp :BoardingPass = new BoardingPass("BFFFBBFRRR");
        expect(bp.row).to.equal(70);
        expect(bp.col).to.equal(7);
        expect(bp.sId()).to.equal(567);
    });

    it("Part One, Sample data FFFBBBFRRR", () => {
        let bp :BoardingPass = new BoardingPass("FFFBBBFRRR");
        expect(bp.row).to.equal(14);
        expect(bp.col).to.equal(7);
        expect(bp.sId()).to.equal(119);
    });

    it("Part One, Sample data BBFFBBFRLL", () => {
        let bp :BoardingPass = new BoardingPass("BBFFBBFRLL");
        expect(bp.row).to.equal(102);
        expect(bp.col).to.equal(4);
        expect(bp.sId()).to.equal(820);
    });

    it("part One - My input", async () => {
        expect(partOne(await readLineByLine("./day-05/input.txt"))).to.eq(904);
    });

    it("part two - My input", async () => {
        expect(partTwo(await readLineByLine("./day-05/input.txt"))).to.eq(669);
    });
})