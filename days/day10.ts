import { readDigitLines } from "../io/readFile"

export function day10(){
    day10Part1()
    day10Part2()
}

export function day10Part1(){
    const data = readDigitLines("inputFiles/day10.txt")
    let score = 0
    for (let i = 0; i<data.length;i++) {
        for (let j = 0; j<data[i].length;j++){
            if (data[i][j]===0) {
                const visited: boolean[][] = data.map(row => Array(row.length).fill(false))
                score += calcTrailScore(data, [i, j], visited, 0)
            }
        }
    }
    console.log(score)
}

export function day10Part2(){
    const data = readDigitLines("inputFiles/day10.txt")
    let score = 0
    for (let i = 0; i<data.length;i++) {
        for (let j = 0; j<data[i].length;j++){
            if (data[i][j]===0) {
                score += calcTrailRating(data, [i, j], 0)
            }
        }
    }
    console.log(score)
}

function calcTrailScore(matrix: number[][], pos: number[], visited: boolean[][], num: number): number {
    if (pos[0]<0 || pos[0]>=matrix.length || pos[1]<0 || pos[1]>=matrix[pos[0]].length || visited[pos[0]][pos[1]] || matrix[pos[0]][pos[1]] !== num) {
        return 0
    } else if (matrix[pos[0]][pos[1]] === 9) {
        visited[pos[0]][pos[1]] = true
        return 1
    }
    let score = 0
    visited[pos[0]][pos[1]] = true
    score += calcTrailScore(matrix, [pos[0]-1, pos[1]], visited, num+1)
    score += calcTrailScore(matrix, [pos[0]+1, pos[1]], visited, num+1)
    score += calcTrailScore(matrix, [pos[0], pos[1]-1], visited, num+1)
    score += calcTrailScore(matrix, [pos[0], pos[1]+1], visited, num+1)
    return score

}

function calcTrailRating(matrix: number[][], pos: number[], num: number){
    if (pos[0]<0 || pos[0]>=matrix.length || pos[1]<0 || pos[1]>=matrix[pos[0]].length || matrix[pos[0]][pos[1]] !== num) {
        return 0
    } else if (matrix[pos[0]][pos[1]] === 9) {
        return 1
    }
    let score = 0
    score += calcTrailRating(matrix, [pos[0]-1, pos[1]], num+1)
    score += calcTrailRating(matrix, [pos[0]+1, pos[1]], num+1)
    score += calcTrailRating(matrix, [pos[0], pos[1]-1], num+1)
    score += calcTrailRating(matrix, [pos[0], pos[1]+1], num+1)
    return score
}