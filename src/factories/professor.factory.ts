import { ResultSetHeader } from "mysql2";
import { Professor } from "../models/professor.js";
import { DatabaseService } from "../services/database.service.js";

// TODO: Introduce indexes in all tables
export class ProfessorFactory {
    private databaseService: DatabaseService;
    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }

    getById(id: number): Promise<Professor[]> {
        return this.databaseService.execute("SELECT * FROM Professor WHERE id = ?", [id])
            .then((professors) => (professors as Professor[]).map(professor => new Professor(professor)));
    }

    getByEmail(email: string): Promise<Professor[]> {
        return this.databaseService.execute("SELECT * FROM Professor WHERE email  = ?", [email])
            .then((professors) => (professors as Professor[]).map(professor => new Professor(professor)));
    }

    getAll(): Promise<Professor[]> {
        return this.databaseService.execute("SELECT * FROM Professor")
            .then((professors) => (professors as Professor[]).map(professor => new Professor(professor)));
    }

    get(limit: number, offset: number): Promise<Professor[]> {
        return this.databaseService.execute("SELECT * FROM Professor LIMIT = ? OFFSET = ?", [limit, offset])
            .then((professors) => (professors as Professor[]).map(professor => new Professor(professor)));
    }

    getByName(name: string): Promise<Professor[]> {
        return this.databaseService.execute("SELECT * FROM Professor WHERE name = ?", [name])
            .then((professors) => (professors as Professor[]).map(professor => new Professor(professor)));
    }

    insert(name: string, email: string): Promise<Professor[]> {
        return this.databaseService.execute("INSERT INTO Professor (name, email) VALUES (?,?)", [name, email])
            .then(() => this.getByEmail(email));
    }

    updateName(name: string, email: string): Promise<Professor[]> {
        return this.databaseService.execute("UPDATE Professor SET name = ? WHERE email = ?", [name, email])
            .then(() => this.getByEmail(email));
    }
    updateEmail(newEmail: string, email: string): Promise<Professor[]> {
        return this.databaseService.execute("UPDATE Professor SET email = '?' WHERE email = ?", [newEmail, email])
            .then(() => this.getByEmail(email));
    }

    delete(email: string): Promise<string> {
        return this.databaseService.execute("DELETE FROM Professor WHERE email = ?", [email])
            .then(() => {
                const message = 'Student deleted';
                return message;
            });
    }


}