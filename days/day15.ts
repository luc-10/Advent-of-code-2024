import { readLine } from "../io/readFile"

export function day15(){
    day15Part1()
    day15Part2()
}

export function day15Part1(){
    const data = readLine("inputFiles/day15.txt")
    const splitData = data.split("\n\n")
    const matrix = splitData[0].split('\n')
    const movement = splitData[1].replace(/\n/g, "")
    let pos = findInMatrix(matrix, '@')
    for(let i = 0; i< movement.length; i++){
        let dir = getDirection(movement[i])
        if (canMoveAndMove(matrix, pos, dir)) pos = [pos[0]+dir[0], pos[1]+dir[1]]
    }
    console.log(calcGPSCoords(matrix))
}

export function day15Part2(){
    const data = readLine("inputFiles/day15.txt")
    const splitData = data.split("\n\n")
    const matrix = splitData[0].split('\n').map(
        row => row.split("").map(c => turnToDoubleTable(c)).join(""))
    const movement = splitData[1].replace(/\n/g, "")
    let pos = findInMatrix(matrix, '@')
    let queue: number[][] = []
    for(let i = 0; i< movement.length; i++){
        let dir = getDirection(movement[i])
        if (canMoveInDouble(matrix, pos, dir, queue)) 
            {

                queue = Array.from(new Set(queue.map(a => JSON.stringify(a)))).map(s => JSON.parse(s));
                pos = [pos[0]+dir[0], pos[1]+dir[1]]
                queue.forEach((value, _) => {
                moveInDouble(matrix, value, dir)
            
            })
        }
        queue = []
    }

    console.log(calcGPSCoords(matrix))
}

function findInMatrix(matrix: string[], char: string): number[] {
    for (let i = 0; i<matrix.length; i++){
        for (let j = 0; j<matrix[i].length; j++){
            if (matrix[i][j] === char) {
                return [i, j]
            }
        }
    }
    return [-1, -1]
}

function getDirection(char: string): number[] {
    switch(char) {
        case '<':
            return [0, -1]
        case '>':
            return [0, 1]
        case '^':
            return [-1, 0]
        case 'v':
            return [1, 0]
    }
    return [0, 0]
}

function canMoveAndMove(matrix: string[], pos: number[], dir: number[]): boolean {

    if (matrix[pos[0]][pos[1]] === '#') return false 
    else if (matrix[pos[0]][pos[1]] === '.') return true
    else if (matrix[pos[0]][pos[1]] === 'O' || matrix[pos[0]][pos[1]] === '@') {
        if (canMoveAndMove(matrix, [pos[0]+dir[0], pos[1]+dir[1]], dir)) {
            if (matrix[pos[0]][pos[1]] === '@') {
                swapCells(matrix, pos, [pos[0]+dir[0], pos[1]+dir[1]])
                const row = matrix[pos[0]].split("");
                row[pos[1]] = '.';
                matrix[pos[0]] = row.join("");
            } else {
                swapCells(matrix, pos, [pos[0]+dir[0], pos[1]+dir[1]])
            }
            return true
        } else {
            return false
        }
    }
    return true
}

function canMoveInDouble(matrix: string[], pos: number[], dir: number[], queue: number[][], isSecondPart: boolean = false): boolean {
    if (matrix[pos[0]][pos[1]] === '#') return false 
    else if (matrix[pos[0]][pos[1]] === '.') return true
    else if (matrix[pos[0]][pos[1]] === '@') {
        if (canMoveInDouble(matrix, [pos[0]+dir[0], pos[1]+dir[1]], dir, queue)) {

            queue.push(pos)
            return true
        } else return false
    } else if (isDirHorizontal(dir)) {
        // dir is horizontal

        if (canMoveInDouble(matrix, [pos[0]+dir[0], pos[1]+dir[1]], dir, queue)) {
            queue.push(pos)
            return true
        } else {
            return false
        }

    } else {
        // dir is vertical

        if (matrix[pos[0]][pos[1]] === '[') {

            if (isSecondPart) {
                if (canMoveInDouble(matrix, [pos[0]+dir[0], pos[1]+dir[1]], dir, queue)) {
                    queue.push(pos)
                    return true
                } else {
                    queue = []
                    return false
                }
            } else {
                if (canMoveInDouble(matrix, [pos[0]+dir[0], pos[1]+dir[1]], dir, queue) && canMoveInDouble(matrix, [pos[0], pos[1]+1], dir, queue, true)) {
                    queue.push(pos)
                    return true
                } else { 
                    queue = []
                    return false
                }
            }
        } else if (matrix[pos[0]][pos[1]] === ']') {

            if (isSecondPart) {
                if (canMoveInDouble(matrix, [pos[0]+dir[0], pos[1]+dir[1]], dir, queue)) {
                    queue.push(pos)
                    return true
                } else {
                    queue = []
                    return false
                }
            } else {
                if (canMoveInDouble(matrix, [pos[0]+dir[0], pos[1]+dir[1]], dir, queue) && canMoveInDouble(matrix, [pos[0], pos[1]-1], dir, queue, true)) {
                    queue.push(pos)
                    return true
                } else {
                    queue = []
                    return false
                }
            }
        } 
        
    }
    return false
}

function isDirHorizontal(dir: number[]): boolean {
    return dir[0]===0
}

function moveInDouble(matrix: string[], pos: number[], dir: number[]) {
    swapCells(matrix, pos, [pos[0]+dir[0], pos[1]+dir[1]])                
    const row = matrix[pos[0]].split("");
    row[pos[1]] = '.';
    matrix[pos[0]] = row.join("");
}



function calcGPSCoords(matrix: string[]): number {

    let sum = 0

    for (let i = 0; i< matrix.length; i++){
        for (let j = 0; j< matrix[i].length; j++){
            if (matrix[i][j]==='O' || matrix[i][j] === '[') {
                sum += i*100 + j
            }
        }
    }
    return sum
}

function swapCells(matrix: string[], coord1: number[], coord2: number[]) {
    const row1 = matrix[coord1[0]].split("");
    const row2 = matrix[coord2[0]].split("");

    const tmp = row1[coord1[1]];
    row1[coord1[1]] = row2[coord2[1]];
    row2[coord2[1]] = tmp;

    matrix[coord1[0]] = row1.join("");
    matrix[coord2[0]] = row2.join("");
}

function turnToDoubleTable(char: string): string {
    switch(char) {
        case '.':
        return '..'
        case '#':
        return '##'
        case 'O':
        return '[]'
        case '@':
        return '@.'
    }
    return ".."
}
