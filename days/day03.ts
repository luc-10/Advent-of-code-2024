import { readLine } from "../io/readFile";

export function day3(){
    day3Part1();
    day3Part2();
}

export function day3Part1(){
    const data = readLine("inputFiles/day03.txt")
    console.log(fsmOnNull(data, 0, 0, true));
}

export function day3Part2(){
    const data = readLine("inputFiles/day03.txt");
    console.log(fsmOnNull(data, 0, 0, false));
}

function fsmOnDont(s: string, index: number, currSum: number, part1: boolean): number {
    if (s[index]!=='d') {
        return fsmOnNull(s, index, currSum, part1);
    }
    index++;
    if (index >= s.length) return currSum;

    if (s[index]!=='o'){
        return fsmOnNull(s, index, currSum, part1);
    }
    index++;
    if (index >= s.length) return currSum;

    if (s[index]!=='n'){
        return fsmOnNull(s, index, currSum, part1);
    }
    index++;
    if (index >= s.length) return currSum;

    if (s[index]!=='\''){
        return fsmOnNull(s, index, currSum, part1);
    }
    index++;
    if (index >= s.length) return currSum;

    if (s[index]!=='t'){
        return fsmOnNull(s, index, currSum, part1);
    }
    index++;
    if (index >= s.length) return currSum;

    if (s[index]!=='('){
        return fsmOnNull(s, index, currSum, part1);
    }
    index++;
    if (index >= s.length) return currSum;

    if (s[index]!==')'){
        return fsmOnNull(s, index, currSum, part1);
    }
    index++;
    if (index >= s.length) return currSum;

    return fsmOnNothing(s, index, currSum, part1);
}

function fsmOnNothing(s: string, index: number, currSum: number, part1: boolean): number {
    if (index>s.length) return currSum;
    while (s[index]!=='d'){
        index++;
        if (index>=s.length) return currSum;
    }
    return fsmOnDo(s, index, currSum, part1);
}

function fsmOnDo(s: string, index: number, currSum: number, part1: boolean): number {
    if (s[index]!=='d') {
        return fsmOnNothing(s, index, currSum, part1);
    }
    index++;
    if (index >= s.length) return currSum;

    if (s[index]!=='o') {
        return fsmOnNothing(s, index, currSum, part1);
    }
    index++;
    if (index >= s.length) return currSum;

    if (s[index]!=='(') {
        return fsmOnNothing(s, index, currSum, part1);
    }
    index++;
    if (index >= s.length) return currSum;

    if (s[index]!==')') {
        return fsmOnNothing(s, index, currSum, part1);
    }
    index++;
    if (index >= s.length) return currSum;

    return fsmOnNull(s, index, currSum, part1);
}

function fsmOnNull(s: string, index: number, currSum: number, part1: boolean): number {
    if (index>s.length) return currSum;
    while (s[index]!=='m' && s[index]!=='d'){
        index++;
        if (index >= s.length) return currSum;
    }
    if (!part1 && s[index]=='d'){
        return fsmOnDont(s, index, currSum, part1);
    }
    return fsmOnMul(s, index, currSum, part1);
}

function fsmOnMul(s: string, index: number, currSum: number, part1: boolean): number {
    if (s[index]!=='m'){
        return fsmOnNull(s, index+1, currSum, part1);
    }
    index++;
    if (index >= s.length) return currSum;

    if (s[index]!=='u'){
        return fsmOnNull(s, index, currSum, part1);
    }
    index++;
    if (index >= s.length) return currSum;

    if (s[index]!=='l'){
        return fsmOnNull(s, index, currSum, part1);
    }
    index++;
    if (index >= s.length) return currSum;

    if (s[index]!=='('){
        return fsmOnNull(s, index, currSum, part1);
    }
    index++;
    if (index >= s.length) return currSum;

    if (s[index]<'0' && s[index]>'9'){
        return fsmOnNull(s, index, currSum, part1);
    }

    return fsmOnNumber(s, index, currSum, part1);
}

function fsmOnNumber(s: string, index: number, currSum: number, part1: boolean): number{
    let num1=0;
    while (s[index]>='0' && s[index]<='9'){
        num1+=Number(s[index]);
        num1*=10;
        index++;
        if (index >= s.length) return currSum;
    }
    num1/=10;
    if (s[index]===','){
        index++
        if (index >= s.length) return currSum;
    } else {
        return fsmOnNull(s, index+1, currSum, part1)
        
    }
    if (s[index]<'0' || s[index]>'9'){
        return fsmOnNull(s, index, currSum, part1);
    }
    let num2=0;
    while (s[index]>='0' && s[index]<='9'){
        num2+=Number(s[index]);
        num2*=10;
        index++;
        if (index >= s.length) return currSum;
    }
    num2/=10;
    if (s[index]==')'){
        currSum+=num1*num2;
    } else {
        return fsmOnNull(s, index, currSum, part1);
        
    }
    return fsmOnNull(s, index+1, currSum, part1);
}