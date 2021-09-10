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

const sampleAllInvalid: string[] = [
    "eyr:1972 cid:100",
    "hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926",
    "",
    "iyr:2019",
    "hcl:#602927 eyr:1967 hgt:170cm",
    "ecl:grn pid:012533040 byr:1946",
    "",
    "hcl:dab227 iyr:2012",
    "ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277",
    "",
    "hgt:59cm ecl:zzz",
    "eyr:2038 hcl:74454a iyr:2023",
    "pid:3556412378 byr:2007",
]

const sampleAllValid: string[] = [
    "pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980",
    "hcl:#623a2f",
    "",
    "eyr:2029 ecl:blu cid:129 byr:1989",
    "iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm",
    "",
    "hcl:#888785",
    "hgt:164cm byr:2001 iyr:2015 cid:88",
    "pid:545766238 ecl:hzl",
    "eyr:2022",
    "",
    "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
]

function sToN(s: string | undefined): number {
    if (typeof s === "string") {
        return parseInt(s)
    }
    return 0;
}

class Passport {
    public byr: string | undefined; //(Birth Year)
    public iyr: string | undefined; //(Issue Year)
    public eyr: string | undefined; //(Expiration Year)
    public hgt: string | undefined; //(Height)
    public pid: string | undefined; //(Passport ID)
    public cid: string | undefined;//(Country ID)
    public hcl: string | undefined; //(Hair Color)
    public ecl: string | undefined; //(Eye Color)
    public lines: string[] = [];

    public isValidPartOne(): boolean {
        if (this.byr === undefined) return false;
        if (this.iyr === undefined) return false;
        if (this.eyr === undefined) return false;
        if (this.hgt === undefined) return false;
        if (this.hcl === undefined) return false;
        if (this.ecl === undefined) return false;
        if (this.pid === undefined) return false;
        return true;
    }

    public isValidPartTwo(): boolean {
        if (!this.isValidPartOne()) {
            return false;
        }
        let byr: number = sToN(this.byr)
        if (byr < 1920 || byr > 2002) {
            return false;
        }

        let iyr: number = sToN(this.iyr)
        if (iyr < 2010 || iyr > 2020) {
            return false;
        }

        let eyr: number = sToN(this.eyr)
        if (eyr < 2020 || eyr > 2030) {
            return false;
        }

        if (!this.validateHeight()) {
            return false;
        }
        if (!this.validateHCL()) {
            return false;
        }
        if (!this.validateECL()) {
            
            return false;
        }
        if (!this.validatePID()) {
            return false;
        }

        return true;
    }

    private validateHeight(): boolean {
        let parts = this.hgt?.split("cm")
        if (parts?.length === 2) {
            let h = parseInt(parts[0])
            if (h >= 150 && h <= 193) return true
        }
        parts = this.hgt?.split("in")
        if (parts?.length === 2) {
            let h = parseInt(parts[0])
            if (h >= 59 && h <= 76) return true
        }
        return false;
    }

    private validateHCL(): boolean {
        let hcl :string = this.hcl || "";
        for (let i = 0; i < hcl.length; i++) {
            let c :string = hcl.charAt(i);
            if (i === 0 && c != "#") {
                return false;
            }
            else if (i > 0 && i < 7) {
                if (c !== "0" &&
                    c !== "1" &&
                    c !== "2" &&
                    c !== "3" &&
                    c !== "4" &&
                    c !== "5" &&
                    c !== "6" &&
                    c !== "7" &&
                    c !== "8" &&
                    c !== "9" &&
                   c !== "a" &&
                    c !== "b" &&
                    c !== "c" &&
                    c !== "d" &&
                    c !== "e" &&
                    c !== "f") {
                        return false;
                    }
            } 
        }
        return true;
    }

    private validateECL(): boolean {
        if (this.ecl === "amb" ||
            this.ecl === "blu" ||
            this.ecl === "brn" ||
            this.ecl === "gry" ||
            this.ecl === "grn" ||
            this.ecl === "hzl" ||
            this.ecl === "oth"
        ) return true;
        return false;
    }

    private validatePID(): boolean {
        return this.pid?.length === 9;
    }

    public printLines() {
        this.lines.forEach((l) => {
            console.log(l);
        });
        console.log("\n")
    }
}

function processLine(line: string, passport: Passport) {
    passport.lines.push(line)
    let pairs = line.split(" ")
    pairs.forEach((p) => {
        let kvp = p.split(":")
        switch (kvp[0]) {
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
    let passports: Passport[] = [];
    let currentPassport = new Passport();

    for (let l = 0; l < input.length; l++) {
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

function partTwo(input: string[]): number {
    let count = 0;
    let passports: Passport[] = [];
    let currentPassport = new Passport();

    for (let l = 0; l < input.length; l++) {
        if (input[l] === "") {
            passports.push(currentPassport)
            currentPassport = new Passport()
        } else {
            processLine(input[l], currentPassport)
        }
    }
    passports.push(currentPassport)

    passports.forEach((p) => {
        if (p.isValidPartTwo()) count += 1
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

    it("Part Two - Example All Invalid", () => {
        expect(partTwo(sampleAllInvalid)).to.eq(0);
    })

    it("Part Two - Example All Valid", () => {
        expect(partTwo(sampleAllValid)).to.eq(4);
    })

    it("Part Two - My Input", async () => {
        expect(partTwo(await readLineByLine("./day-04/input.txt"))).to.eq(140);
    })
});