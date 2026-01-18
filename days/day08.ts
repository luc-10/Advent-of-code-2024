import { readLines } from "../io/readFile"

export function day8(){
    day8Part1()
    day8Part2()
}

export function day8Part1(){
    const data = readLines("inputFiles/day08.txt")
    const antinodes = createAntinodes(data, getAntennas(data))
    console.log(countAntinodes(antinodes))
}

export function day8Part2(){

    const data = readLines("inputFiles/day08.txt")
    const antinodes = createMoreAntinodes(data, getAntennas(data))
    console.log(countAntinodes(antinodes))
}

function createMoreAntinodes(mat: string[], antennas: Map<string, number[][]>): boolean[][]{
    const antinodes: boolean[][] = mat.map(
        row => Array.from({ length: row.length }, () => false)
    );

    antennas.forEach((value, key) => {
        for (let i = 0; i < value.length; i++) {
            for (let j = i+1 ; j< value.length; j++){
                const antenna1 = value[i]
                const antenna2 = value[j]
                const vector = [antenna2[0]-antenna1[0], antenna2[1]-antenna1[1]]
                let antinode = antenna1

                while (antinode[0]>=0 && antinode[0]<antinodes.length && antinode[1]>=0 && antinode[1]<antinodes[0].length) {
                    antinodes[antinode[0]][antinode[1]]=true
                    antinode = [antinode[0]+vector[0], antinode[1]+vector[1]]
                }
                antinode = [antinode[0]-vector[0], antinode[1]-vector[1]]

                while (antinode[0]>=0 && antinode[0]<antinodes.length && antinode[1]>=0 && antinode[1]<antinodes[0].length) {
                    antinodes[antinode[0]][antinode[1]]=true
                    antinode = [antinode[0]-vector[0], antinode[1]-vector[1]]
                }
            }
        }
    })
    return antinodes
}

function countAntinodes(antinodes: boolean[][]): number {
    let count = 0
    for (let i = 0; i<antinodes.length; i++){
        for (let j = 0; j<antinodes[i].length; j++){
            if (antinodes[i][j]) count++
        }
    }
    return count
}

function createAntinodes(mat: string[], antennas: Map<string, number[][]>): boolean[][] {
    const antinodes: boolean[][] = mat.map(
        row => Array.from({ length: row.length }, () => false)
    );

    antennas.forEach((value, key) => {
        for (let i = 0; i < value.length; i++) {
            for (let j = i+1 ; j< value.length; j++){
                const antenna1 = value[i]
                const antenna2 = value[j]
                const vector = [antenna2[0]-antenna1[0], antenna2[1]-antenna1[1]]
                const antinode1 = [antenna1[0]-vector[0], antenna1[1]-vector[1]]
                const antinode2 = [antenna2[0]+vector[0], antenna2[1]+vector[1]]

                if (antinode1[0]>=0 && antinode1[0]<antinodes.length && antinode1[1]>=0 && antinode1[1]<antinodes[0].length) {
                    antinodes[antinode1[0]][antinode1[1]]=true
                }


                if (antinode2[0]>=0 && antinode2[0]<antinodes.length && antinode2[1]>=0 && antinode2[1]<antinodes[0].length) {
                    antinodes[antinode2[0]][antinode2[1]]=true
                }
            }
        }
    })
    return antinodes
}

function getAntennas(mat: string[]): Map<string,number[][]>{
    const antennas = new Map<string, number[][]>
    for (let i = 0; i < mat.length; i++){
        for (let j = 0; j < mat[i].length; j++){
            if (mat[i][j]!='.'){
                if (antennas.get(mat[i][j])===undefined) {
                    antennas.set(mat[i][j], [])
                }
                antennas.get(mat[i][j])?.push([i, j])
            }
        }
    }
    return antennas

}