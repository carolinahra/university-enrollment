import { StudentService } from "./student.service";
import { CourseService } from "./course.service";
import { StudentHasCourseService } from "./student-has-course.service";
import { Student } from "../models/student";
import { StudentNotFoundException } from "../exceptions/student-not-found.exception";
import { CourseNotFoundException } from "../exceptions/course-not-found.exception";

export class InscriptionService {
    private studentService: StudentService;
    private courseService: CourseService;
    private studentHasCourseService: StudentHasCourseService;

    constructor(studentService: StudentService, courseService: CourseService, studentHasCourseService: StudentHasCourseService) {
        this.studentService = studentService;
        this.courseService = courseService;
        this.studentHasCourseService = studentHasCourseService;
    }

    handle(studentEmail: string, courseName: string) {
        /*Promise.all([
        this.studentService.getByEmail(studentEmail),
        this.courseService.getByName(courseName),
        ]).then(([student, course, number]) => {
            
        })*/
        return this.studentService.getByEmail(studentEmail)
            .then((students) => {
                if (!students.length) { // GUARD OK
                    throw new StudentNotFoundException();
                }

                return Promise.all([students, this.courseService.getByName(courseName)]);
            })
            .then(([students, courses]) => {
                if (!courses.length) { // GUARD OK
                    throw new CourseNotFoundException();
                }

                return this.createStudentHasCourse(students[0].id!, courses[0].id!, "active");
            });
    }

    private createStudentHasCourse(studentId: number, courseId: number, state: string) {
        return this.studentHasCourseService.insert(studentId, courseId, state);
    }

}