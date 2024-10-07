// [44, 32, 33, 34, 50, 60]
// [4,   1,  1,  1,  1,  0]
function sortTempDays(input) {
    let map = new Map();
    for (let i = 0; i < input.length; i++) {
        map.set(input[i], i);
        console.log(input[i].toString() + " " + map.get(input[i]));
    }
    let stack = [input[0]];
    let result = [];
    console.log("-----------------");
    console.log("-----------------");
    for (let i = 1; i < input.length; i++) {
        console.log(stack[stack.length - 1]);
        console.log(input[i]);
        console.log(stack[stack.length - 1] < input[i]);
        console.log("-----------------");
        while (stack[stack.length - 1] < input[i]) {
            let t = stack.pop();
            result[map.get(t)] = i - map.get(t);
        }
        stack.push(input[i]);
    }
    result.push(0);
    return result;
}
function testSortTempDays() {
    let testA = [44, 32, 33, 34, 50, 60];
    console.log(sortTempDays(testA));
}
testSortTempDays();
//# sourceMappingURL=SortTempDays.js.map