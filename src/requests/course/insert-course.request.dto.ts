import { InvalidRequest } from "../../exceptions/invalid-request.exception";

export class InsertCourseRequest {
    name: string
    capacity: number;
    state: string;

    constructor(name: string, capacity: number, state: string) {
        this.name = name;
        this.capacity = capacity;
        this.state = state;
    }
    public validate() {
        if (this.isValidState(this.state)) {
            return this.state;
        }
        if (this.isValidName(this.name)) {
            return this.name;
        }
        throw new InvalidRequest();
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