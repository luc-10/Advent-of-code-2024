import { readLines } from "../io/readFile"

export function day20(){
    day20Part1()
    day20Part2()
}

export function day20Part1(){
    const data = readLines("inputFiles/day20.txt")
    const start = findInMatrix(data, 'S')
    const end = findInMatrix(data, 'E')
    const distFromStart = calcDist(data, start)
    const distFromEnd = calcDist(data, end)
    console.log(calcCheats(data, distFromStart, distFromEnd, distFromStart[end[0]][end[1]]))
}

export function day20Part2(){

    const data = readLines("inputFiles/day20.txt")
    const start = findInMatrix(data, 'S')
    const end = findInMatrix(data, 'E')
    const distFromStart = calcDist(data, start)
    const distFromEnd = calcDist(data, end)
    console.log(calcLongerCheats(data, distFromStart, distFromEnd, distFromStart[end[0]][end[1]]))
}

function calcLongerCheats(matrix: string[], distFromStart: number[][], distFromEnd: number[][], fullDist: number): number {
    const picoseconds = 100
    const cheatLength = 20
    let cheatPaths = 0
    for (let i = 1; i<matrix.length-1; i++){
        for (let j = 1; j<matrix[i].length-1; j++){
            if (matrix[i][j]!=='#') {
                cheatPaths+=checkInManhattanDistance(matrix, cheatLength, distFromStart, distFromEnd, [i, j], fullDist, picoseconds)
            }
        }
    }
    return cheatPaths
} 

function checkInManhattanDistance(matrix: string[], distance: number, distFromStart: number[][], distFromEnd: number[][], center: number[], fullDist: number, picoseconds: number): number {
    let cheatPaths = 0
    for (let i = -distance; i<=distance; i++){
        for (let j = -(distance-Math.abs(i)); j<=distance-Math.abs(i); j++) {
            const r = i+center[0], c = j+center[1]
            if (r<0 || c<0 || r>=matrix.length || c>=matrix[r].length || matrix[r][c]==='#') continue
            else {
                if (distFromStart[center[0]][center[1]]+distFromEnd[r][c]+Math.abs(center[0]-r)+Math.abs(center[1]-c)<=fullDist-picoseconds) {
                    cheatPaths++
                }
            }
        }
    }
    return cheatPaths
}

function calcCheats(matrix: string[], distFromStart: number[][], distFromEnd: number[][], fullDist: number): number {
    const picoseconds = 100
    let cheatPaths = 0
    for (let i = 1; i<matrix.length-1; i++){
        for (let j = 1; j<matrix[i].length-1; j++){

            if (i-2>=0 && matrix[i][j] !== '#' && matrix[i-2][j]!=='#') {
                if (distFromStart[i][j]+distFromEnd[i-2][j]+1<=fullDist-picoseconds) {
                    cheatPaths++
                }
            }

            if (i+2<matrix.length && matrix[i][j] !== '#' && matrix[i+2][j]!=='#') {
                if (distFromStart[i][j]+distFromEnd[i+2][j]+1<=fullDist-picoseconds) {
                    cheatPaths++
                }
            }

            if (j-2>=0 && matrix[i][j] !== '#' && matrix[i][j-2]!=='#') {
                if (distFromStart[i][j]+distFromEnd[i][j-2]+1<=fullDist-picoseconds) {
                    cheatPaths++
                }
            }

            if (j+2<matrix[i].length && matrix[i][j] !== '#' && matrix[i][j+2]!=='#') {
                if (distFromStart[i][j]+distFromEnd[i][j+2]+1<=fullDist-picoseconds) {
                    cheatPaths++
                }
            }

            
        }
    }
    return cheatPaths
}

function calcDist(matrix: string[], from: [number, number]): number[][]{
    const dist: number[][] = new Array(matrix.length).fill(false).map(() => new Array(matrix[0].length).fill(-1))

    const q: number[][] = []
    q.push(from)
    dist[from[0]][from[1]] = 0
    while (q.length) {
        
        const curr = q[0]
        q.shift()

        if (matrix[curr[0]-1][curr[1]]!=='#' && dist[curr[0]-1][curr[1]]===-1) {
            dist[curr[0]-1][curr[1]] = dist[curr[0]][curr[1]]+1
            q.push([curr[0]-1, curr[1]])
        }

        if (matrix[curr[0]+1][curr[1]]!=='#' && dist[curr[0]+1][curr[1]]===-1) {
            dist[curr[0]+1][curr[1]] = dist[curr[0]][curr[1]]+1
            q.push([curr[0]+1, curr[1]])
        }

        if (matrix[curr[0]][curr[1]-1]!=='#' && dist[curr[0]][curr[1]-1]===-1) {
            dist[curr[0]][curr[1]-1] = dist[curr[0]][curr[1]]+1
            q.push([curr[0], curr[1]-1])
        }

        if (matrix[curr[0]][curr[1]+1]!=='#' && dist[curr[0]][curr[1]+1]===-1) {
            dist[curr[0]][curr[1]+1] = dist[curr[0]][curr[1]]+1
            q.push([curr[0], curr[1]+1])
        }
    }
    return dist
}

function findInMatrix(matrix: string[], char: string): [number, number]{
    for (let i = 0; i<matrix.length; i++){
        for (let j = 0; j<matrix[i].length; j++){
            if (matrix[i][j]===char) return [i, j]
        }
    }
    return [0, 0]
}