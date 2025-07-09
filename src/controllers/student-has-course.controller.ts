import { error } from "console";
import { StudentHasCourseService } from "../services/student-has-course.service.js"
import { ErrorResponse, ExceptionService } from "../services/exception.service.js"
import { GetStudentHasCourseRequest } from "../requests/student-has-course/get-student-has-course.request.dto.js";
import { StudentHasCourse } from "../models/student-has-course.js";
export class StudentHasCourseController {
    private studentHasCourseService: StudentHasCourseService;
    private exceptionService: ExceptionService;
    constructor(studentHasCourseService: StudentHasCourseService, exceptionService: ExceptionService) {
        this.studentHasCourseService = studentHasCourseService;
        this.exceptionService = exceptionService;
    }

    
        public get(request: GetStudentHasCourseRequest): Promise<StudentHasCourse[] | ErrorResponse> {
            if (request.studentId) {
                return this.getStudentHasCoursesByStudentId(request.studentId);
            }
            if (request.courseId) {
                return this.getStudentHasCourseByCourseId(request.courseId);
            }
    
            return this.getStudentHasCourse(request.limit, request.offset);
        }
    

    private getAll() {
        return this.studentHasCourseService.getAll();
    }

    private getStudentHasCourse(limit: number, offset: number) {
        return this.studentHasCourseService.get(limit, offset);
    }

   private  getStudentHasCoursesByStudentId(studentId: number) {
        return this.studentHasCourseService.getByStudentId(studentId).catch((error) => {
            return this.exceptionService.handle(error);
        });
    }

    private getStudentHasCourseByCourseId(courseId: number) {
        return this.studentHasCourseService.getByCourseId(courseId).catch((error) => {
            return this.exceptionService.handle(error);
        });
    }

    private getStudentHasCoursesByStudentIdAndCourseId(studentId: number, courseId: number) {
        return this.studentHasCourseService.getByStudentIdAndCourseId(studentId, courseId).catch((error => {
            return this.exceptionService.handle(error);
        }))
    }


}
