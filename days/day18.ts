import { readLines } from "../io/readFile"

const HEIGHT = 71
const WIDTH = 71
const KBs = 1024

export function day18(){
    day18Part1()
    day18Part2()
}

export function day18Part1(){
    const data = readLines("inputFiles/day18.txt")
    const matrix: boolean[][] = Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => false))
    corruptFirstNCells(matrix, data.map( s => s.split(",").map(Number)), KBs)
    console.log(bfs(matrix, [0, 0], [HEIGHT-1, WIDTH-1]))
}

export function day18Part2(){
    const data = readLines("inputFiles/day18.txt")
    const cells = data.map(s => s.split(",").map(Number))
    const matrix: number[][] = Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => 0))
    findPath(matrix, [0, 0], [HEIGHT-1, WIDTH-1])
    removeFromMatrix(matrix, 3)
    for (let i = 0; i<cells.length; i++){
        if (matrix[cells[i][1]][cells[i][0]] === 2) {
            matrix[cells[i][1]][cells[i][0]] = 1
            removeFromMatrix(matrix, 2)
            if (!findPath(matrix, [0, 0], [HEIGHT-1, WIDTH-1])) {
                console.log(cells[i][0]+","+cells[i][1])
                break
            }
            removeFromMatrix(matrix, 3)
        } else {
            matrix[cells[i][1]][cells[i][0]] = 1
        }
    }
}

function removeFromMatrix(matrix: number[][], n: number){
    for (let i =0; i<HEIGHT; i++){
        for (let j = 0; j<WIDTH; j++){
            if (matrix[i][j]===n) matrix[i][j] = 0
        }
    }
}

function findPath(matrix: number[][], from: number[], to: number[]): boolean{

    const prev: number[][][] = Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => Array.from({ length: 0 })))
    const q: number[][] = []
    q.push(from)
    matrix[from[0]][from[1]] = 2
    prev[from[0]][from[1]] = from
    while (q.length) {
        const curr = q[0]
        q.shift()
        if (curr[0] === to[0] && curr[1] === to[1]) {
            while (!(to[0] === from[0] && to[1] === from[1])) {
                matrix[to[0]][to[1]] = 2
                to=prev[to[0]][to[1]]
            }
            return true
        }
        if (curr[0]-1>=0 && matrix[curr[0]-1][curr[1]]===0) {
            matrix[curr[0]-1][curr[1]] = 3
            prev[curr[0]-1][curr[1]]=curr
            q.push([curr[0]-1, curr[1]])
        }

        if (curr[0]+1<HEIGHT && matrix[curr[0]+1][curr[1]]===0) {
            matrix[curr[0]+1][curr[1]] = 3
            prev[curr[0]+1][curr[1]]=curr
            q.push([curr[0]+1, curr[1]])
        }

        if (curr[1]-1>=0 && matrix[curr[0]][curr[1]-1]===0) {
            matrix[curr[0]][curr[1]-1] = 3
            prev[curr[0]][curr[1]-1]=curr
            q.push([curr[0], curr[1]-1])
        }

        if (curr[1]+1<WIDTH && matrix[curr[0]][curr[1]+1]===0) {
            matrix[curr[0]][curr[1]+1] = 3
            prev[curr[0]][curr[1]+1]=curr
            q.push([curr[0], curr[1]+1])
        }
    }

    return false
}

function corruptFirstNCells(matrix: boolean[][], cells: number[][], n: number){
    for(let i = 0; i<n; i++){
        matrix[cells[i][1]][cells[i][0]] = true
    }

}

function bfs(matrix:boolean[][], from: number[], to: number[]): number {
    const q: number[][] = []
    q.push(from)
    let steps = 0, toPop = 1
    matrix[from[0]][from[1]] = true
    while (q.length) {
        const curr = q[0]
        q.shift()
        toPop--

        if (curr[0] === to[0] && curr[1] === to[1]) {
            return steps
        }
        if (curr[0]-1>=0 && !matrix[curr[0]-1][curr[1]]) {
            matrix[curr[0]-1][curr[1]] = true
            q.push([curr[0]-1, curr[1]])
        }

        if (curr[0]+1<HEIGHT && !matrix[curr[0]+1][curr[1]]) {
            matrix[curr[0]+1][curr[1]] = true
            q.push([curr[0]+1, curr[1]])
        }

        if (curr[1]-1>=0 && !matrix[curr[0]][curr[1]-1]) {
            matrix[curr[0]][curr[1]-1] = true
            q.push([curr[0], curr[1]-1])
        }

        if (curr[1]+1<WIDTH && !matrix[curr[0]][curr[1]+1]) {
            matrix[curr[0]][curr[1]+1] = true
            q.push([curr[0], curr[1]+1])
        }

        if (toPop===0) {
            steps++
            toPop = q.length
        }
    }

    return 0
}