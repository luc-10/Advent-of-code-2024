import { readLines } from "../io/readFile"

export function day13(){
    day13Part1()
    day13Part2()
}

export function day13Part1(){
    const data = readLines("inputFiles/day13.txt")
    let tokens = 0
    for (let i=0; i<data.length; i+=4){
        const btnA = (data[i].match(/\d+/g) || []).map(Number)
        const btnB = (data[i+1].match(/\d+/g) || []).map(Number)
        const prize = (data[i+2].match(/\d+/g) || []).map(Number)

        tokens+=calcTokens(btnA, btnB, prize)

    }
    console.log(tokens)
}

export function day13Part2(){
    const data = readLines("inputFiles/day13.txt")
    let tokens = 0
    for (let i=0; i<data.length; i+=4){
        const btnA = (data[i].match(/\d+/g) || []).map((n) => Number(n))
        const btnB = (data[i+1].match(/\d+/g) || []).map((n) => Number(n))
        const prize = (data[i+2].match(/\d+/g) || []).map((n) => Number(n)+10000000000000)

        tokens+=calcTokens(btnA, btnB, prize)

    }
    console.log(tokens)
}

function calcTokens(btnA: number[], btnB: number[], prize: number[]): number {
    const det = btnA[0]*btnB[1] - btnB[0]*btnA[1]
    const na = prize[0]*btnB[1] - prize[1]*btnB[0]
    if (na%det !== 0) return 0

    const nb = btnA[0]*prize[1] - btnA[1]*prize[0]
    if (nb%det !== 0) return 0

    const a = na/det, b = nb/det
    return a*3+b
}