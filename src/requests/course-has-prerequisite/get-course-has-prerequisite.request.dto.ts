import { InvalidRequestException } from "../../exceptions/invalid-request.exception";

export class GetCourseHasPrerequisiteRequest {
    courseId?: number;
    prerequisiteId?: number;

    constructor(courseId?: number, prerequisiteId?: number) {
        this.courseId = courseId;
        this.prerequisiteId = prerequisiteId;
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