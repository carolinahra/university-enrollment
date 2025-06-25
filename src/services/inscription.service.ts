import { StudentService } from "./student.service";
import { CourseService } from "./course.service";
import { StudentHasCourseService } from "./student-has-course.service";
import { Student } from "../models/student";
import { StudentNotFound } from "../exceptions/student-not-found.exception";
import { CourseNotFound } from "../exceptions/course-not-found.exception";

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
        let student: Student;

        return this.studentService.getByEmail(studentEmail)
            .then((students) => {
                if (!students.length) { // GUARD OK
                    throw new StudentNotFound();
                }

                student = students[0];
                return this.courseService.getByName(courseName);
            })
            .then((courses) => {
                if (!courses.length) { // GUARD OK
                    throw new CourseNotFound();
                }

                return this.createStudentHasCourse(student.id!, courses[0].id!, "active");
            });
    }

    private createStudentHasCourse(studentId: number, courseId: number, state: string) {
        return this.studentHasCourseService.insert(studentId, courseId, state);
    }

}