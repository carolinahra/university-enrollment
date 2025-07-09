import { StudentService } from "./student.service.js";
import { CourseService } from "./course.service.js";
import { StudentHasCourseService } from "./student-has-course.service.js";
import { StudentNotFoundException } from "../exceptions/student-not-found.exception.js";
import { CourseNotFoundException } from "../exceptions/course-not-found.exception.js";

export class UnsubscribeService {
    private studentService: StudentService;
    private courseService: CourseService;
    private studentHasCourseService: StudentHasCourseService;

    constructor(studentService: StudentService, courseService: CourseService, studentHasCourseService: StudentHasCourseService) {
        this.studentService = studentService;
        this.courseService = courseService;
        this.studentHasCourseService = studentHasCourseService;
    }

    handle(studentEmail: string, courseName: string) {
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

}
