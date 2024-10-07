function calcEquation2(equations: string[][], values: number[], queries: string[][]): number[] {
    let map: Map<string, number> = new Map<string, number>();
    let counter = 0;

    for(let e of equations){
        if(!map.has(e[0]) && !map.has(e[1])){
            map.set(e[0], values[counter]);
            map.set(e[1], 1);
            counter++;
        } else if(map.has(e[0]) && !map.has(e[1])){
            map.set(e[1], map.get(e[0])/values[counter]);
            counter++;
        } else if(!map.has(e[0]) && map.has(e[1])){
            map.set(e[0], values[counter]*map.get(e[1]));
            counter++;
        }
    }
    let result:number[] = [];

    for(let q of queries){
        if(map.has(q[0]) && map.has(q[1])){
            let numerator = map.get(q[0]);
            let denominator = map.get(q[1]);
            result.push((numerator/denominator));
        } else {
            result.push(-1.0);
        }
    }

    return result;
};

function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
    const graph = createGraph(equations, values);
    let visited:Set<string> = new Set<string>();

    let result = []
    for(let [numerator, denominator] of queries){
        result.push(traverseGraph(numerator, denominator, graph, 1, new Set<string>()));
    }

    return result;
}

function traverseGraph(numerator:string, denominator: string, graph: Map<string, Map<string, number>>, total: number, visited: Set<string>):number{
    if(!graph.has(numerator)){
        return -1;
    }

    if(numerator === denominator){
        return total;
    }

    visited.add(numerator);

    for(let [neighbor, value] of graph.get(numerator)){
        if(!visited.has(neighbor)){
            let continueTraverseGraph = traverseGraph(neighbor, denominator, graph, total*value, visited);

            if(continueTraverseGraph !== -1){
                return continueTraverseGraph;
            }
        }
    }

    return -1;
}

function createGraph(equations: string[][], values: number[]){
    const graph: Map<string, Map<string, number>> = new Map();

    for(let i = 0; i < equations.length; i++){
        let [numerator, denominator] = equations[i];
        let value = values[i];

        if(!graph.has(numerator)){
            graph.set(numerator, new Map());
        }

        if(!graph.has(denominator)){
            graph.set(denominator, new Map());
        }

        graph.get(numerator).set(denominator, value);
        graph.get(denominator).set(numerator, 1/ value);
    }

    return graph;
}


//A = 3.4
//B = 1
//E = 1.4
//F = 1