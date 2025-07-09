import { InvalidRequestException } from "../../exceptions/invalid-request.exception.js";

export class GetCourseRequest {
    name?: string;
    state?: string;
    limit?: number;
    ofset?: number;
    constructor(name?: string, state?: string, limit?: number, ofset?: number) {
        this.name = name;
        this.state = state;
        this.limit = limit;
        this.ofset = ofset;
    }
    public validate() {
        if (this.isValidState(this.state)) {
            return this.state;
        }
        if (this.isValidName(this.name)) {
            return this.name;
        }
        throw new InvalidRequestException();
    }

    private isValidName(name: string): boolean {
        const nameRegex = /^[A-Za-z]{2,}$/;
        return nameRegex.test(name);

    }
    private isValidState(state: string): boolean {
        const stateRegex = /^[A-Za-z]{2,}$/;
        return stateRegex.test(state);

    }

}