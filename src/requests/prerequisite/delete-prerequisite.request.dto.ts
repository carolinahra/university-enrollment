import { InvalidRequest } from "../../exceptions/invalid-request.exception";

export class DeletePrerequisiteRequest {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    public validate() {

        if (this.isValidName(this.name)) {
            return this.name;
        }

        throw new InvalidRequest();
    }

    private isValidName(name: string): boolean {
        const nameRegex = /^[A-Za-z]{2,}$/;
        return nameRegex.test(name);

    }
}