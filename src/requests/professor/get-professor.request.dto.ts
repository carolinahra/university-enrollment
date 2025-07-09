import { InvalidRequestException } from "../../exceptions/invalid-request.exception.js";

export class GetProfessorRequest {
    name?: string;
    email?: string;
    limit?: number;
    offset?: number;

    constructor(name?: string, email?: string, limit?: number, offset?: number) {
        this.name = name;
        this.email = email;
        this.limit = limit;
        this.offset = offset;
    }

    public validate() {
        if (this.isValidEmail(this.email)) {
            return this.email;
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
    private isValidEmail(email: string): boolean {
        const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        return emailRegex.test(email);
    }
}