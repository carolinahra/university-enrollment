import { InvalidRequestException } from "../../exceptions/invalid-request.exception.js";

export class DeletePrerequisiteRequest {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    public validate() {

        if (this.isValidName(this.name)) {
            return this.name;
        }

        throw new InvalidRequestException();
    }

    private isValidName(name: string): boolean {
        const nameRegex = /^[A-Za-z]{2,}$/;
        return nameRegex.test(name);

    }
}