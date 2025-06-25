export interface Student {
    id?: number;
    name: string;
    email: string;
}

export class Student {
    id?: number;
    name: string;
    email: string;

    constructor(student: Student) {
        this.id = student.id;
        this.name = student.name;
        this.email = student.email;
    }

}
