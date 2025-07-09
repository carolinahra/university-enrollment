import { InvalidRequestException } from "../../exceptions/invalid-request.exception.js";

export class GetPrerequisiteRequest {
    id?: number;
    name?: string;
    state?: string;
    limit?: number;
    offset?: number;

    constructor(id?: number, name?: string, state?: string, limit?: number, offset?: number) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.limit = limit;
        this.offset = offset;
    }

    public validate() {
        if (this.isValidId(this.id)) {
            return this.id;
        }
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
    private isValidId(id: number) {
        const idRegex = /^[0-9]+$/;
        return idRegex.test(id.toString());
    }
}