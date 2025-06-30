import { InvalidRequestException } from "../../exceptions/invalid-request.exception";

export class InsertProfessorRequest {
    name: string;
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
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