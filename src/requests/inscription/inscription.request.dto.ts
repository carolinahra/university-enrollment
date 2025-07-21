
export class InscriptionRequest {
    emails?: string[];
    names?: string[];
    email?: string;
    name?: string;

    constructor(emails?: string[], names?: string[], email?: string, name?: string) {
        this.emails = emails;
        this.names = names;
        this.email = email;
        this.name = name;
    }
}