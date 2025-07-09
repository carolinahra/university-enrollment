import { stringify } from "querystring";
import { InvalidRequestException } from "../../exceptions/invalid-request.exception.js";

export class UpdateCourseRequest {
    name: string;
    newName?: string;
    capacity?: number;
    state?: string;

    constructor(name: string, newName: string, capacity?: number, state?: string) {
        this.name = name;
        this.newName = newName;
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
        if (this, this.isValidName(this.newName)) {
            return this.newName;
        }
        if (this.isValidCapacity(this.capacity)) {
            return this.capacity;
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

    private isValidCapacity(capacity: number) {
        const capacityRegex = /^[0-9]+$/;
        return capacityRegex.test(capacity.toString());
    }


}