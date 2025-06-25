import { error } from "console";
import { StudentHasCourseService } from "../services/student-has-course.service"
import { ExceptionService } from "../services/exception.service"
export class StudentHasCourseController {
    private studentHasCourseService: StudentHasCourseService;
    private exceptionService: ExceptionService;
    constructor(studentHasCourseService: StudentHasCourseService, exceptionService: ExceptionService) {
        this.studentHasCourseService = studentHasCourseService;
        this.exceptionService = exceptionService;
    }

  

    getAll() {
        return this.studentHasCourseService.getAll();
    }

    getStudentHasCoursesByStudentId(studentId: number) {
        return this.studentHasCourseService.getByStudentId(studentId).catch((error) => {
            this.exceptionService.handle(error);
        });
    }

    getStudentHasCourseByCourseId(courseId: number) {
        return this.studentHasCourseService.getByCourseId(courseId).catch((error) => {
            this.exceptionService.handle(error);
        });
    }

    getStudentHasCoursesByStudentIdAndCourseId(studentId: number, courseId: number) {
        return this.studentHasCourseService.getByStudentIdAndCourseId(studentId, courseId).catch((error => {
            this.exceptionService.handle(error);
        }))
    }


}
