import { StudentService } from "../services/student.service.js";
import { DatabaseService } from "../services/database.service.js"
import { StudentFactory } from "../factories/student.factory.js";
import { StudentHasCourseFactory } from "../factories/student-has-course.factory.js";
import { ProfessorFactory } from "../factories/professor.factory.js";
import { CourseFactory } from "../factories/course.factory.js";
import { PrerequisiteFactory } from "../factories/prerequisite.factory.js";
import { GradeFactory } from "../factories/grade.factory.js";
import { CourseHasProfessorFactory } from "src/factories/course-has-professor.factory.js";
import { CourseHasPrerequisiteFactory } from "src/factories/course-has-prerequisite.factory.js";
import { Student } from "src/models/student.js";
import { Professor } from "src/models/professor.js";
import { Course } from "src/models/course.js";
import { Prerequisite } from "src/models/prerequisite.js";
import { Grade } from "src/models/grade.js";
import { CourseHasProfessor } from "src/models/course-has-professor.js";
import { CourseHasPrerequisite } from "src/models/course-has-prerequisite.js";
import { StudentHasCourse } from "src/models/student-has-course.js";

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
const courseHasProfessorFactory = new CourseHasProfessorFactory(databaseService);
const courseHasPrerequisiteFactory = new CourseHasPrerequisiteFactory(databaseService);

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



//Student

function isExistingStudentEmail(email: string): Promise<boolean> {
    return studentFactory.getByEmail(email).then((students) => {
        return (students.length > 0)
    });

}

function generateNonExistingStudentEmail(): Promise<string> {
    let email = stringGenerator();
    return isExistingStudentEmail(email)
        .then(function (existsEmail) {
            if (existsEmail) {
                return generateNonExistingStudentEmail();
            }
            return email;
        });
}


function insertStudent(numberOfInsert: number): Promise<Student[]> {

    return generateNonExistingStudentEmail()
        .then((email) => {
            const students: Promise<Student[]>[] = [];
            for (let i = 0; i < numberOfInsert; i++) {
                students.push(studentFactory.insert(stringGenerator(), email))
            }
            return Promise.all(students);
        })
        .then(([students]) => students)
        .catch((error) => { throw error })
}

// Professor

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

function insertProfessor(numberOfInsert: number): Promise<Professor[]> {
    return generateNonExistingProfessorEmail()
        .then((email) => {
            const professors: Promise<Professor[]>[] = [];
            for (let i = 0; i < numberOfInsert; i++) {
                professors.push(professorFactory.insert(stringGenerator(), email));
            }
            return Promise.all(professors);
        })
        .then(([professors]) => professors)
        .catch((error) => { throw error })
}

// Courses

function capacityGenerator(): number {
    const capacity = Math.floor(Math.random() * (300) + 50);
    return capacity;
}
function isExistingCourseName(name: string): Promise<boolean> {
    return courseFactory.getByName(name).then((courses) => {
        return (courses.length > 0)
    });

}

function generateNonExistingCourseName(): Promise<string> {
    let name = stringGenerator();
    return isExistingCourseName(name)
        .then(function (existsName) {
            if (existsName) {
                return generateNonExistingCourseName();
            }
            return name;
        });
}

function insertCourse(numberOfInsert: number): Promise<Course[]> {
    return generateNonExistingCourseName()
        .then((name) => {
            const courses: Promise<Course[]>[] = [];

            for (let i = 0; i < numberOfInsert; i++) {
                courses.push(courseFactory.insert(name, capacityGenerator(), 'active'))
            }
            return Promise.all(courses);
        })
        .then(([courses]) => courses)
        .catch((error) => { throw error })
}

// Prerequisite


function isExistingPrerequisiteName(name: string): Promise<boolean> {
    return prerequisiteFactory.getByName(name).then((prerequisites) => {
        return (prerequisites.length > 0)
    });

}

