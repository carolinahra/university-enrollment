export interface Professor {
    id?: number;
    name: string;
    email: string;
}

export class Professor {
    id?: number;
    name: string;
    email: string;

    constructor(professor: Professor) {
        this.id = professor.id;
        this.name = professor.name;
        this.email = professor.email;
    }

}