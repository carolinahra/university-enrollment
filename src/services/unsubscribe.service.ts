import { StudentService } from "./student.service.js";
import { CourseService } from "./course.service.js";
import { StudentHasCourseService } from "./student-has-course.service.js";
import { StudentNotFoundException } from "../exceptions/student-not-found.exception.js";
import { CourseNotFoundException } from "../exceptions/course-not-found.exception.js";
import { DatabaseService } from "./database.service.js";
import { PoolConnection } from "mysql2/promise";
import { StudentHasCourse } from "src/models/student-has-course.js";

export class UnsubscribeService {
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

    unsubcribeOne(studentEmail: string, courseName: string) {
        return Promise.all([this.studentService.getByEmail(studentEmail), this.courseService.getByName(courseName),])
            .then(([students, courses]) => {
                if (students.length == 0) {
                    throw new StudentNotFoundException();
                }
                if (courses.length == 0) {
                    throw new CourseNotFoundException();
                }
                return this.studentHasCourseService.updateState("inactive", students[0].id, courses[0].id)
            });
    }


    unsubscribeMany(studentEmails: string[], courseNames: string[]): Promise<StudentHasCourse[]> {
        const pool = this.databaseService.getPool();
        let connection: PoolConnection;

        return pool.getConnection()
            .then((conn) => {
                connection = conn;
                return connection.beginTransaction();
            })
            .then(() => Promise.all([
                this.studentService.getManyByEmail(studentEmails),
                this.courseService.getManyByName(courseNames),
            ]))
            .then(([students, courses]) => {
                const studentHasCourses: Promise<StudentHasCourse[]>[] = [];
                for (let i = 0; i < students.length; i++) {
                    for (let j = 0; j < courses.length; j++) {
                        studentHasCourses.push(this.studentHasCourseService.updateState('inactive', students[i].id, courses[j].id));
                    }
                }
                return Promise.all(studentHasCourses);
            })
            .then((studentHasCourses) => {
                return Promise.all([studentHasCourses, connection.commit()]);
            })
            .then(([studentHasCourses]) => { return studentHasCourses.flat() })
            .catch((error) => {
                return connection.rollback().then(() => {
                    throw error
                });
            })
            .finally(() => connection.release());
    }
}
