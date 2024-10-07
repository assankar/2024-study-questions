function calcEquation2(equations, values, queries) {
    let map = new Map();
    let counter = 0;
    for (let e of equations) {
        if (!map.has(e[0]) && !map.has(e[1])) {
            map.set(e[0], values[counter]);
            map.set(e[1], 1);
            counter++;
        }
        else if (map.has(e[0]) && !map.has(e[1])) {
            map.set(e[1], map.get(e[0]) / values[counter]);
            counter++;
        }
        else if (!map.has(e[0]) && map.has(e[1])) {
            map.set(e[0], values[counter] * map.get(e[1]));
            counter++;
        }
    }
    let result = [];
    for (let q of queries) {
        if (map.has(q[0]) && map.has(q[1])) {
            let numerator = map.get(q[0]);
            let denominator = map.get(q[1]);
            result.push((numerator / denominator));
        }
        else {
            result.push(-1.0);
        }
    }
    return result;
}
;
function calcEquation(equations, values, queries) {
    const graph = createGraph(equations, values);
    let visited = new Set();
    let result = [];
    for (let [numerator, denominator] of queries) {
        result.push(traverseGraph(numerator, denominator, graph, 1, new Set()));
    }
    return result;
}
function traverseGraph(numerator, denominator, graph, total, visited) {
    if (!graph.has(numerator)) {
        return -1;
    }
    if (numerator === denominator) {
        return total;
    }
    visited.add(numerator);
    for (let [neighbor, value] of graph.get(numerator)) {
        if (!visited.has(neighbor)) {
            let continueTraverseGraph = traverseGraph(neighbor, denominator, graph, total * value, visited);
            if (continueTraverseGraph !== -1) {
                return continueTraverseGraph;
            }
        }
    }
    return -1;
}
function createGraph(equations, values) {
    const graph = new Map();
    for (let i = 0; i < equations.length; i++) {
        let [numerator, denominator] = equations[i];
        let value = values[i];
        if (!graph.has(numerator)) {
            graph.set(numerator, new Map());
        }
        if (!graph.has(denominator)) {
            graph.set(denominator, new Map());
        }
        graph.get(numerator).set(denominator, value);
        graph.get(denominator).set(numerator, 1 / value);
    }
    return graph;
}
//A = 3.4
//B = 1
//E = 1.4
//F = 1
//# sourceMappingURL=EvaluateDivision.js.map