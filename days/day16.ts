import { MinPriorityQueue } from "@datastructures-js/priority-queue"
import { readLines } from "../io/readFile"

type Node = {
    cost: number
    pos: number[]
    dir: number
}

export function day16(){
    day16Part1()
    day16Part2()
}


export function day16Part1(){
    const data = readLines("inputFiles/day16.txt")
    console.log(matrixDijkstra(data, findCharInMatrix(data, 'S'), findCharInMatrix(data, 'E')))
}

export function day16Part2(){
    const data = readLines("inputFiles/day16.txt")
    console.log(getDijkstraPaths(data, findCharInMatrix(data, 'S'), findCharInMatrix(data, 'E')))
}

function getDijkstraPaths(matrix: string[], from: number[], to: number[]): number {
    const pq = new MinPriorityQueue<Node>(n => n.cost)


    pq.enqueue({cost: 0, pos: from, dir: 1})
    const dist: number[][][] = Array.from({ length: matrix.length}, () =>
        Array.from({ length: matrix[0].length }, () =>
            Array(4).fill(-1)
        )
    )    
    const prev: number[][][][][] = Array.from({ length: matrix.length}, () =>
        Array.from({ length: matrix[0].length }, () =>
            Array.from({ length: 4 }, () => 
                Array(0).fill(0)))
    )
    dist[from[0]][from[1]][1] = 0

    while (!pq.isEmpty()) {
        const curr = pq.front()
        if (curr === null) {
            return 0
        }
        const pos = curr.pos
        const dir = curr.dir
        const cost = curr.cost
        pq.pop()

        dist[pos[0]][pos[1]][dir] = cost

        const dirVector = getDirVector(dir)
        if (matrix[pos[0]+dirVector[0]][pos[1]+dirVector[1]] !== '#') {
            if (dist[pos[0]+dirVector[0]][pos[1]+dirVector[1]][dir] === -1) {
                pq.enqueue({cost: curr.cost+1, pos: [pos[0]+dirVector[0], pos[1]+dirVector[1]], dir: dir})
                dist[pos[0]+dirVector[0]][pos[1]+dirVector[1]][dir] = cost+1
                prev[pos[0]+dirVector[0]][pos[1]+dirVector[1]][dir].push([pos[0], pos[1], dir])
            } else if (dist[pos[0]+dirVector[0]][pos[1]+dirVector[1]][dir] === cost+1) {
                prev[pos[0]+dirVector[0]][pos[1]+dirVector[1]][dir].push([pos[0], pos[1], dir])
            }
            
        }

        for (let d = 0; d<4; d++) {
            if (dist[pos[0]][pos[1]][d] === -1) {
                pq.enqueue({cost: curr.cost+1000, pos: pos, dir: d})
                dist[pos[0]][pos[1]][d] = cost+1000
                prev[pos[0]][pos[1]][d].push([pos[0], pos[1], dir])
                
            } else if (dist[pos[0]][pos[1]][d] === cost+1000) {
                prev[pos[0]][pos[1]][d].push([pos[0], pos[1], dir])
            }

        }
    }
    let q: number[][] = []
    let minDir = 0 
    let minDist = dist[to[0]][to[1]][0]
    for (let d = 0; d<4; d++){
        if (minDist > dist[to[0]][to[1]][d]) {
            q = []
        } else {
            q.push([to[0], to[1], d])
        }
    }
    
    const visited: boolean[][] = matrix.map(row => Array(row.length).fill(false))
    visited[to[0]][to[1]] = true

    while (q.length) {
        const curr = q[0]
        q.shift()
        prev[curr[0]][curr[1]][curr[2]].forEach((prev, _) => {
            if (prev[2] === curr[2]) {
                if (dist[curr[0]][curr[1]][curr[2]] === dist[prev[0]][prev[1]][prev[2]]+1) {
                    visited[prev[0]][prev[1]] = true
                    q.push(prev)
                }
            } else {
                if (dist[curr[0]][curr[1]][curr[2]] === dist[prev[0]][prev[1]][prev[2]]+1000) {
                    visited[prev[0]][prev[1]] = true
                    q.push(prev)
                }
            }
        })
    }
    let count = 0
    for (let i = 0; i<visited.length; i++){
        for (let j = 0; j< visited[i].length;j++){
            if (visited[i][j]) count++
        }
    }
    return count
}

function matrixDijkstra(matrix: string[], from: number[], to: number[]): number{
    const pq = new MinPriorityQueue<Node>(n => n.cost)


    pq.enqueue({cost: 0, pos: from, dir: 1})
    const visited: boolean[][][] = Array.from({ length: matrix.length}, () =>
        Array.from({ length: matrix[0].length }, () =>
            Array(4).fill(false)
        )
    )
    visited[from[0]][from[1]][1] = true
    while (!pq.isEmpty()) {
        const curr = pq.front()
        if (curr === null) {
            return 0
        }
        const pos = curr.pos
        const dir = curr.dir
        pq.pop()
        if (checkPos(pos, to)) {
            return curr.cost
        }

        visited[pos[0]][pos[1]][dir] = true

        const dirVector = getDirVector(dir)
        if (matrix[pos[0]+dirVector[0]][pos[1]+dirVector[1]] !== '#' && !visited[pos[0]+dirVector[0]][pos[1]+dirVector[1]][dir]) {
            pq.enqueue({cost: curr.cost+1, pos: [pos[0]+dirVector[0], pos[1]+dirVector[1]], dir: dir})

        }

        for (let d = 0; d<4; d++) {
            if (!visited[pos[0]][pos[1]][d]) {

                pq.enqueue({cost: curr.cost+1000, pos: pos, dir: d})
            }
        }

    }
    return 0
}

function findCharInMatrix(matrix: string[], char: string): number[] {
    for (let i = 0; i<matrix.length; i++){
        for (let j = 0; j<matrix[i].length; j++){
            if (matrix[i][j]===char) return [i, j]
        }
    }
    return [0, 0]
}

function getDirVector(dir: number): number[]{
    switch(dir){
        case (0):
            return [-1, 0]
        case (2):
            return [1, 0]
        case (3):
            return [0, -1]
        case (1):
            return [0, 1]
    }
    return [0, 0]
}

function checkPos(pos1: number[], pos2: number[]) {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1]
}
