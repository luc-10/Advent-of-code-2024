import { readNumbers } from "../io/readFile"

export function day1(){
    day1Part1()
    day1Part2()
}

export function day1Part1(){

    const data = readNumbers("inputFiles/day01.txt");
    const leftCol = data.filter((_, index) => index % 2 === 0).sort((a, b) => a - b);
    const rightCol = data.filter((_, index) => index % 2 === 1).sort((a, b) => a - b);
    let distSum = 0;
    for (let i = 0; i < leftCol.length; i++){
        distSum += Math.abs(leftCol[i]-rightCol[i]);
    }
    console.log(distSum);
}

export function day1Part2(){

    const data = readNumbers("inputFiles/day01.txt");
    const leftCol = data.filter((_, index) => index % 2 === 0);
    const occurrences = new Map<number, number>();
    for (let i = 1; i < data.length; i+=2){
        occurrences.set(data[i], (occurrences.get(data[i]) ?? 0) + 1);
    }
    let similarityScore = 0;
    leftCol.forEach((value, _) => similarityScore += value * (occurrences.get(value) ?? 0));
    console.log(similarityScore);
}

