import { readLines } from "../io/readFile"

export function day12(){
    day12Part1()
    day12Part2()
}

export function day12Part1(){
    const data = readLines("inputFiles/day12.txt")

    const visited: boolean[][] = data.map(row => Array(row.length).fill(false))
    let price = 0
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j< data[i].length; j++){
            const areaPerimeter = getAreaAndPerimeter(data, i, j, data[i][j], visited)
            price += areaPerimeter[0]*areaPerimeter[1]
        }
    }
    console.log(price)
}

export function day12Part2(){
    const data = readLines("inputFiles/day12.txt")

    const visited: boolean[][] = data.map(row => Array(row.length).fill(false))
    let price = 0
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j< data[i].length; j++){
            const areaPerimeter = getAreaAndCorners(data, i, j, data[i][j], visited)
            price += areaPerimeter[0]*areaPerimeter[1]
        }
    }
    console.log(price)
}

function getAreaAndPerimeter(matrix: string[], i: number, j: number, char: string, visited: boolean[][]): number[] {
    if (!isPartOf(matrix, i, j, char)) return [0, 1]
    if (visited[i][j]) return [0, 0] 

    visited[i][j] = true

    const left = getAreaAndPerimeter(matrix, i, j-1, char, visited)
    const right = getAreaAndPerimeter(matrix, i, j+1, char, visited)
    const up = getAreaAndPerimeter(matrix, i-1, j, char, visited)
    const down = getAreaAndPerimeter(matrix, i+1, j, char, visited)

    return [1+left[0]+right[0]+up[0]+down[0], left[1]+right[1]+up[1]+down[1]]
}

function getAreaAndCorners(matrix: string[], i: number, j: number, char: string, visited: boolean[][]): number[] {
    if (!isPartOf(matrix, i, j, char) || visited[i][j]) return [0, 0]
    if (visited[i][j]) return [0, 0]

    visited[i][j] = true
    let corners = 0

    if ((!isPartOf(matrix, i-1, j, char) && !isPartOf(matrix, i, j-1, char)) || 
        (isPartOf(matrix, i-1, j, char) && isPartOf(matrix, i, j-1, char) && !isPartOf(matrix, i-1, j-1, char))) {
            corners++
    } 


    if ((!isPartOf(matrix, i+1, j, char) && !isPartOf(matrix, i, j-1, char)) || 
        (isPartOf(matrix, i+1, j, char) && isPartOf(matrix, i, j-1, char) && !isPartOf(matrix, i+1, j-1, char))) {
            corners++
    } 


    if ((!isPartOf(matrix, i-1, j, char) && !isPartOf(matrix, i, j+1, char)) || 
        (isPartOf(matrix, i-1, j, char) && isPartOf(matrix, i, j+1, char) && !isPartOf(matrix, i-1, j+1, char))) {
            corners++
    } 


    if ((!isPartOf(matrix, i+1, j, char) && !isPartOf(matrix, i, j+1, char)) || 
        (isPartOf(matrix, i+1, j, char) && isPartOf(matrix, i, j+1, char) && !isPartOf(matrix, i+1, j+1, char))) {
            corners++
    } 

    const left = getAreaAndCorners(matrix, i, j-1, char, visited)
    const right = getAreaAndCorners(matrix, i, j+1, char, visited)
    const up = getAreaAndCorners(matrix, i-1, j, char, visited)
    const down = getAreaAndCorners(matrix, i+1, j, char, visited)


    return [1+left[0]+right[0]+up[0]+down[0], corners+left[1]+right[1]+up[1]+down[1]]
}

function isPartOf(matrix:string[], i: number, j: number, char: string) {
    return !(i<0 || j<0 || i>=matrix.length || j>=matrix[i].length || matrix[i][j]!==char)
}

