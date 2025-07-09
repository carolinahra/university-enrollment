import { InvalidRequestException } from "../../exceptions/invalid-request.exception.js";

export class UpdateStudentRequest {
    email: string;
    name?: string;
    newEmail?: string;

    constructor(email: string, name?: string, newEmail?: string) {
        this.name = name;
        this.newEmail = newEmail;
        this.email = email;
    }

    public validate() {
        if (this.isValidEmail(this.email)) {
            return this.email;
        }
        if (this.isValidEmail(this.newEmail)) {
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