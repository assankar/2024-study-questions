class Employee {
    id;
    importance;
    subordinates;
    constructor(id, importance, subordinates) {
        this.id = (id === undefined) ? 0 : id;
        this.importance = (importance === undefined) ? 0 : importance;
        this.subordinates = (subordinates === undefined) ? [] : subordinates;
    }
}
const importances = new Map();
function getImportance(employees, id) {
    for (let employee of employees) {
        importances.set(employee.id, { importance: employee.importance, sub: employee.subordinates });
    }
    return dfs(id);
}
;
function dfs(id) {
    let result = 0;
    const employee = importances.get(id);
    if (!employee) {
        return 0;
    }
    result = result + employee.importance;
    if (employee.sub.length > 0) {
        for (const subId of employee.sub) {
            result = result + dfs(subId);
        }
    }
    return result;
}
function testGetImportance() {
    let e1 = new Employee(1, 5, [2, 3]);
    let e2 = new Employee(2, 3, []);
    let e3 = new Employee(3, 3, []);
    let e = [e1, e2, e3];
    let id = 1;
    console.log("should be 11: " + getImportance(e, id));
    let e4 = new Employee(1, 2, [5]);
    let e5 = new Employee(5, -3, []);
    e = [e4, e5];
    id = 5;
    console.log("should be -3: " + getImportance(e, id));
}
testGetImportance();
//# sourceMappingURL=EmployeeImportance.js.map