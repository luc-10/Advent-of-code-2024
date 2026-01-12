import * as fs from "fs";

export function readLine(path: string): string {
    return fs.readFileSync(path, "utf-8").trimEnd();
}

export function readNumbers(path: string): number[] {
    const numbers = readLine(path).trim().split(/\s+/).map(Number);
    return numbers;
}