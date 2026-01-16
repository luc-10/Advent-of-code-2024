import { readLines } from "../io/readFile";

export function day7(){
    day7Part1()
    day7Part2()
}

export function day7Part1(){
    const data = readLines("inputFiles/day07.txt");
    let sum = 0
    data.forEach((value, _) => {
        const [testValueString, numsString] = value.split(":")
        const testValue = Number(testValueString)
        const nums = numsString.trim().split(" ").map(Number)
        if (bfsSumMul(testValue, nums)) {
            sum+=testValue
        }
    })
    console.log(sum)
}

export function day7Part2(){
    const data = readLines("inputFiles/day07.txt");
    let sum = 0
    data.forEach((value, _) => {
        const [testValueString, numsString] = value.split(":")
        const testValue = Number(testValueString)
        const nums = numsString.trim().split(" ").map(Number)
        if (checkRecursive(testValue, nums, 1, nums[0])) {
            sum+=testValue
        }
    })
    console.log(sum)
}

function bfsSumMul(testValue: number, nums: number[]): boolean {
    const q: number[] = []
    q.push(nums[0])
    let index = 1
    let toPop = 1
    while (!(q.length===0)){
        const val = q[0]
        toPop--
        q.shift()
        if (val+nums[index] === testValue || val*nums[index] === testValue) {
            return true
        }
        if (val+nums[index]<testValue) {
            q.push(val+nums[index])

        }
        if (val*nums[index]<testValue) {
            q.push(val*nums[index])
        }
        if (toPop === 0) {
            index++
            toPop = q.length;
            if (index >= nums.length) return false
        }
    }
    return false;

}

function checkRecursive(testValue: number, nums: number[], index: number, tot: number): boolean {
    if (tot > testValue) {
        return false
    } else if (index >= nums.length) {
        return tot === testValue
    } else {
        return checkRecursive(testValue, nums, index+1, tot+nums[index]) ||
        checkRecursive(testValue, nums, index+1, tot*nums[index]) || 
        checkRecursive(testValue, nums, index+1, Number(String(tot)+String(nums[index])))
    }

}
