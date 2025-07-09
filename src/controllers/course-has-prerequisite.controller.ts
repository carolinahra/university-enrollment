import { CourseHasPrerequisite } from "../models/course-has-prerequisite.js";
import { GetCourseHasPrerequisiteRequest } from "../requests/course-has-prerequisite/get-course-has-prerequisite.request.dto.js";
import { CourseHasPrerequisiteService } from "../services/course-has-prerequisite.service.js"
import { ErrorResponse, ExceptionService } from "../services/exception.service.js"
export class CourseHasPrerequisiteController {
    private courseHasPrerequisiteService: CourseHasPrerequisiteService;
    private exceptionService: ExceptionService;
    constructor(courseHasPrerequisiteService: CourseHasPrerequisiteService, exceptionService: ExceptionService) {
        this.courseHasPrerequisiteService = courseHasPrerequisiteService;
        this.exceptionService = exceptionService;
    }


    get(request: GetCourseHasPrerequisiteRequest): Promise<CourseHasPrerequisite[] | ErrorResponse> {
        if (request.courseId) {
            return this.getCourseHasPrerequisiteByCourseId(request.courseId);
        }
        if (request.prerequisiteId) {
            return this.getCourseHasPrerequisitesByPrerequisiteId(request.prerequisiteId);
        }

        return this.getCourseHasPrerequisite(request.limit, request.offset);
    }

    getAll() {
        return this.courseHasPrerequisiteService.getAll();
    }

    getCourseHasPrerequisite(limit: number, offset: number) {
        return this.courseHasPrerequisiteService.get(limit, offset);
    }

    getCourseHasPrerequisitesByPrerequisiteId(prerequisiteId: number) {
        return this.courseHasPrerequisiteService.getByPrerequisiteId(prerequisiteId).catch((error) => {
            return this.exceptionService.handle(error);
        });
    }

    getCourseHasPrerequisiteByCourseId(courseId: number) {
        return this.courseHasPrerequisiteService.getByCourseId(courseId).catch((error) => {
            return this.exceptionService.handle(error);
        });
    }
    getCourseHasPrerequisiteByPrerequisiteIdAndCourseId(prerequisiteId: number, courseId: number) {
        return this.courseHasPrerequisiteService.getByPrerequisiteIdAndCourseId(courseId, prerequisiteId).catch((error) => {
            return this.exceptionService.handle(error);
        })
    }


}
