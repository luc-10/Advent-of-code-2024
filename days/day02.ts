import { readNumberLines } from "../io/readFile";

export function day2(){
    day2Part1();
    day2Part2();
}

export function day2Part1(){
    const data = readNumberLines("inputFiles/day02.txt");
    let safeReports = 0;
    data.forEach((value, _) => safeReports+=checkSafety(value)? 1 : 0);

    console.log(safeReports)
}

export function day2Part2(){
    const data = readNumberLines("inputFiles/day02.txt");
    let safeReports = 0;
    data.forEach((value, _) => safeReports+=checkSafetyWithError(value)? 1: 0);

    console.log(safeReports);
}

function checkSafety(report: number[]): boolean {
    if (report[0] > report[1]) report.reverse();
    for (let i = 0; i < report.length-1; i++){
        const diff = report[i+1]-report[i];
        if (diff <= 0 || diff >= 4) return false;
    }
    return true;
}

function checkSafetyWithError(report: number[]): boolean {
    if (checkSafety(report)) return true;
    
    for (let i = 0; i < report.length; i++){
        if (checkSafety(report.filter((_, index) => i !== index))) {
            return true;
        }
    }
    return false;
}