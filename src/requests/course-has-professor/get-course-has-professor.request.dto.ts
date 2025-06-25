import { InvalidRequest } from "../../exceptions/invalid-request.exception";

export class GetCourseHasProfessorRequest {
    courseId?: number;
    professorId?: number;

    constructor(courseId?: number, professorId?: number) {
        this.courseId = courseId;
        this.professorId = professorId;
    }
    public validate() {
        if (this.isValidId(this.courseId)) {
            return this.courseId;
        }
        if (this.isValidId(this.professorId)) {
            return this.professorId;
        }
        throw new InvalidRequest();
    }

    private isValidId(id: number) {
        const idRegex = /^[0-9]+$/;
        return idRegex.test(id.toString());
    }

}