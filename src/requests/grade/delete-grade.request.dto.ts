import { InvalidRequestException } from "../../exceptions/invalid-request.exception";

export class GetGradeRequest {
    studentId: number;
    courseId: number;


    constructor(studentId: number, courseId: number) {
        this.studentId = studentId;
        this.courseId = courseId;
    }

    public validate() {
        if (this.isValidId(this.courseId)) {
            return this.courseId;
        }
        if (this.isValidId(this.studentId)) {
            return this.studentId;
        }

        throw new InvalidRequestException();
    }

    private isValidId(id: number) {
        const idRegex = /^[0-9]+$/;
        return idRegex.test(id.toString());
    }
}