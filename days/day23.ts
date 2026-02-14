import { readLines } from "../io/readFile"

export function day23(){
    day23Part1()
    day23Part2()
}

export function day23Part1(){
    const data = readLines("inputFiles/day23.txt")
    const graph = createGraph(data.map((value, _) => value.split("-")))
    const cycles = get3Cycles(graph)
    let count = 0
    cycles.forEach((value, _) => {

        const nodes = value.split(",")
        if (nodes.some(n => n[0]==="t")) {
            count++
        }
    })
    console.log(count)
}



export function day23Part2(){
    
    const data = readLines("inputFiles/day23.txt")
    const graph = createGraph(data.map((value, _) => value.split("-")))
    const cycles = get3Cycles(graph)
    let maxClique = new Set<string>()
    cycles.forEach((value, _) => {
        let currClique = findBiggestClique(new Set<string>(value.split(",")), graph)
        if (currClique.size > maxClique.size) maxClique = currClique 
    })

    console.log([...maxClique].sort().join(","))

}

function findBiggestClique(currClique: Set<string>, graph: Map<string, Set<string>>): Set<string> {
    let node = currClique.values().next().value
    if (node === undefined) return currClique
    let adj = graph.get(node)
    if (adj === undefined) return currClique
    for (const next of adj) {
        let ok = true
        for (const cliqueMember of currClique){
            if (!graph.get(cliqueMember)?.has(next)) {
                ok = false
            }
        }
        if (ok) {
            currClique.add(next)
        }

    }
    return currClique
}

function createGraph(edges: string[][]): Map<string, Set<string>> {
    const graph = new Map<string, Set<string>>()
    edges.forEach((edge, _) => {
        let adj = graph.get(edge[0])
        if (adj === undefined){
            adj = new Set<string>()
            graph.set(edge[0], adj)
        } 
        adj.add(edge[1])

        adj = graph.get(edge[1])
        if (adj === undefined){
            adj = new Set<string>
            graph.set(edge[1], adj)
        } 
        adj.add(edge[0])

    })
    return graph
}

function get3Cycles(graph: Map<string, Set<string>>): Set<string> {
    const cycles = new Set<string>

    graph.forEach((node1Adj, node1) => {
        for (const node2 of node1Adj) {
            const node2Adj = graph.get(node2)
            for (const node3 of node1Adj){
                if (node2 === node3 || node1 === node3) continue
                if (node2Adj?.has(node3)) {
                    cycles.add(stringify([node1, node2, node3]))
                }
            }
        }
    })

    return cycles
}

function stringify(nodes: string[]): string {
    return nodes.sort().join(",")
}