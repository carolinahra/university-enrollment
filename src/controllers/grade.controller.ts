import { GradeService } from "../services/GradeService"
import { ErrorResponse, ExceptionService } from "../services/exception.service"
import { GetGradeRequest } from "../requests/grade/get-grade.request.dto";
import { Grade } from "../models/grade";
export class GradeController {
    private gradeService: GradeService;
    private exceptionService: ExceptionService;
    constructor(gradeService: GradeService, exceptionService: ExceptionService) {
        this.gradeService = gradeService;
        this.exceptionService = exceptionService;
    }

    public get(request: GetGradeRequest): Promise<Grade[] | ErrorResponse> {
        if (request.courseId) {
            return this.getGradesByCourseId(request.courseId);
        }
        if (request.studentId) {
            return this.getGradesByStudentId(request.studentId);
        }
        if (request.grade) {
            return this.getByGrades(request.grade);
        }
        if (request.semester) {
            return this.getGradesBySemester(request.semester);
        }
        if (request.studentId & request.courseId) {
            return this.getGradeByStudentIdAndCourseId(request.studentId, request.courseId);
        }
        return this.getAll();
    }

    private getAll() {
        return this.gradeService.getAll();
    }

    private getGradesByCourseId(courseId: number) {
        return this.gradeService.getByCourseId(courseId).catch((error) => {
            return this.exceptionService.handle(error);
        });
    }

    private getGradesByStudentId(studentId: number) {
        return this.gradeService.getByStudentId(studentId).catch((error) => {
            return this.exceptionService.handle(error);
        })
    }

    private getByGrades(grade: number) {
        return this.gradeService.getByGrade(grade).catch((error) => {
            return this.exceptionService.handle(error);
        });
    }

    private getGradesBySemester(semester: number) {
        return this.gradeService.getBySemester(semester).catch((error) => {
            return this.exceptionService.handle(error);
        })
    }

    private getGradeByStudentIdAndCourseId(studentId: number, courseId: number) {
        return this.gradeService.getByStudentIdAndCourseId(studentId, courseId).catch((error) => {
            return this.exceptionService.handle(error);
        })
    }



}
