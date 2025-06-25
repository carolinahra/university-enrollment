import { error } from "console";
import { GradeService } from "../services/GradeService"
import { ExceptionService } from "../services/exception.service"
import e from "express";
export class GradeController {
    private gradeService: GradeService;
    private exceptionService: ExceptionService;
    constructor(gradeService: GradeService, exceptionService: ExceptionService) {
        this.gradeService = gradeService;
        this.exceptionService = exceptionService;
    }
    getAll() {
        return this.gradeService.getAll();
    }

    getGradesByCourseId(courseId: number) {
        return this.gradeService.getByCourseId(courseId).catch((error) => {
            this.exceptionService.handle(error);
        });
    }

    getGradesByStudentId(studentId: number) {
        return this.gradeService.getByStudentId(studentId).catch((error) => {
            this.exceptionService.handle(error);
        })
    }

    getByGrades(grade: number) {
        return this.gradeService.getByGrade(grade).catch((error) => {
            this.exceptionService.handle(error);
        });
    }

    getGradesBySemester(semester: number) {
        return this.gradeService.getBySemester(semester).catch((error) => {
            this.exceptionService.handle(error);
        })
    }

    getGradeByStudentIdAndCourseId(studentId: number, courseId: number) {
        return this.gradeService.getByStudentIdAndCourseId(studentId, courseId).catch((error) => {
            this.exceptionService.handle(error);
        })
    }



}
