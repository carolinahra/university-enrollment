import { InvalidRequestException } from "../../exceptions/invalid-request.exception.js";

export interface UpdateProfessorRequest {
    name?: string;
    newEmail?: string;
    email: string;
}

export class UpdateProfessorRequest {
    name?: string;
    newEmail?: string;
    email: string;

    constructor(updateProfessor: UpdateProfessorRequest) {
        this.name = updateProfessor.name;
        this.newEmail = updateProfessor.newEmail;
        this.email = updateProfessor.email;
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