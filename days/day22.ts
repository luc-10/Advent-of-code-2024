import { readLines, readNumberLines } from "../io/readFile"

export function day22(){
    day22Part1()
    day22Part2()
}

export function day22Part1(){
    const data = readLines("inputFiles/day22.txt")
    let sum = 0
    for (const strNum of data){
        let num = Number(strNum)
        for (let i = 0; i<2000; i++){
            num = calcNextSecretNumber(num)
        }
        sum += num
    }
    console.log(sum)
}

export function day22Part2(){
    const data = readLines("inputFiles/day22.txt")
    const globMap = new Map<string, number>()
    for (const strNum of data){
        let num = Number(strNum)
        const monkey = [[num%10, 0]]
        const monkeySet = new Set()
        for (let i = 0; i<2000; i++){
            num = calcNextSecretNumber(num)
            const price = num%10
            monkey.push([price, price-monkey[i][0]])
            if (i>=3) {
                let seq = ""
                seq += monkey[i-2][1]+","+monkey[i-1][1]+","+monkey[i][1]+","+monkey[i+1][1]
                if (!monkeySet.has(seq)){
                    monkeySet.add(seq)
                    const seqPrice = globMap.get(seq)
                    if (seqPrice === undefined) {
                        globMap.set(seq, price)
                    } else {
                        globMap.set(seq, seqPrice+price)
                    }
                }
            }
        }
    }
    const maxValue = Math.max(...globMap.values());
    console.log(maxValue);
}

function calcNextSecretNumber(secretNumber: number): number {

    secretNumber = (prune(mix(secretNumber*64, secretNumber))) 
    secretNumber = (prune(mix(secretNumber/32, secretNumber))) 
    secretNumber = (prune(mix(secretNumber*2048, secretNumber))) 

    return secretNumber
}

function mix(value: number, secretNumber:number): number {
    return value^secretNumber
}

function prune(secretNumber: number): number {
    return ((secretNumber % 16777216) + 16777216) % 16777216
}

