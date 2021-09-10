import { expect } from "chai";
import { readLineByLine } from '../utils/utils'

const sampleInput: string[] = [
    "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd",
    "byr:1937 iyr:2017 cid:147 hgt:183cm",
    "",
    "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884",
    "hcl:#cfa07d byr:1929",
    "",
    "hcl:#ae17e1 iyr:2013",
    "eyr:2024",
    "ecl:brn pid:760753108 byr:1931",
    "hgt:179cm",
    "",
    "hcl:#cfa07d eyr:2025 pid:166559648",
    "iyr:2011 ecl:brn hgt:59in",
    ""
]

class Passport {
    public byr: string | undefined; //(Birth Year)
    public iyr: string | undefined; //(Issue Year)
    public eyr: string | undefined; //(Expiration Year)
    public hgt: string | undefined; //(Height)
    public pid: string | undefined; //(Passport ID)
    public cid: string | undefined;//(Country ID)
    public hcl: string | undefined; //(Hair Color)
    public ecl: string | undefined; //(Eye Color)
    public lines :string[] = [];
    
    public isValidPartOne() :boolean {
        if (this.byr === undefined) return false;
        if (this.iyr === undefined) return false;
        if (this.eyr === undefined) return false;
        if (this.hgt === undefined) return false;
        if (this.hcl === undefined) return false;
        if (this.ecl === undefined) return false;
        if (this.pid === undefined) return false;
        return true;
    }

    public printLines() {
        this.lines.forEach((l) => {
            console.log(l);
        });
        console.log("\n")
    }

}

function processLine(line :string, passport :Passport) {
    passport.lines.push(line)
    let pairs = line.split(" ")
    pairs.forEach((p) => {
        let kvp = p.split(":")
        switch(kvp[0]) {
            case "byr": {
                passport.byr = kvp[1]
                break;
            }
            case "iyr": {
                passport.iyr = kvp[1]
                break;
            } 
            case "eyr": {
                passport.eyr = kvp[1]
                break;
            }
            case "hgt": {
                passport.hgt = kvp[1]
                break;
            }   
            case "pid": {
                passport.pid = kvp[1]
                break;
            }
            case "cid": {
                passport.cid = kvp[1]
                break;
            }
            case "hcl": {
                passport.hcl = kvp[1]
                break;
            }
            case "ecl": {
                passport.ecl = kvp[1]
                break;
            }
        }
    });
}

function partOne(input: string[]): number {
    let count = 0;
    let passports :Passport[] = [];
    let currentPassport = new Passport();

    for (let l=0; l < input.length; l++) {
        if (input[l] === "") {
            passports.push(currentPassport)
            currentPassport = new Passport()
         } else {
             processLine(input[l], currentPassport)
         }
    }
    passports.push(currentPassport)

    passports.forEach((p) => {
        if (p.isValidPartOne()) count += 1
    });

    return count;
}

describe("day FOUR", () => {
    it("Part One - With sample data", () => {
        expect(partOne(sampleInput)).to.eq(2);
    });

    it("Part One - My input", async () => {
        expect(partOne(await readLineByLine("./day-04/input.txt"))).to.eq(222);
    });
});