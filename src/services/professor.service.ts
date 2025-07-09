import { ProfessorFactory } from "../factories/professor.factory.js";
import { Professor } from "../models/professor.js";

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

    get(limit: number, offset: number): Promise<Professor[]> {
        return this.professorFactory.get(limit, offset);
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

    delete(email: string): Promise<string> {
        return this.professorFactory.delete(email);
    }



}