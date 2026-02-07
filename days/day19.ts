import { readLine } from "../io/readFile"

export function day19(){
    day19Part1()
    day19Part2()
}

export function day19Part1(){
    const data = readLine("inputFiles/day19.txt")
    const splitData = data.split("\n\n")
    const availablePatterns = splitData[0].split(",").map((value, _) => value.trim())
    const desiredPatterns = splitData[1].split("\n")
    let count = 0
    const dp = new Map<string, boolean>()
    dp.set("", true)
    for (let i = 0; i< desiredPatterns.length; i++) {
        if (canMakePattern(desiredPatterns[i], availablePatterns, dp)) count++
    }
    console.log(count)
}

export function day19Part2(){
    const data = readLine("inputFiles/day19.txt")
    const splitData = data.split("\n\n")
    const availablePatterns = splitData[0].split(",").map((value, _) => value.trim())
    const desiredPatterns = splitData[1].split("\n")
    let count = 0
    const dp = new Map<string, number>()
    dp.set("", 1)
    for (let i = 0; i< desiredPatterns.length; i++) {
        count+=howManyPatterns(desiredPatterns[i], availablePatterns, dp)
    }
    console.log(count)
}

function canMakePattern(pattern: string, availablePatterns: string[], dp: Map<string, boolean>): boolean{
    if (dp.get(pattern)===undefined) {
        for (let i=0; i<availablePatterns.length;i++){
            if (pattern.endsWith(availablePatterns[i])) {
                let canMake = canMakePattern(pattern.substring(0, pattern.length-availablePatterns[i].length), availablePatterns, dp)
                if (canMake) {
                    dp.set(pattern, true)
                    break
                }
                dp.set(pattern, false)
            }
        }
    }
    let retVal = dp.get(pattern)
    if (retVal === undefined) return false
    return retVal
}


function howManyPatterns(pattern: string, availablePatterns: string[], dp: Map<string, number>): number{
    if (dp.get(pattern)===undefined) {
        let canMake = 0
        for (let i=0; i<availablePatterns.length;i++){
            if (pattern.endsWith(availablePatterns[i])) {
                canMake += howManyPatterns(pattern.substring(0, pattern.length-availablePatterns[i].length), availablePatterns, dp)

            }
        }                
        dp.set(pattern, canMake)
    }
    let retVal = dp.get(pattern)
    if (retVal === undefined) return 0
    return retVal
}
