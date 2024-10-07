function maxNumberOfGroupsOf4Seats(n, reservedSeats) {
    let counter = 0;
    if (n === undefined || n === 0) {
        return 0;
    }
    let map = new Map();
    const set2345 = new Set([2, 3, 4, 5]);
    const set4567 = new Set([4, 5, 6, 7]);
    const set6789 = new Set([6, 7, 8, 9]);
    for (let i = 0; i < reservedSeats.length; i++) {
        if (!map.has(reservedSeats[i][0])) {
            map.set(reservedSeats[i][0], defaultMapGenerator());
        }
        let currentMap = map.get(reservedSeats[i][0]);
        let seat = reservedSeats[i][1];
        if (set2345.has(seat)) {
            currentMap.set(0, 0);
        }
        if (set4567.has(seat)) {
            currentMap.set(1, 0);
        }
        if (set6789.has(seat)) {
            currentMap.set(2, 0);
        }
    }
    console.log(map);
    return 0;
}
function defaultMapGenerator() {
    return new Map([[0, 1], [1, 1], [2, 1]]);
}
function testCinemaSeatAllocation() {
    let test1N = 3;
    let test1ReservedSeats = [[1, 2], [1, 3], [1, 8], [2, 6], [3, 1], [3, 10]];
    let test2N = 2;
    let test2ReservedSeats = [[2, 1], [1, 8], [2, 6]];
    let test3N = 4;
    let test3ReservedSeats = [[4, 3], [1, 4], [4, 6], [1, 7]];
    console.log(4 === maxNumberOfGroupsOf4Seats(test1N, test1ReservedSeats));
}
testCinemaSeatAllocation();
//# sourceMappingURL=CinemaSeatAllocation.js.map