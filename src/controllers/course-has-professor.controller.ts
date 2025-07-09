import { error } from "console";
import { CourseHasProfessorService } from "../services/course-has-professor.service.js"
import { ExceptionService } from "../services/exception.service.js"
import { GetCourseHasProfessorRequest } from "../requests/course-has-professor/get-course-has-professor.request.dto.js";
export class CourseHasProfessorController {
    private courseHasProfessorService: CourseHasProfessorService;
    private exceptionService: ExceptionService;
    constructor(courseHasProfessorService: CourseHasProfessorService, exceptionService: ExceptionService) {
        this.courseHasProfessorService = courseHasProfessorService;
        this.exceptionService = exceptionService;
    }

    get(request: GetCourseHasProfessorRequest) {
              if (request.courseId) {
                return this.getCourseHasProfessorByCourseId(request.courseId);
            }
            if (request.professorId) {
                return this.getCourseHasProfessorByCourseId(request.professorId);
            }
    
            return this.getCourseHasProfessor(request.limit, request.offset);
    }


    getAll() {
        return this.courseHasProfessorService.getAll();
    }

    getCourseHasProfessor(limit: number, offset: number) {
        return this.courseHasProfessorService.get(limit, offset);
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
