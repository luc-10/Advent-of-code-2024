import { readDigits } from "../io/readFile"

export function day9(){
    day9Part1()
    day9Part2()
}

export function day9Part1(){
    const data = readDigits("inputFiles/day09.txt")
    const disk = createDisk(data)
    fixDisk(disk)
    console.log(calculateSum(disk))
}

export function day9Part2(){
    const data = readDigits("inputFiles/day09.txt")
    const disk = createDisk(data)
    fixDiskWOFragmentation(disk)
    console.log(calculateSum(disk))
}

function createDisk(data: number[]): number[] {
    const disk = []
    let block = true
    let id = 0
    for (const digit of data) {
        for (let i = 0; i < digit; i++){
            if (block) {
                disk.push(id)
            } else {
                disk.push(-1)
            }
        }
        if (block) id++
        block = !block
    }
    return disk
}

function calculateSum(disk: number[]): number {

    let sum = 0
    for (let i = 0; i<disk.length;i++){
        if (disk[i]===-1) continue
        sum+=disk[i]*i
    }
    return sum
}



function fixDisk(disk: number[]){
    let left = 0, right = disk.length - 1
    while (left < right) {
        while (disk[left] !== -1) {
            left++
            if (left >= disk.length) return

        }

        while (disk[right] === -1) {
            right--
            if (right < 0) return
        }

        [disk[left], disk[right]] = [disk[right], disk[left]]
    }
    console.log("A")
    let i = disk.length -1 
    for (; disk[i] === -1; i--) {}

    [disk[i], disk[i-1]] = [disk[i-1], disk[i]]
}

function fixDiskWOFragmentation(disk: number[]) {
    let lastDone = getMax(disk) + 1
    let length 
    let emptyLength
    while (1) {
        let i
        length = 0
        for (i = disk.length-1; i>=0; i--) {
            if (disk[i] < lastDone && disk[i]!=-1) {
                lastDone = disk[i]
                while (disk[i] === lastDone) {
                    length++
                    i--
                }
                break
            }
        }
        if (lastDone === 0) break

        for (let j = 0; j <= i; j++) {
            emptyLength = 0;
            if (disk[j] === -1) {
                while (disk[j] === -1) {
                    emptyLength++
                    j++
                    if (emptyLength === length) break

                }

                if (emptyLength === length) {
                    while (length > 0) {
                        disk[j - length] = lastDone
                        length--
                        disk[i + length + 1] = -1
                    }
                }
            }
        }
    }
}

function getMax(arr: number[]): number {
    for (let i = arr.length-1; i>=0; i++){
        if (arr[i]!=-1) return arr[i]
    }
    return 0
}

/*
            if (disk[j] == -1)
            {
                while (disk[j] == -1)
                {
                    emptyLength++;
                    j++;
                    if (emptyLength == length)
                    {
                        break;
                    }
                }
                if (emptyLength == length)
                {
                    while (length > 0)
                    {
                        disk[j - length] = lastDone;
                        length--;
                        disk[i + length + 1] = -1;
                    }
                }
            }
        }
    }
}
    */