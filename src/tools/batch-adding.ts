import { Student } from "../models/student.js";
import { StudentService } from "../services/student.service.js";
import { DatabaseService } from "../services/database.service.js"
import { StudentFactory } from "../factories/student.factory.js";
import { StudentHasCourseFactory } from "../factories/student-has-course.factory.js";
import { StudentHasCourseService } from "../services/student-has-course.service.js";

const databaseService = new DatabaseService({
    database: "university_enrollment_system",
    user: "carolina",
    password: "",
    host: "localhost"
});
databaseService.connect();
const studentFactory = new StudentFactory(databaseService);
const studentService = new StudentService(studentFactory);
const studentHasCourseFactory = new StudentHasCourseFactory(databaseService);
const studentHasCourseService = new StudentHasCourseService(studentHasCourseFactory);

const numberOfStudents: number = 1_000_000;
function stringGenerator(): string {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = '';
    const randomNumber = Math.floor(Math.random() * (10) + 10 );
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

let counter = 0;
function isExistingEmail(email: string): Promise<boolean> {
    return studentFactory.getByEmail(email).then((students) => {
        return (students.length > 0)
    });

}

function generateNonExistingEmail() {
    let email = stringGenerator();
    return isExistingEmail(email)
        .then(function (existsEmail) {
            if (existsEmail) {
               return generateNonExistingEmail();
            }
            return email;
        });
}

function insertStudent(numberOfStudents: number) {
   if (counter == numberOfStudents) {
        return;
   }
    
    generateNonExistingEmail()
        .then((email) => studentFactory.insert(stringGenerator(), email))
        .then((student) => studentHasCourseFactory.insert(student[0].id, courseIdGenerator(), 'active'))
        .then(() => counter++)
        .then(() => {
            if (counter == numberOfStudents) {
                databaseService.disconnect()
            };
        })
        .then(() => insertStudent(numberOfStudents))
        .catch(error => {
            console.log(error);
        });
    
}


insertStudent(numberOfStudents);

