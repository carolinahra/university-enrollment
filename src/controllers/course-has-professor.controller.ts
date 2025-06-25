import { error } from "console";
import { CourseHasProfessorService } from "../services/CourseHasProfessorService"
import { ExceptionService } from "../services/exception.service"
export class CourseHasProfessorController {
    private courseHasProfessorService: CourseHasProfessorService;
    private exceptionService: ExceptionService;
    constructor(courseHasProfessorService: CourseHasProfessorService, exceptionService: ExceptionService) {
        this.courseHasProfessorService = courseHasProfessorService;
        this.exceptionService = exceptionService;
    }
    getAll() {
        return this.courseHasProfessorService.getAll();
    }

    getCourseHasProfessorsByProfessorId(professorId: number) {
        return this.courseHasProfessorService.getByProfessorId(professorId).catch((error) => {
            this.exceptionService.handle(error);
        });
    }

    getCourseHasProfessorByCourseId(courseId: number) {
        return this.courseHasProfessorService.getByCourseId(courseId).catch((error) => {
            this.exceptionService.handle(error);
        });
    }
    getCourseHasProfessorByProfessorIdAndCourseId(professorId: number, courseId: number) {
        return this.courseHasProfessorService.getByProfessorIdAndCourseId(courseId, professorId).catch((error) => {
            this.exceptionService.handle(error);
        })
    }


}
