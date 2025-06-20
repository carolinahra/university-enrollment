import { ProfessorFactory } from "../factories/ProfessorFactory";
import { Professor } from "../models/Professor";

export class ProfessorService {
    private professorFactory: ProfessorFactory;
    constructor(professorFactory: ProfessorFactory) {
        this.professorFactory = professorFactory;
    }
    getById(id: number): Promise<Array<Professor>> {
        return this.professorFactory.getById(id);
    }
    getByEmail(email: string): Promise<Professor[]> {
        return this.professorFactory.getByEmail(email);
    }
    getAll(): Promise<Professor[]> {
        return this.professorFactory.getAll();
    }

    getByName(name: string): Promise<Professor[]> {
        return this.professorFactory.getByName(name);
    }

    insert(name: string, email: string): Promise<Professor[]> {
        return this.professorFactory.insert(name, email);
    }

    updateName(name: string, email: string): Promise<Professor[]> {
        return this.professorFactory.updateName(name, email);
    }
    updateEmail(newEmail: string, email: string): Promise<Professor[]> {
        return this.professorFactory, this.updateEmail(newEmail, email);
    }

    delete(email: string): Promise<Professor[]> {
        return this.professorFactory.delete(email);
    }



}