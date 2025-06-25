import { StudentFactory } from "../factories/student.factory";
import { Student } from "../models/student";
import { writeFile } from 'node:fs/promises';

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

    getByName(name: string): Promise<Student[]> {
        return this.studentFactory.getByName(name);
    }

    insert(name: string, email: string): Promise<Student[]> {
        return this.studentFactory.insert(name, email);
    }

    updateName(name: string, email: string): Promise<Student[]> {
        return this.studentFactory.updateName(name, email);
    }
    updateEmail(newEmail: string, email: string): Promise<Student[]> {
        return this.studentFactory, this.updateEmail(newEmail, email);
    }

    delete(email: string): Promise<Student[]> {
        return this.studentFactory.delete(email);
    }



}