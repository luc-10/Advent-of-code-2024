import { readLines } from "../io/readFile"

export function day6(){
    day6Part1()
    day6Part2()
}

export function day6Part1(){
    const data = readLines("inputFiles/day06.txt");
    const visited: boolean[][] = data.map(row => Array.from(row, _ => false));
    simulatePath(data, visited, findStartPos(data), [-1, 0])
    let positions = 0;
    for (let i=0; i<visited.length;i++){
        for (let j=0;j<visited[i].length;j++){
            if (visited[i][j]) positions++;
        }
    }
    console.log(positions);
}

export function day6Part2(){
    const data = readLines("inputFiles/day06.txt");
    const visited: boolean[][] = data.map(row => Array.from(row, _ => false));
    const startPos = findStartPos(data)
    simulatePath(data, visited, startPos, [-1, 0])
    let loops = 0;
    for (let i=0; i<visited.length;i++){
        for (let j=0;j<visited[i].length;j++){
            if (visited[i][j]) {
                data[i] = data[i].slice(0, j)+'#'+data[i].slice(j+1);
                const visitedNum: number[][] = data.map(row => Array.from(row, _ => 0));
                if (hasLoop(data, visitedNum, startPos, [-1, 0])){
                    loops++;
                }
                data[i] = data[i].slice(0, j)+'.'+data[i].slice(j+1);
            }
        }
    }
    console.log(loops);
}



function hasLoop(matrix: string[], visited: number[][], pos: number[], dir: number[]): boolean{
    let nextPos = [pos[0]+dir[0], pos[1]+dir[1]];
    while (nextPos[0]>=0 && nextPos[0]<matrix.length && nextPos[1]>=0 && nextPos[1]<matrix[nextPos[0]].length){
        visited[pos[0]][pos[1]]++;
        if (visited[pos[0]][pos[1]]>4){
            return true;
        }
        if (matrix[nextPos[0]][nextPos[1]] === '#') {
            dir = getNextDir(dir);
        } else {
            pos = nextPos
        } 
        nextPos = [pos[0]+dir[0], pos[1]+dir[1]];
    }
    return false;
}

function simulatePath(matrix: string[], visited: boolean[][], pos: number[], dir: number[]): boolean{
    if (pos[0]<0 || pos[0]>=matrix.length || pos[1]<0 || pos[1]>=matrix[pos[0]].length){
        return true;
    }
    if (matrix[pos[0]][pos[1]] === '#'){
        return false;
    }
    visited[pos[0]][pos[1]] = true;
    if (simulatePath(matrix, visited, [pos[0]+dir[0], pos[1]+dir[1]], dir)) {
        return true;
    } else {
        simulatePath(matrix, visited, pos, getNextDir(dir))
        return true;
    }
    
}



function getNextDir(dir: number[]): number[]{
    switch (dir.join(",")){
        case "-1,0":
            return [0,1];
        case "0,1":
            return [1,0];
        case "1,0":
            return [0,-1];
        case "0,-1":
            return [-1,0];
    }
    return [0,0];
}

function findStartPos(matrix: string[]): number[]{
    for (let i=0;i<matrix.length;i++){
        for (let j=0;j<matrix[i].length;j++){
            if (matrix[i][j]=='^'){
                return [i, j];
            }
        }
    }
    return [-1, -1];
}
