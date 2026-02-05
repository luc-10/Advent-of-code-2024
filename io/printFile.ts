import * as fs from "fs";

export function printLines(path: string, matrix: string[]) {
    fs.writeFileSync(path, matrix.join("\n"))
}