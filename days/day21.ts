import { readLines } from '../io/readFile'

export function day21(){
    day21Part1()
    day21Part2()
}

export function day21Part1 () {
    const data = readLines("inputFiles/day21.txt")

    
    const [numPad, dirPad] = getPads()

    const dp: Map<string, number> = new Map()

    let sum = 0
    for (const code of data) {
        const num = parseInt(code.slice(0, 3))

        const codeAfterFirstRobot = firstRobot(code, numPad)

        let len = 0
        splitStringAfterA(codeAfterFirstRobot).forEach((subcode) => {
        const newLen = otherRobotsRec(`${subcode}`, 2, dirPad, dp)
        len += newLen
        })

        sum += num * len
    }

    console.log(sum)
}

export function day21Part2() {
    
    const data = readLines("inputFiles/day21.txt")

    const [numPad, dirPad] = getPads()
    const dp: Map<string, number> = new Map()
    let sum = 0
    for (const code of data) {
        const num = parseInt(code.slice(0, 3))

        const codeAfterFirstRobot = firstRobot(code, numPad)

        let len = 0
        splitStringAfterA(codeAfterFirstRobot).forEach((subcode) => {
            const newLen = otherRobotsRec(`${subcode}`, 25, dirPad, dp)
            len += newLen
        })

        sum += num * len
    }

    console.log(sum)
}

function getPads(): [string[][], string[][]]{

    const numPad: string[][] = [
        ['7', '8', '9'],
        ['4', '5', '6'],
        ['1', '2', '3'],
        ['', '0', 'A']
    ]

    const dirPad: string[][] = [
        ['', '^', 'A'],
        ['<', 'v', '>']
    ]

    return [numPad, dirPad]
}

function firstRobot(code: string, numPad: string[][]): string {
    const charArray = code.split('')
    const targetArray: string[] = []

    const currentPos = [2, 3]

    for (const target of charArray) {
        const targetPos = findPos(target, numPad)

        while (currentPos[0] !== targetPos[0] || currentPos[1] !== targetPos[1]) {
            if (currentPos[0] > targetPos[0] && !(targetPos[0] === 0 && currentPos[1] === 3)) {
                while (currentPos[0] !== targetPos[0]) {
                    currentPos[0]--
                    targetArray.push('<')
                }
            } else if (currentPos[1] > targetPos[1]) {
                while (currentPos[1] !== targetPos[1]) {
                    currentPos[1]--
                    targetArray.push('^')
                }
            } else if (currentPos[1] < targetPos[1] && !(targetPos[1] === 3 && currentPos[0] === 0)) {
                while (currentPos[1] !== targetPos[1]) {
                    currentPos[1]++
                    targetArray.push('v')
                }
            } else if (currentPos[0] < targetPos[0]) {
                while (currentPos[0] !== targetPos[0]) {
                    currentPos[0]++
                    targetArray.push('>')
                }
            }
        }

        targetArray.push('A')
    }

    return targetArray.join('')
}

function otherRobotsRec(code: string, robots: number, dirPad: string[][], dp: Map<string, number>): number {
    if (robots === 0) {
        return code.length
    }

    const key = `${code}-${robots}`
    if (dp.has(key)) {
        return dp.get(key)!
    }

    const current = [2,0]

    let result = 0
    const targetArray: string[] = []
    for (const char of code) {
        const target = findPos(char, dirPad)

        while (current[0] !== target[0] || current[1] !== target[1]) {
            if (current[0] > target[0] && !(target[0] === 0 && current[1] === 0)) {
                while (current[0] !== target[0]) {
                    current[0]--
                    targetArray.push('<')
                }
            } else if (current[1] > target[1] && !(target[1] === 0 && current[0] === 0)) {
                while (current[1] !== target[1]) {
                    current[1]--
                    targetArray.push('^')
                }
            } else if (current[1] < target[1]) {
                while (current[1] !== target[1]) {
                    current[1]++
                    targetArray.push('v')
                }
            } else if (current[0] < target[0]) {
                while (current[0] !== target[0]) {
                    current[0]++
                    targetArray.push('>')
                }
            }
        }
        targetArray.push('A')
    }

    splitStringAfterA(targetArray.join('')).forEach((subcode) => {
        const newLen = otherRobotsRec(`${subcode}`, robots - 1, dirPad, dp)
        result += newLen
    })
    dp.set(key, result)

    return result
}

function findPos (target: string, array: string[][]): [number, number] {
    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array[y].length; x++) {
            if (array[y][x] === target) return [x, y]
            
        }
    }

    return [-1, -1]
}

function splitStringAfterA (str: string): string[] {
    return str.match(/.*?A/g) || []
}
