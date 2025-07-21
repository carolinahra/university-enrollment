import { StudentFactory } from "../factories/student.factory.js";
import { Student } from "../models/student.js";

export class StudentService {
    private studentFactory: StudentFactory;
    constructor(studentFactory: StudentFactory) {
        this.studentFactory = studentFactory;
    }
    // async / await 
    // async = return new Promise()

    // await = wait until promise is resolved
    // === .then
    getById(id: number): Promise<Array<Student>> { // Student[] | Array<Student>
        return this.studentFactory.getById(id);
    }
    getByEmail(email: string): Promise<Student[]> {
        return this.studentFactory.getByEmail(email);
    }
    getAll(): Promise<Student[]> {
        return this.studentFactory.getAll();
    }

    get(limit: number, offset: number): Promise<Student[]> {
        return this.studentFactory.get(limit, offset);
    }

    getByName(name: string): Promise<Student[]> {
        return this.studentFactory.getByName(name);
    }

    getManyByEmail(emails: string[]): Promise<Student[]> {
        return this.studentFactory.getManyByEmail(emails);
    }

    insert(name: string, email: string): Promise<Student[]> {
        return this.studentFactory.insert(name, email);
    }

    updateName(name: string, email: string): Promise<Student[]> {
        return this.studentFactory.updateName(name, email);
    }
    updateEmail(newEmail: string, email: string): Promise<Student[]> {
        return this.studentFactory.updateEmail(newEmail, email);
    }

    delete(email: string): Promise<string> {
        return this.studentFactory.delete(email);
    }



}