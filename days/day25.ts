import { readLine } from "../io/readFile"

export function day25(){
    day25Part1()
}

export function day25Part1(){
    const data = readLine("inputFiles/day25.txt").split("\n\n").map(value => value.split("\n"))
    const upKeys: number[][] = [], downKeys: number[][] = []
    data.forEach((key, _) => {
        let keyVal: number[] = []
        if (key[0][0] === "#") {
            for (let j = 0; j<key[0].length; j++){
                for (let i = 0; i<key.length; i++){
                    if (key[i][j]!=='#') {
                        keyVal.push(i-1)
                        break
                    }
                }
            }
            upKeys.push(keyVal)
        } else {
            for (let j = 0; j<key[0].length; j++){
                for (let i = key.length-1; i>=0; i--){
                    if (key[i][j]!=='#'){
                        keyVal.push(key.length-i-2)
                        break
                    }
                }
            }
            downKeys.push(keyVal)
        }
    })

    console.log(countMatchingKeys(upKeys, downKeys, 5))


}

function countMatchingKeys(upKeys: number[][], downKeys: number[][], height: number) {
    let count = 0
    for (const upKey of upKeys) {
        for (const downKey of downKeys) {
            if (check(upKey, downKey, height)) count++
        }
    }
    return count
}

function check(key1: number[], key2: number[], height: number): boolean {
    for (let i = 0; i<key1.length; i++){
        if (key1[i]+key2[i]>height) return false
    }
    return true
}