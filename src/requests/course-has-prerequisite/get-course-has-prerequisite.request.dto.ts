import { InvalidRequestException } from "../../exceptions/invalid-request.exception.js";

export class GetCourseHasPrerequisiteRequest {
    courseId?: number;
    prerequisiteId?: number;
    limit?: number;
    offset?: number;

    constructor(courseId?: number, prerequisiteId?: number, limit?: number, offset?: number) {
        this.courseId = courseId;
        this.prerequisiteId = prerequisiteId;
        this.limit = limit;
        this.offset = offset;
    }
    public validate() {
        if (this.isValidId(this.courseId)) {
            return this.courseId;
        }
        if (this.isValidId(this.prerequisiteId)) {
            return this.prerequisiteId;
        }
        throw new InvalidRequestException();
    }

    private isValidId(id: number) {
        const idRegex = /^[0-9]+$/;
        return idRegex.test(id.toString());
    }

}