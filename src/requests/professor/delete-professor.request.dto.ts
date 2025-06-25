import { InvalidRequest } from "../../exceptions/invalid-request.exception";

export class DeleteProfessorRequest {
    email: string;
    constructor(email: string) {
        this.email = email;
    }
    public validate() {
        if (this.isValidEmail(this.email)) {
            return this.email;
        }
        throw new InvalidRequest();
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        return emailRegex.test(email);
    }
}