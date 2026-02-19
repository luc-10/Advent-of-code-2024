import { readLine } from "../io/readFile"

export function day24(){
    day24Part1()
    day24Part2()
}

export function day24Part1(){
    const data = readLine("inputFiles/day24.txt")
    const splitData = data.split("\n\n")
    const inputs=splitData[0].split("\n")
    const operators=splitData[1].split("\n")
    const adjMap = new Map<string, [string, string]>()
    const opMap = new Map<string, string>()
    const zNodesSet = new Set<string>()
    operators.forEach((line, _) => {
        const value = line.split(" ")
        adjMap.set(value[4], [value[0], value[2]])
        opMap.set(value[4], value[1])
        if (value[4][0]==='z') zNodesSet.add(value[4])
    })

    const valMap = new Map<string, boolean>()
    inputs.forEach((line, _) => {
        const value = line.split(": ")
        valMap.set(value[0], value[1] === "1"? true : false)

        if (value[0][0]==='z') zNodesSet.add(value[4])
    })


    const zNodes = [...zNodesSet].sort()
    const nums: string[] = []
    zNodes.forEach((value, _) => {
        nums.push(findValues(value, adjMap, opMap, valMap)? "1" : "0")
    })
    console.log(parseInt(nums.reverse().join(""),2))

}


export function day24Part2(){
    const data = readLine("inputFiles/day24.txt")
    const splitData = data.split("\n\n")
    const inputs = splitData[0].split("\n")
    const operators = splitData[1].split("\n")

    const wires = new Map<string, boolean>()
    for (const wire of inputs) {
        wires.set(wire.slice(0, 3), wire[5] === "1")
    }
    const gates: string[][] = operators.map(line => line.split(" "))

    for (const gate of gates) {
        if (gate[0] > gate[2]) {
            [gate[0], gate[2]] = [gate[2], gate[0]]
        }
    }

    const level1Gates = gates.filter(g => g[0][0] === "x").sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]))
    const level2XorGates = gates.filter(g => g[1] === 'XOR' && !level1Gates.includes(g))
    const andGates = gates.filter(g => g[1] === 'AND')
    const orGates = gates.filter(g => g[1] === 'OR')
    const finalGates = gates.filter(g => g[4][0] === 'z').sort((a, b) => a[4].localeCompare(b[4]))

    const wrong = new Set<string>()
    let carryIn = ''

    for (let i = 0; i < 45; i++) {
        const xorGate = level1Gates[i * 2 + 1]
        const andGate = level1Gates[i * 2]
        let finalGate = finalGates[i]

    if (i === 0) {
        if (JSON.stringify(xorGate) !== JSON.stringify(finalGate)) {
            wrong.add(xorGate[4])
            wrong.add(finalGate[4])
        }
        carryIn = andGate[4]
    } else {
        let xorAb = xorGate[4]

        if (!level2XorGates.includes(finalGate)) {
            const xor2Operands = xorGate[4] < carryIn ? [xorGate[4], carryIn] : [carryIn, xorGate[4]]

            for (const gate of level2XorGates) {
                if (gate[0] === xor2Operands[0] && gate[2] === xor2Operands[1]) {
                    wrong.add(finalGate[4])
                    wrong.add(gate[4])
                    finalGate = gate
                    break
                    }
                }
            }

        const finalWires2 = [finalGate[0], finalGate[2]]

        if (!finalWires2.includes(carryIn) && finalWires2.includes(xorGate[4])) {
            wrong.add(carryIn)
            wrong.add(finalGate[0] !== xorGate[4] ? finalGate[0] : finalGate[2])
        } else if (!finalWires2.includes(xorGate[4]) && finalWires2.includes(carryIn)) {
            xorAb = finalGate[0] !== carryIn ? finalGate[0] : finalGate[2]
            wrong.add(xorGate[4])
            wrong.add(xorAb)
        }

        const andOperands = finalGate[0] < finalGate[2] ? [finalGate[0], finalGate[2]] : [finalGate[2], finalGate[0]]

        let orOperand = ''
        for (const gate of andGates) {
            if (gate[0] === andOperands[0] && gate[2] === andOperands[1]) {
                orOperand = gate[4]
                break
            }
        }

        const orOperands = andGate[4] < orOperand ? [andGate[4], orOperand] : [orOperand, andGate[4]]

        let foundOrGate: string[] | null = null
        for (const gate of orGates) {
            if (gate[0] === orOperands[0] && gate[2] === orOperands[1]) {
                foundOrGate = gate
                break
            }
            if (gate.includes(orOperand)) {
                wrong.add(andGate[4])
                wrong.add(gate[0] !== orOperand ? gate[0] : gate[2])
                foundOrGate = gate
                break
            }
            if (gate.includes(andGate[4])) {
                wrong.add(orOperand)
                wrong.add(gate[0] !== andGate[4] ? gate[0] : gate[2])
                foundOrGate = gate
                break
            }
        }

        carryIn = foundOrGate ? foundOrGate[4] : ''
        }
    }

    console.log([...wrong].sort().join(','))
}

function findValues(node: string, adjMap: Map<string, [string, string]>, opMap: Map<string, string>, valMap: Map<string, boolean>): boolean {
    let value = valMap.get(node)
    if (value === undefined) {
        const adj = adjMap.get(node)
        if (adj === undefined) {
            console.log("Error 1")
            return false
        }
        const value1 = findValues(adj[0], adjMap, opMap, valMap)
        const value2 = findValues(adj[1], adjMap, opMap, valMap)
        const op = opMap.get(node)
        if (op === undefined) {
            console.log("Error 2")
            return false
        }
        valMap.set(node, execOP(op, value1, value2))
    }
    value = valMap.get(node)
    if (value === undefined) return false
    return value
}

function execOP(op: string, value1: boolean, value2: boolean): boolean {
    switch (op){
        case "AND":
            return value1 && value2
        case "OR":
            return value1 || value2
        case "XOR":
            return value1 !== value2
    }
    return false
}