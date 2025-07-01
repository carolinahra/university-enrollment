import { ResultSetHeader } from "mysql2";
import { Prerequisite } from "../models/prerequisite";
import { DatabaseService } from "../services/database.service";

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

    getByName(name: string): Promise<Prerequisite[]> {
        return this.databaseService.execute("SELECT * FROM Prerequisite WHERE name = ?", [name])
            .then((prerequisites) => (prerequisites as Prerequisite[]).map(prerequisite => new Prerequisite(prerequisite)));
    }

    insert(name: string, description: string, state: string): Promise<Prerequisite[]> {
        return this.databaseService.execute("INSERT INTO Prerequisite (name, description, state) VALUES ?,?,?)", [name, description, state])
            .then((result: ResultSetHeader) => this.getById(result.insertId));
    }

    updateName(newName: string, name: string): Promise<Prerequisite[]> {
        return this.databaseService.execute("UPDATE Prerequisites SET name = ? WHERE name = ?", [newName, name])
            .then((result: ResultSetHeader) => this.getById(result.insertId));
    }
    updateState(state: string, name: string): Promise<Prerequisite[]> {
        return this.databaseService.execute("UPDATE Prerequisites SET state = ? WHERE name = ?", [state, name])
            .then((result: ResultSetHeader) => this.getById(result.insertId));
    }
    updateDescription(description: string, name: string): Promise<Prerequisite[]> {
        return this.databaseService.execute("UPDATE Prerequisites SET description = ? WHERE name = ?", [description, name])
            .then((result: ResultSetHeader) => this.getById(result.insertId));
    }

    delete(name: string): Promise<string> {
        return this.databaseService.execute("DELETE FROM Prerequisite WHERE name = ?", [name])
            .then((message) => message = 'Prerequisite Deleted' )
    }


}