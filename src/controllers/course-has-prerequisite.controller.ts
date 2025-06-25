import { CourseHasPrerequisiteService } from "../services/CourseHasPrerequisiteService"
import { ExceptionService } from "../services/exception.service"
export class CourseHasPrerequisiteController {
    private CourseHasPrerequisiteService: CourseHasPrerequisiteService;
    private exceptionService: ExceptionService;
    constructor(CourseHasPrerequisiteService: CourseHasPrerequisiteService, exceptionService: ExceptionService) {
        this.CourseHasPrerequisiteService = CourseHasPrerequisiteService;
        this.exceptionService = exceptionService;
    }
    getAll() {
        return this.CourseHasPrerequisiteService.getAll();
    }

    getCourseHasPrerequisitesByPrerequisiteId(prerequisiteId: number) {
        return this.CourseHasPrerequisiteService.getByPrerequisiteId(prerequisiteId).catch((error) => {
            this.exceptionService.handle(error);
        });
    }

    getCourseHasPrerequisiteByCourseId(courseId: number) {
        return this.CourseHasPrerequisiteService.getByCourseId(courseId).catch((error) => {
            this.exceptionService.handle(error);
        });
    }
    getCourseHasPrerequisiteByPrerequisiteIdAndCourseId(prerequisiteId: number, courseId: number) {
        return this.CourseHasPrerequisiteService.getByPrerequisiteIdAndCourseId(courseId, prerequisiteId).catch((error) => {
            this.exceptionService.handle(error);
        })
    }


}
