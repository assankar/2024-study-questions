class Student {
    name;
    teacherName;
    schoolName;
    gradeLevel;
    age;
    constructor(name, teacherName, schoolName, gradeLevel, age) {
        if (name === undefined) {
            this.name = "";
        }
        else {
            this.name = name;
        }
        if (teacherName === undefined) {
            this.teacherName = "";
        }
        else {
            this.teacherName = teacherName;
        }
        if (schoolName === undefined) {
            this.schoolName = "";
        }
        else {
            this.schoolName = schoolName;
        }
        if (gradeLevel === undefined) {
            this.gradeLevel = 0;
        }
        else {
            this.gradeLevel = gradeLevel;
        }
        if (age === undefined) {
            this.age = -1;
        }
        else {
            this.age = age;
        }
    }
    encode() {
        return `{"name":"${this.name}","teacherName":"${this.teacherName}","schoolName":"${this.schoolName}","gradeLevel":"${this.gradeLevel}","age":"${this.age}"}`;
    }
    static decode(input) {
        input = input.slice(1, -1);
        console.log(input);
        let tokens = input.split(',');
        let name;
        let teacherName;
        let schoolName;
        let gradeLevel;
        let age;
        for (let t of tokens) {
            let pair = t.split(':');
            if (pair[0] === '"name"') {
                name = pair[1].slice(1, -1);
            }
            else if (pair[0] === '"teacherName"') {
                teacherName = pair[1].slice(1, -1);
            }
            else if (pair[0] === '"schoolName"') {
                schoolName = pair[1].slice(1, -1);
            }
            else if (pair[0] === '"gradeLevel"') {
                gradeLevel = pair[1].slice(1, -1);
            }
            else if (pair[0] === '"age"') {
                age = pair[1].slice(1, -1);
            }
        }
        return new Student(name, teacherName, schoolName, gradeLevel, age);
    }
}
function testEncoding() {
    // Lets Encode an object obj
    let Sakthi = new Student("sakthi", "wichmann", "collins", 5, 9);
    let Anup = new Student("anup", "mommi", "faria", 2, 7);
    let Josiah = new Student("josiah");
    let studentList = [Sakthi, Anup, Josiah];
    console.log(encode(studentList));
    console.log(encode(decode(encode(studentList))));
}
;
function encode(studentList) {
    let encodedStudents = [];
    for (let student of studentList) {
        encodedStudents.push(student.encode());
    }
    return encodedStudents;
}
function decode(students) {
    let decodedStudents = [];
    for (let student of students) {
        decodedStudents.push(Student.decode(student));
    }
    return decodedStudents;
}
testEncoding();
//# sourceMappingURL=CreateEncoderAndDecoder.js.map