import { Professor } from "../models/professor";
import { DatabaseService } from "../services/database.service";

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
        return this.databaseService.execute("SELECT * FROM Professor WHERE email  = '?'", [email])
            .then((professors) => (professors as Professor[]).map(professor => new Professor(professor)));
    }

    getAll(): Promise<Professor[]> {
        return this.databaseService.execute("SELECT * FROM Professor")
            .then((professors) => (professors as Professor[]).map(professor => new Professor(professor)));
    }

    getByName(name: string): Promise<Professor[]> {
        return this.databaseService.execute("SELECT * FROM Professor WHERE name = '?'", [name])
            .then((professors) => (professors as Professor[]).map(professor => new Professor(professor)));
    }

    insert(name: string, email: string): Promise<Professor[]> {
        return this.databaseService.execute("INSERT INTO Professor name, email VALUES ('?','?')", [name, email])
            .then((professors) => (professors as Professor[]).map(professor => new Professor(professor)));
    }

    updateName(name: string, email: string): Promise<Professor[]> {
        return this.databaseService.execute("UPDATE Professor SET name = '?' WHERE email = '?'", [name, email])
            .then((professors) => (professors as Professor[]).map(professor => new Professor(professor)));
    }
    updateEmail(newEmail: string, email: string): Promise<Professor[]> {
        return this.databaseService.execute("UPDATE Professor SET email = '?' WHERE email = '?'", [newEmail, email])
            .then((professors) => (professors as Professor[]).map(professor => new Professor(professor)));
    }

    delete(email: string): Promise<Professor[]> {
        return this.databaseService.execute("DELETE FROM Professor WHERE email = '?'", [email])
        .then ((professors) => (professors as Professor[]).map(professor => new Professor(professor)));
    }


}