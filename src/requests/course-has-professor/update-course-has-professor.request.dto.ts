import { InvalidRequest } from "../../exceptions/invalid-request.exception";

export class UpdateCourseHasProfessorRequest {
    courseId: number;
    professorId: number;
    state?: string;
    newCourseId?: number;


    constructor(courseId: number, professorId: number, state?: string, newCourseId?: number) {
        this.courseId = courseId;
        this.professorId = professorId;
        this.state = state;
        this.newCourseId = newCourseId;
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
        if (this.isValidId(this.newCourseId)) {
            return this.newCourseId;
        }
        throw new InvalidRequest();
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
