import { printLines } from "../io/printFile"
import { readLines } from "../io/readFile"

export function day14(){
    day14Part1()
    day14Part2()
}

const height = 103, width = 101

export function day14Part1(){
    const data = readLines ("inputFiles/day14.txt")
    const robots: number[][] = []
    data.forEach((value, _) => {
        robots.push((value.match(/-?\d+/g) || []).map(Number))
    })
    const matrix = simulateRobots(robots, 100)
    console.log(calcSafetyFactor(matrix))
}

export function day14Part2(){
    const data = readLines ("inputFiles/day14.txt")
    const robots: number[][] = []
    data.forEach((value, _) => {
        robots.push((value.match(/-?\d+/g) || []).map(Number))
    })
    let matrix = simulateRobots(robots, 0)
    let seconds = 0
    while (!checkEasterEgg(matrix)) {
        seconds++
        matrix = simulateRobots(robots, 1)
    }
    printLines("outputFiles/day14.txt", matrix.map(row => row.map(cell => (cell > 0 ? "#" : ".")).join("")))
    console.log(seconds)
}

function simulateRobots(robots: number[][], seconds: number): number[][] {
    
    const matrix: number[][] = Array.from({ length: height }, () => Array.from({ length: width }, () => 0))

    robots.forEach((robot, _) => {
        
        robot[0] = (width + ((robot[0] + seconds * robot[2]) % width)) % width
        robot[1] = (height + ((robot[1] + seconds * robot[3]) % height)) % height
        matrix[robot[1]][robot[0]]++
    })
    return matrix
}

function calcSafetyFactor(matrix: number[][]): number {

    let safetyFactor = 1
    let currSF = 0
    for (let i = 0; i < Math.floor(height / 2); i++) {
        for (let j = 0; j < Math.floor(width / 2); j++) {
            currSF += matrix[i][j]
        }
    }
    safetyFactor*=currSF

    currSF = 0
    for (let i = Math.ceil(height / 2); i < height; i++) {
        for (let j = 0; j < Math.floor(width / 2); j++) {
            currSF += matrix[i][j]
        }
    }
    safetyFactor*=currSF

    currSF = 0
    for (let i = 0; i < Math.floor(height / 2); i++) {
        for (let j = Math.ceil(width / 2); j < width; j++) {
            currSF += matrix[i][j]
        }
    }
    safetyFactor*=currSF

    currSF = 0
    for (let i = Math.ceil(height / 2); i < height; i++) {
        for (let j = Math.ceil(width / 2); j < width; j++) {
            currSF += matrix[i][j]
        }
    }
    safetyFactor*=currSF

    return safetyFactor;
}

function checkEasterEgg(matrix: number[][]): boolean {
    let consecutive = 0
    for (let i = 0; i < matrix.length; i++){
        consecutive = 0
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]>0) {
                consecutive++
            } else {
                consecutive = 0
            }
            if (consecutive >= 10) return true
        }
    }
    return false
}