function generateNonExistingPrerequisiteName(): Promise<string> {
    let name = stringGenerator();
    return isExistingCourseName(name)
        .then(function (existsName) {
            if (existsName) {
                return generateNonExistingPrerequisiteName();
            }
            return name;
        });
}

function insertPrerequisite(numberOfInsert: number): Promise<Prerequisite[]> {
    return generateNonExistingPrerequisiteName()
        .then((name) => {
            const prerequisites: Promise<Prerequisite[]>[] = [];

            for (let i = 0; i < numberOfInsert; i++) {
                prerequisites.push(prerequisiteFactory.insert(name, stringGenerator(), 'active'))
            }
            return Promise.all(prerequisites)
        })
        .then(([prerequisites]) => prerequisites)
        .catch((error) => { throw error })
}


// Grades
function generateRandomGrade(): number {
    const grade = Math.floor(Math.random() * (10) + 1);
    return grade;

}

function generateRandomId(numberOfInsert: number): number {
    const id = Math.floor(Math.random() * numberOfInsert + 1);
    return id;
}

function generateRandomSemester(): number {
    const semester: number = Math.floor(Math.random() * (2) + 1);
    return semester;
}

function insertGrade(numberOfInsert: number): Promise<Grade[]> {
    const grades: Promise<Grade[]>[] = [];
    for (let i = 0; i < numberOfInsert; i++) {
        grades.push(gradeFactory.insert(generateRandomId(numberOfInsert), generateRandomId(numberOfInsert), generateRandomGrade(), generateRandomSemester()));
    }
    return Promise.all(grades)
        .then(([grades]) => grades)
        .catch((error) => { throw error });
}

// Course has Professor
function insertCourseHasProfessor(numberOfInsert: number): Promise<CourseHasProfessor[]> {
    const courseHasProfessors: Promise<CourseHasProfessor[]>[] = [];
    for (let i = 0; i < numberOfInsert; i++) {
        courseHasProfessors.push(courseHasProfessorFactory.insert(generateRandomId(numberOfInsert), generateRandomId(numberOfInsert), 'active'));
    }
    return Promise.all(courseHasProfessors)
        .then(([courseHasProfessors]) => courseHasProfessors)
        .catch((error) => { throw error });
}


// Course has Prerequisite
function insertCourseHasPrerequisite(numberOfInsert: number): Promise<CourseHasPrerequisite[]> {

    const courseHasPrerequisites: Promise<CourseHasPrerequisite[]>[] = [];
    for (let i = 0; i < numberOfInsert; i++) {
        courseHasPrerequisites.push(courseHasPrerequisiteFactory.insert(generateRandomId(numberOfInsert), generateRandomId(numberOfInsert), 'active'));
    }
    return Promise.all(courseHasPrerequisites)
        .then(([courseHasPrerequisites]) => courseHasPrerequisites)
        .catch((error) => { throw error });
}

// Student has Course
function insertStudentHasCourse(numberOfInsert: number): Promise<StudentHasCourse[]> {

    const studentHasCourses: Promise<StudentHasCourse[]>[] = [];
    for (let i = 0; i < numberOfInsert; i++) {
        studentHasCourses.push(studentHasCourseFactory.insert(generateRandomId(numberOfInsert), generateRandomId(numberOfInsert), 'active'));
    }
    return Promise.all(studentHasCourses)
        .then(([studentHasCourses]) => studentHasCourses)
        .catch((error) => { throw error });
}

insertStudent(numberOfInsert)
    .then(() => insertProfessor(numberOfInsert))
    .then(() => insertCourse(numberOfInsert))
    .then(() => insertPrerequisite(numberOfInsert))
    .then(() => insertGrade(numberOfInsert))
    .then(() => insertCourseHasProfessor(numberOfInsert))
    .then(() => insertCourseHasPrerequisite(numberOfInsert))
    .then(() => insertStudentHasCourse(numberOfInsert));