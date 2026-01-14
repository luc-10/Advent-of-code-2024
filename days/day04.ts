import { readLines } from '../io/readFile';
export function day4(){
    day4Part1();
    day4Part2();
}

export function day4Part1(){
    const data = readLines("inputFiles/day04.txt")
    let xmasCount = 0;
    for (let i = 0; i<data.length; i++){
        for (let j = 0; j<data[i].length; j++) {
            if (data[i][j]==='X'){
                xmasCount += countXMAS(data, i, j);
            }
        }
    }
    console.log(xmasCount);
}

export function day4Part2(){
    const data = readLines("inputFiles/day04.txt")
    let masCount = 0;
    for (let i = 1; i<data.length-1; i++){
        for (let j = 1; j<data[i].length-1; j++) {
            if (data[i][j]==='A'){
                masCount += countMAS(data, i, j);
            }
        }
    }
    console.log(masCount);
}

function countMAS(matrix: string[], i: number, j: number): number{
    if ((matrix[i-1][j-1] === matrix[i-1][j+1] || matrix[i-1][j-1] === matrix[i+1][j-1]) &&
        (matrix[i+1][j+1] === matrix[i-1][j+1] || matrix[i+1][j+1] === matrix[i+1][j-1]) && 
        (matrix[i-1][j-1] === 'M' || matrix[i-1][j-1] === 'S') && 
        (matrix[i+1][j+1] === 'M' || matrix[i+1][j+1] === 'S') && 
        (matrix[i-1][j-1] !== matrix[i+1][j+1])
    ) {
        return 1;
    } else {
        return 0;
    }
}

function getNextLetter(c: string): string{
    switch (c){
        case 'X':
            return 'M';
        case 'M':
            return 'A';
        case 'A':
            return 'S';
        case 'S':
            return '1';
        default:
            return '0'; 
    }
}

function countXMAS(matrix: string[], i: number, j: number): number{
    let xmasCount = 0;
    for (let di = -1; di<=1; di++){
        for (let dj = -1; dj <= 1; dj++){
            if (di===0 && dj===0) continue;
            xmasCount+=checkXMAS(matrix, i, j, di, dj, 'X');
        }
    }
    return xmasCount;
}

function checkXMAS(matrix: string[], i: number, j: number, di: number, dj: number, currLetter: string): number{
    if (i<0 || i>=matrix.length || j<0 || j>=matrix[i].length) return 0;
    if (matrix[i][j] === currLetter) {
        if (getNextLetter(currLetter) === '1'){
            return 1;
        }
        return checkXMAS(matrix, i+di, j+dj, di, dj, getNextLetter(currLetter));
    } else {
        return 0;
    }
}