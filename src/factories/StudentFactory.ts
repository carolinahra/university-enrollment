import { Student } from "../models/Student";
import { DatabaseService } from "../services/DatabaseService";

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
        return this.databaseService.execute("SELECT * FROM Student WHERE email  = '?'", [email])
            .then((students) => (students as Student[]).map(student => new Student(student)));
    }

    getAll(): Promise<Student[]> {
        return this.databaseService.execute("SELECT * FROM Student")
            .then((students) => (students as Student[]).map(student => new Student(student)));
    }

    getByName(name: string): Promise<Student[]> {
        return this.databaseService.execute("SELECT * FROM Student WHERE name = '?'", [name])
            .then((students) => (students as Student[]).map(student => new Student(student)));
    }

    insert(name: string, email: string): Promise<Student[]> {
        return this.databaseService.execute("INSERT INTO Student name, email VALUES ('?','?')", [name, email])
            .then((students) => (students as Student[]).map(student => new Student(student)));
    }

    updateName(name: string, email: string): Promise<Student[]> {
        return this.databaseService.execute("UPDATE Students SET name = '?' WHERE email = '?'", [name, email])
            .then((students) => (students as Student[]).map(student => new Student(student)));
    }
    updateEmail(newEmail: string, email: string): Promise<Student[]> {
        return this.databaseService.execute("UPDATE Students SET email = '?' WHERE email = '?'", [newEmail, email]) // binding paramaters
            .then((students) => (students as Student[]).map(student => new Student(student)));
    }

    delete(email: string): Promise<Student[]> {
        return this.databaseService.execute("DELETE FROM Student WHERE email = '?'", [email])
        .then ((students) => (students as Student[]).map(student => new Student(student)));
    }


}