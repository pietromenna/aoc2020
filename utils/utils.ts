import * as fs from "fs";
import readline from 'readline';

export async function readLineByLine(fname: string): Promise<string[]> {
    let fileContents: string[] = [];

    const fileStream = fs.createReadStream(fname);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) { 
        fileContents.push(line);
       }

    return fileContents;
}