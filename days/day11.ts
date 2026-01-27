import { readNumbers } from "../io/readFile"

export function day11(){
    day11Part1()
    day11Part2()
}

export function day11Part1(){
    const data = readNumbers("inputFiles/day11.txt")
    const stones = getFutureStones(data, 25)
    console.log(stones)
}

export function day11Part2(){
    const data = readNumbers("inputFiles/day11.txt")
    const stones = getFutureStones(data, 75)
    console.log(stones)
}

function getFutureStones(stones: number[], blinks: number): number {
    const dp = new Map<string, number>()
    let stone = 0
    stones.forEach((value, _) => {
        stone += calcFutureStones(value, blinks, dp)
    })
    return stone
}

function calcFutureStones(stone: number, blinks: number, dp: Map<string, number>): number {

    if (blinks === 0) {
        return 1
    }
    else if (dp.get(stringfy(stone, blinks)) === undefined) {
        if (stone === 0) {

            dp.set(stringfy(stone, blinks), calcFutureStones(1, blinks-1, dp))
        } else if (stone.toString().length %2 === 0) {

            dp.set(stringfy(stone, blinks), calcFutureStones(Number(stone.toString().slice(0, stone.toString().length/2)), blinks-1, dp) + calcFutureStones(Number(stone.toString().slice(stone.toString().length/2)), blinks-1, dp))
        } else {

            dp.set(stringfy(stone, blinks), calcFutureStones(stone*2024, blinks-1, dp))
        }
    }

    const stones = dp.get(stringfy(stone, blinks))
    if (stones === undefined) {
        throw new Error("Error")
    }


    return stones
}

function stringfy(num1: number, num2: number): string {
    return String(num1)+","+String(num2)
}
