import { InvalidRequestException } from "../../exceptions/invalid-request.exception.js";

export class UpdateCourseHasPrerequisiteRequest {
    courseId: number;
    prerequisiteId: number;
    state?: string;
    newCourseId?: number;


    constructor(courseId: number, prerequisiteId: number, state?: string, newCourseId?: number) {
        this.courseId = courseId;
        this.prerequisiteId = prerequisiteId;
        this.state = state;
        this.newCourseId = newCourseId;
    }
    public validate() {
        if (this.isValidId(this.courseId)) {
            return this.courseId;
        }
        if (this.isValidId(this.prerequisiteId)) {
            return this.prerequisiteId;
        }
        if (this.isValidState(this.state)) {
            return this.state;
        }
        if (this.isValidId(this.newCourseId)) {
            return this.newCourseId;
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
