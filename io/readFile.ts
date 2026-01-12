import * as fs from "fs";

export function readLine(path: string): string {
    return fs.readFileSync(path, "utf-8").trimEnd();
}

export function readNumbers(path: string): number[] {
    return readLine(path).trim().split(/\s+/).map(Number);
}

export function readLines(path: string): string[] {
    return readLine(path).trim().split('\n')
}

export function readNumberLines(path: string): number[][]{ 
    return readLines(path).map(line => line.trim().split(/\s+/).map(Number));
}