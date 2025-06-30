import { InvalidRequestException } from "../../exceptions/invalid-request.exception";

export class GetStudentHasCourseRequest {
    studentId: number;
    courseId: number;
    state: string;


    constructor(courseId: number, studentId: number, state: string) {
        this.courseId = courseId;
        this.studentId = studentId;
        this.state = state;
    }
    public validate() {
        if (this.isValidId(this.courseId)) {
            return this.courseId;
        }
        if (this.isValidId(this.studentId)) {
            return this.studentId;
        }
        if (this.isValidState(this.state)) {
            return this.state;
        }
        throw new InvalidRequestException();
    }

    private isValidId(id: number) {
        const idRegex = /^[0-9]+$/;
        return idRegex.test(id.toString());
    }
    private isValidState(state: string): boolean {
        const stateRegex = /^[A-Za-z]{2,}$/;
        return stateRegex.test(state);

    }

}