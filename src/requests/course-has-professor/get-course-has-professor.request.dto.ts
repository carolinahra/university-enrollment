import { InvalidRequestException } from "../../exceptions/invalid-request.exception.js";

export class GetCourseHasProfessorRequest {
    courseId?: number;
    professorId?: number;
    limit?: number;
    offset?: number;

    constructor(courseId?: number, professorId?: number, limit?: number, offset?: number) {
        this.courseId = courseId;
        this.professorId = professorId;
        this.limit = limit;
        this.offset = offset;
    }
    public validate() {
        if (this.isValidId(this.courseId)) {
            return this.courseId;
        }
        if (this.isValidId(this.professorId)) {
            return this.professorId;
        }
        throw new InvalidRequestException();
    }

    private isValidId(id: number) {
        const idRegex = /^[0-9]+$/;
        return idRegex.test(id.toString());
    }

}