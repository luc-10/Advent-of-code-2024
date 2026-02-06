import { readLines } from '../io/readFile';

export function day17(){
    day17Part1()
    day17Part2()
}

export function day17Part1(){
    const data = readLines("inputFiles/day17.txt")
    const [registers, program] = parseInput(data)
    console.log(debug(registers, program))
}

export function day17Part2(){
    const data = readLines("inputFiles/day17.txt")
    const [_, program] = parseInput(data)
    console.log(reverseDebug(program))
}

function reverseDebug(program: number[]): number{
    const q: number[] = []
    q.push(0)
    let dist=0
    let toPop=1
    while (q.length) {
        let regA = q[0]
        q.shift()
        toPop--
        for (let i = 0; i<8; i++){
            const output = debug([regA+i, 0, 0], program).split(",").map(Number)
            if ((output[0]+8)%8 === program[program.length-dist-1] ) {
                if (program.length-dist-1 === 0) {
                    return regA+i
                }
                q.push((regA+i)*8)
            }
        }
        if (toPop === 0){
            dist++
            toPop=q.length
        }
        
    }
    return 0
}



function parseInput(data: string[]): [number[], number[]]{
    const registers = [Number(data[0].match(/\d+/g)![0]), Number(data[1].match(/\d+/g)![0]), Number(data[2].match(/\d+/g)![0])]
    const program = data[4].split(":")[1].split(",").map(Number)
    return [registers, program]
    
}

function debug(registers: number[], program: number[]): string{
    let output = ""
    for (let i = 0; i<program.length-1; i+=2){
        const opcode = program[i]
        const operand = program[i+1]
        switch(opcode) {
            case 0:
                registers[0] = Math.floor(registers[0]/Math.pow(2,getValue(operand, registers)))
                break
            case 1:
                registers[1] = (registers[1] ^ operand)
                break
            case 2:
                registers[1] = getValue(operand, registers)%8
                break
            case 3:
                if (registers[0] !== 0) {
                    i = operand-2
                }
                break
            case 4:
                registers[1] = (registers[1] ^ registers[2])
                break
            case 5:
                output += (getValue(operand, registers)%8).toString()+","
                break
            case 6:
                registers[1] = Math.floor(registers[0]/Math.pow(2,getValue(operand, registers)))
                break
            case 7:
                registers[2] = Math.floor(registers[0]/Math.pow(2,getValue(operand, registers)))
                break


        }

    }
    return output.substring(0, output.length-1)
}

function getValue(comboOperand: number, registers: number[]): number {
    if (comboOperand <= 3) return comboOperand
    else return registers[comboOperand-4]
}