import { error } from "console";
import { CourseService } from "../services/CourseService"
import { ErrorResponse, ExceptionService } from "../services/exception.service"
import { GetCourseRequest } from "../requests/course/get-course.request.dto";
import { Course } from "../models/Course";
export class CourseController {
    private courseService: CourseService;
    private exceptionService: ExceptionService;
    constructor(courseService: CourseService, exceptionService: ExceptionService) {
        this.courseService = courseService;
        this.exceptionService = exceptionService;
    }

    public get(request: GetCourseRequest): Promise<Course[] | ErrorResponse>  {
        if (request.name) {
            return this.getCourseByName(request.name);
        }
        if (request.state) {
            return this.getCourseByState(request.state);
        }
        return this.getAll();
    }

    private getAll() {
        return this.courseService.getAll();
    }

    private getCourseByName(name: string) {
        return this.courseService.getByName(name).catch((error) => {
            return this.exceptionService.handle(error);
        });
    }

    private getCourseByState(state: string) {
        return this.courseService.getByState(state).catch((error) => {
            return this.exceptionService.handle(error);
        });
    }


}
