import { StudentService } from "../services/student.service.js";
import { DatabaseService } from "../services/database.service.js"
import { StudentFactory } from "../factories/student.factory.js";
import { StudentHasCourseFactory } from "../factories/student-has-course.factory.js";
import { StudentHasCourseService } from "../services/student-has-course.service.js";
import { ProfessorFactory } from "src/factories/professor.factory.js";
import { CourseFactory } from "src/factories/course.factory.js";
import { Prerequisite } from "src/models/prerequisite.js";
import { PrerequisiteFactory } from "src/factories/prerequisite.factory.js";
import { GradeFactory } from "src/factories/grade.factory.js";

const databaseService = new DatabaseService({
    database: "university_enrollment_system",
    user: "carolina",
    password: "",
    host: "localhost"
});
databaseService.connect();
const studentFactory = new StudentFactory(databaseService);
const studentHasCourseFactory = new StudentHasCourseFactory(databaseService);
const professorFactory = new ProfessorFactory(databaseService);
const courseFactory = new CourseFactory(databaseService);
const prerequisiteFactory = new PrerequisiteFactory(databaseService);
const gradeFactory = new GradeFactory(databaseService);

const numberOfInsert: number = 0;
function stringGenerator(): string {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = '';
    const randomNumber = Math.floor(Math.random() * (10) + 10);
    for (let i = 0; i < randomNumber; i++) {
        const letterPosition = Math.floor(Math.random() * letters.length);
        result += letters[letterPosition];
    }
    return result;
}

function courseIdGenerator(): number {
    const courseId = Math.floor(Math.random() * (2) + 1);
    return courseId;
}


//Student

let studentCounter = 0;
function isExistingStudentEmail(email: string): Promise<boolean> {
    return studentFactory.getByEmail(email).then((students) => {
        return (students.length > 0)
    });

}

function generateNonExistingStudentEmail() {
    let email = stringGenerator();
    return isExistingStudentEmail(email)
        .then(function (existsEmail) {
            if (existsEmail) {
                return generateNonExistingStudentEmail();
            }
            return email;
        });
}

function insertStudent(numberOfInsert: number) {
    if (studentCounter == numberOfInsert) {
        return;
    }

    generateNonExistingStudentEmail()
        .then((email) => studentFactory.insert(stringGenerator(), email))
        .then(() => studentCounter++)
        .then(() => {
            if (studentCounter == numberOfInsert) {
                databaseService.disconnect()
            };
        })
        .then(() => insertProfessor(numberOfInsert))
        .catch(error => {
            console.log(error);
        });

}

// Professor

let professorCounter = 0;
function isExistingProfessorEmail(email: string): Promise<boolean> {
    return professorFactory.getByEmail(email).then((professors) => {
        return (professors.length > 0)
    });

}

function generateNonExistingProfessorEmail() {
    let email = stringGenerator();
    return isExistingProfessorEmail(email)
        .then(function (existsEmail) {
            if (existsEmail) {
                return generateNonExistingProfessorEmail();
            }
            return email;
        });
}

function insertProfessor(numberOfInsert: number) {
    generateNonExistingProfessorEmail()
        .then((email) => professorFactory.insert(stringGenerator(), email))
        .then(() => professorCounter++)
        .then(() => {
            if (professorCounter == numberOfInsert) {
                databaseService.disconnect()
            };
        })
        .then(() => insertProfessor(numberOfInsert))
        .catch(error => {
            console.log(error);
        });
}

// Courses
let courseCounter = 0;

function capacityGenerator(): number {
    const capacity = Math.floor(Math.random() * (300) + 50);
    return capacity;
}
function isExistingCourseName(name: string): Promise<boolean> {
    return courseFactory.getByName(name).then((courses) => {
        return (courses.length > 0)
    });

}

function generateNonExistingCourseName() {
    let name = stringGenerator();
    return isExistingCourseName(name)
        .then(function (existsName) {
            if (existsName) {
                return generateNonExistingCourseName();
            }
            return name;
        });
}

function insertCourse(numberOfInsert: number) {
    generateNonExistingCourseName()
        .then((name) => courseFactory.insert(name, capacityGenerator(),'active'))
        .then(() => courseCounter++)
        .then(() => {
            if (courseCounter == numberOfInsert) {
                databaseService.disconnect()
            };
        })
        .then(() => insertCourse(numberOfInsert))
        .catch(error => {
            console.log(error);
        });
}

// Prerequisite

let prerequisiteCounter = 0;

function isExistingPrerequisiteName(name: string): Promise<boolean> {
    return prerequisiteFactory.getByName(name).then((prerequisites) => {
        return (prerequisites.length > 0)
    });

}

function generateNonExistingPrerequisiteName() {
    let name = stringGenerator();
    return isExistingCourseName(name)
        .then(function (existsName) {
            if (existsName) {
                return generateNonExistingPrerequisiteName();
            }
            return name;
        });
}

/*function insertCourse(numberOfInsert: number) {
    generateNonExistingCourseName()
        .then((name) => courseFactory.insert(name, capacityGenerator(),'active'))
        .then(() => courseCounter++)
        .then(() => {
            if (courseCounter == numberOfInsert) {
                databaseService.disconnect()
            };
        })
        .then(() => insertCourse(numberOfInsert))
        .catch(error => {
            console.log(error);
        });
}*/


insertStudent(numberOfInsert);
