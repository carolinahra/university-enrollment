import { InvalidRequestException } from "../../exceptions/invalid-request.exception.js";

export class InsertCourseHasProfessorRequest {
    courseId: number;
    professorId: number;
    state: string;


    constructor(courseId: number, professorId: number, state: string) {
        this.courseId = courseId;
        this.professorId = professorId;
        this.state = state;
    }
    public validate() {
        if (this.isValidId(this.courseId)) {
            return this.courseId;
        }
        if (this.isValidId(this.professorId)) {
            return this.professorId;
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