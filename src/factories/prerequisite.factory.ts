import { ResultSetHeader } from "mysql2";
import { Prerequisite } from "../models/prerequisite.js";
import { DatabaseService } from "../services/database.service.js";

export class PrerequisiteFactory {
    private databaseService: DatabaseService;
    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }

    getById(id: number): Promise<Prerequisite[]> {
        return this.databaseService.execute("SELECT * FROM Prerequisite WHERE id = ?", [id])
            .then((prerequisites) => (prerequisites as Prerequisite[]).map(prerequisite => new Prerequisite(prerequisite)));
    }

    getByState(state: string): Promise<Prerequisite[]> {
        return this.databaseService.execute("SELECT * FROM Prerequisite WHERE state  = ?", [state])
            .then((prerequisites) => (prerequisites as Prerequisite[]).map(prerequisite => new Prerequisite(prerequisite)));
    }

    getAll(): Promise<Prerequisite[]> {
        return this.databaseService.execute("SELECT * FROM Prerequisite")
            .then((prerequisites) => (prerequisites as Prerequisite[]).map(prerequisite => new Prerequisite(prerequisite)));
    }

    get(limit: number, offset: number): Promise<Prerequisite[]> {
        return this.databaseService.execute("SELECT * FROM Prerequisite LIMIT = ? OFFSET = ?", [limit, offset])
        .then((prerequisites) => (prerequisites as Prerequisite[]).map((prerequisite) => new Prerequisite(prerequisite)));
    }

    getByName(name: string): Promise<Prerequisite[]> {
        return this.databaseService.execute("SELECT * FROM Prerequisite WHERE name = ?", [name])
            .then((prerequisites) => (prerequisites as Prerequisite[]).map(prerequisite => new Prerequisite(prerequisite)));
    }

    insert(name: string, description: string, state: string): Promise<Prerequisite[]> {
        return this.databaseService.execute("INSERT INTO Prerequisite (name, description, state) VALUES ?,?,?)", [name, description, state])
            .then(() => this.getByName(name));
    }

    updateName(newName: string, name: string): Promise<Prerequisite[]> {
        return this.databaseService.execute("UPDATE Prerequisites SET name = ? WHERE name = ?", [newName, name])
            .then(() => this.getByName(name));
    }
    updateState(state: string, name: string): Promise<Prerequisite[]> {
        return this.databaseService.execute("UPDATE Prerequisites SET state = ? WHERE name = ?", [state, name])
            .then(() => this.getByName(name));
    }
    updateDescription(description: string, name: string): Promise<Prerequisite[]> {
        return this.databaseService.execute("UPDATE Prerequisites SET description = ? WHERE name = ?", [description, name])
            .then(() => this.getByName(name));
    }

    delete(name: string): Promise<string> {
        return this.databaseService.execute("DELETE FROM Prerequisite WHERE name = ?", [name])
            .then(() => {
                const message = 'Prerequisite Deleted';
            return message;
            });
    }


}