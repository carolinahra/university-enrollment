import { InvalidRequestException } from "../../exceptions/invalid-request.exception.js";

export class GetStudentRequest {
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
        let valid: string[];

        if (this.isValidEmail(this.email)) {
             valid.push(this.email);
        }
        if (this.isValidName(this.name)) {
            valid.push(this.name);
        }
       if (valid.length = 0) {
        throw new InvalidRequestException();
       }
       return valid;
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