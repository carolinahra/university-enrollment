import { InvalidRequestException } from "../../exceptions/invalid-request.exception.js";

export class GetPrerequisiteRequest {
    name: string;
    newName?: string;
    description?: string;
    state?: string;

    constructor(name: string, newName?: string, description?: string, state?: string) {
        this.name = name;
        this.newName = newName;
        this.description = description;
        this.state = state;
    }

    public validate() {
        if (this.isValidState(this.state)) {
            return this.state;
        }
        if (this.isValidName(this.name)) {
            return this.name;
        }
        if (this.isValidName(this.newName)) {
            return this.newName;
        }
        if (this.isValidDescription(this.description)) {
            return this.description;
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

    private isValidDescription(description: string): boolean {
        const descriptionRegex = /^[A-Za-z.,]{2,}$/;
        return descriptionRegex.test(description);
    }

}
