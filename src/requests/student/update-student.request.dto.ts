import { InvalidRequest } from "../../exceptions/invalid-request.exception";

export interface UpdateStudentRequest {
    name?: string;
    newEmail?: string;
    email: string;
}

export class UpdateStudentRequest {
    name?: string;
    newEmail?: string;
    email: string;

    constructor(updateStudent: UpdateStudentRequest) {
        this.name = updateStudent.name;
        this.newEmail = updateStudent.newEmail;
        this.email = updateStudent.email;
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
        throw new InvalidRequest();

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