import { Student } from "../models/student";
import { StudentService } from "../services/student.service";
import { DatabaseService } from "../services/database.service"
import { StudentFactory } from "../factories/student.factory";
import { StudentHasCourseFactory } from "../factories/student-has-course.factory";
import { StudentHasCourseService } from "../services/student-has-course.service";

const databaseService = new DatabaseService({
    database: "university_enrollment_system",
    user: "carolina",
    password: "",
    host: "localhost"
});
const studentFactory = new StudentFactory(databaseService);
const studentService = new StudentService(studentFactory);
const studentHasCourseFactory = new StudentHasCourseFactory(databaseService);
const studentHasCourseService = new StudentHasCourseService(studentHasCourseFactory);

const numberOfStudents: number = 0;
function stringGenerator(): string {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = '';
    const randomNumber = Math.floor(Math.random() * (10 - 4) + 5);
    for (let i = 0; i < randomNumber; i++) {
        const letterPosition = Math.floor(Math.random() * letters.length);
        result += letters[letterPosition];
    } 
    return result;
}

function courseIdGenerator(): number {
    const randomNumber = Math.floor(Math.random() * (2) + 1);
    return randomNumber;
}
for (let i = 0; i < numberOfStudents; i++) {
    const email = stringGenerator();
    studentFactory.insert(stringGenerator(), email)
        .then(() => studentFactory.getByEmail(email))
        .then((student) => studentHasCourseFactory.insert(student[0].id, courseIdGenerator(),'active'));

}