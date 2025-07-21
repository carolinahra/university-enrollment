import { StudentService } from "./student.service.js";
import { CourseService } from "./course.service.js";
import { StudentHasCourseService } from "./student-has-course.service.js";
import { StudentNotFoundException } from "../exceptions/student-not-found.exception.js";
import { CourseNotFoundException } from "../exceptions/course-not-found.exception.js";
import { DatabaseService } from "../services/database.service.js";
import { StudentHasCourse } from "../models/student-has-course.js";
import { PoolConnection } from "mysql2/promise";

export class InscriptionService {
    private studentService: StudentService;
    private courseService: CourseService;
    private studentHasCourseService: StudentHasCourseService;
    private databaseService: DatabaseService;

    constructor(studentService: StudentService, courseService: CourseService, studentHasCourseService: StudentHasCourseService, databaseService: DatabaseService) {
        this.studentService = studentService;
        this.courseService = courseService;
        this.studentHasCourseService = studentHasCourseService;
        this.databaseService = databaseService;
    }


    inscribeOne(studentEmail: string, courseName: string) {
        return Promise.all([
            this.studentService.getByEmail(studentEmail),
            this.courseService.getByName(courseName),
        ])
            .then(([students, courses]) => {
                if (students.length == 0) {
                    throw new StudentNotFoundException();
                }
                if (courses.length == 0) {
                    throw new CourseNotFoundException();
                }
                return this.studentHasCourseService.insert(students[0].id, courses[0].id, "active")
            });
    }

    inscribeMany(studentEmails: string[], courseNames: string[]): Promise<StudentHasCourse[]> {
        const pool = this.databaseService.getPool();
        let connection: PoolConnection;

        return pool.getConnection()
            .then((conn) => {
                connection = conn;
                return connection.beginTransaction()
            })
            .then(() => {
                return Promise.all([
                    this.studentService.getManyByEmail(studentEmails),
                    this.courseService.getManyByName(courseNames),
                ])
            })
            .then(([students, courses]) => {
                const studentHasCourses: Promise<StudentHasCourse[]>[] = [];

                for (let i = 0; i < students.length; i++) {
                    for (let j = 0; j < courses.length; j++) {
                        studentHasCourses.push(this.studentHasCourseService.insert(students[i].id, courses[j].id, 'active', connection));
                    }
                }

                return Promise.all(studentHasCourses);
            })
            .then((studentHasCourses) => {
                return Promise.all([studentHasCourses, connection.commit()])

            })
            .then(([studentHasCourses]) => { return studentHasCourses.flat() })
            .catch((error) => {
                return connection.rollback().then(() => {
                    throw error;
                });
            })
            .finally(() => connection.release());
    }
}