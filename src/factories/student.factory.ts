import { ResultSetHeader } from "mysql2";
import { Student } from "../models/student.js";
import { DatabaseService } from "../services/database.service.js";

// TODO: Introduce indexes in all tables
export class StudentFactory {
    private databaseService: DatabaseService;
    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }

    getById(id: number): Promise<Student[]> {
        return this.databaseService.execute("SELECT * FROM Student WHERE id = ?", [id])
            .then((students) => (students as Student[]).map(student => new Student(student)));
    }

    getByEmail(email: string): Promise<Student[]> {
        return this.databaseService.execute("SELECT * FROM Student WHERE email  = ?", [email])
            .then((students) => (students as Student[]).map(student => new Student(student)));
    }

    getAll(): Promise<Student[]> {
        return this.databaseService.execute("SELECT * FROM Student")
            .then((students) => (students as Student[]).map(student => new Student(student)));
    }

    get(limit: number, offset: number): Promise<Student[]> {
        return this.databaseService.execute("SELECT * FROM Student LIMIT ? OFFSET ?;", [limit, offset])
            .then((students) => (students as Student[]).map(student => new Student(student)));
    }

    getByName(name: string): Promise<Student[]> {
        return this.databaseService.execute("SELECT * FROM Student WHERE name = ?", [name])
            .then((students) => (students as Student[]).map(student => new Student(student)));
    }


    getManyByEmail(emails: string[]): Promise<Student[]> {
        const placeholders = emails.map(() => '?').join(',');
        return this.databaseService.execute(`SELECT * FROM Student WHERE email IN (${placeholders})`, emails)
            .then((students) => (students as Student[]).map(student => new Student(student)));
    }


    insert(name: string, email: string): Promise<Student[]> {
        return this.databaseService.execute("INSERT IGNORE INTO Student (name, email) VALUES (?,?)", [name, email])
            .then(() => this.getByEmail(email));

    }

    updateName(name: string, email: string): Promise<Student[]> {
        return this.databaseService.execute("UPDATE Student SET name = ? WHERE email = ?", [name, email])
            .then(() => this.getByEmail(email));
    }
    updateEmail(newEmail: string, email: string): Promise<Student[]> {
        return this.databaseService.execute("UPDATE Student SET email = ? WHERE email = ?", [newEmail, email])
            .then(() => this.getByEmail(email));
    }

    delete(email: string): Promise<string> {
        return this.databaseService.execute("DELETE FROM Student WHERE email = ?", [email])
            .then(() => {
                const message = 'Student deleted'
                return message;
            });
    }


}