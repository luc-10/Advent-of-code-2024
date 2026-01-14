import { readLines } from "../io/readFile";

export function day5(){
    day5Part1()
    day5Part2()
}

export function day5Part1(){
    const data = readLines("inputFiles/day05.txt");
    let orderings = false;
    const compressor = new Map<number, number>();
    const graph: Map<number, boolean>[] = [new Map<number, boolean>];
    let index = 1;
    let sum = 0;
    data.forEach((value, _) => {
        if (value === ""){
            orderings = true;
        } else if (orderings) {
            const nums = value.split(",").map(Number);
            if (isCorrectOrdering(nums, graph, compressor)){
                sum += nums[Math.floor(nums.length/2)];
            }
        } else {
            const [left, right] = value.split("|");
            const leftNum = Number(left);
            const rightNum = Number(right);

            if (!compressor.has(leftNum)) {
                compressor.set(leftNum, index);
                index++;
            }
            if (!compressor.has(rightNum)) {
                compressor.set(rightNum, index);
                index++;
            }
            while (graph.length < index) {
                graph.push(new Map<number, boolean>);
            }
            const leftCompressed = compressor.get(leftNum);
            const rightCompressed = compressor.get(rightNum);

            if (leftCompressed === undefined || rightCompressed === undefined) {
                throw new Error("Error");
            }

            graph[leftCompressed].set(rightCompressed, true);
        }
    })
    console.log(sum);
}


export function day5Part2(){
    const data = readLines("inputFiles/day05.txt");
    let orderings = false;
    const compressor = new Map<number, number>();
    const graph: Map<number, boolean>[] = [new Map<number, boolean>];
    let index = 1;
    let sum = 0;
    data.forEach((value, _) => {
        if (value === ""){
            orderings = true;
        } else if (orderings) {
            const nums = value.split(",").map(Number);
            if (!isCorrectOrdering(nums, graph, compressor)){
                nums.sort((a, b) => {
                const u = compressor.get(a);
                const v = compressor.get(b);

                if (u === undefined || v === undefined) {
                    throw new Error("Error");
                }

                return graph[u].has(v) ? -1 : 1;
                });
                sum += nums[Math.floor(nums.length/2)];
            }
        } else {
            const [left, right] = value.split("|");
            const leftNum = Number(left);
            const rightNum = Number(right);

            if (!compressor.has(leftNum)) {
                compressor.set(leftNum, index);
                index++;
            }
            if (!compressor.has(rightNum)) {
                compressor.set(rightNum, index);
                index++;
            }
            while (graph.length < index) {
                graph.push(new Map<number, boolean>);
            }
            const leftCompressed = compressor.get(leftNum);
            const rightCompressed = compressor.get(rightNum);

            if (leftCompressed === undefined || rightCompressed === undefined) {
                throw new Error("Error");
            }

            graph[leftCompressed].set(rightCompressed, true);
        }
    })
    console.log(sum);
}

function isCorrectOrdering(ordering: number[], graph: Map<number, boolean>[], compressor: Map<number, number>):boolean {
    for (let i = 0; i < ordering.length-1; i++){

        const compressedCurr = compressor.get(ordering[i]);
        const compressedNext = compressor.get(ordering[i+1]);
        if (compressedCurr === undefined || compressedNext === undefined) {
            throw new Error("Error")
        }
        if (!graph[compressedCurr].get(compressedNext)) {
            return false;
        }
    }
    return true;
}
