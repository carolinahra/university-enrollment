import { ResultSetHeader } from "mysql2";
import { Course } from "../models/course.js";
import { DatabaseService } from "../services/database.service.js";

// TODO: Introduce indexes in all tables
export class CourseFactory {
    private databaseService: DatabaseService;
    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }

    getById(id: number): Promise<Course[]> {
        return this.databaseService.execute("SELECT * FROM Course WHERE id = ?", [id])
            .then((courses) => (courses as Course[]).map(course => new Course(course)));
    }

    getByState(state: string): Promise<Course[]> {
        return this.databaseService.execute("SELECT * FROM Course WHERE state  = ?", [state])
            .then((courses) => (courses as Course[]).map(course => new Course(course)));
    }

    getAll(): Promise<Course[]> {
        return this.databaseService.execute("SELECT * FROM Course")
            .then((courses) => (courses as Course[]).map(course => new Course(course)));
    }

    get(limit: number, offset: number): Promise<Course[]> {
        return this.databaseService.execute("SELECT * FROM Course LIMIT = ? OFSET = ?", [limit, offset])
            .then((courses) => (courses as Course[]).map((course) => new Course(course)));
    }

    getByName(name: string): Promise<Course[]> {
        return this.databaseService.execute("SELECT * FROM Course WHERE name = ?", [name])
            .then((courses) => (courses as Course[]).map(course => new Course(course)));
    }

    getManyByName(names: string[]): Promise<Course[]> {
        const placeholders = names.map(() => '?').join(',');
        return this.databaseService.execute(`SELECT * FROM Course WHERE name IN (${placeholders})`, names)
            .then((courses) => (courses as Course[]).map(course => new Course(course)));
    }

    insert(name: string, capacity: number, state: string): Promise<Course[]> {
        return this.databaseService.execute("INSERT INTO Course (name, capacity, state) VALUES (?,?,?)", [name, capacity, state])
            .then((courses) => (courses as Course[]).map(course => new Course(course)));
    }

    updateName(newName: string, name: string): Promise<Course[]> {
        return this.databaseService.execute("UPDATE Courses SET name = ? WHERE name = ?", [newName, name])
            .then(() => this.getByName(name));
    }
    updateState(state: string, name: string): Promise<Course[]> {
        return this.databaseService.execute("UPDATE Courses SET state = ? WHERE name = ?", [state, name])
            .then(() => this.getByName(name));
    }
    updateCapacity(capacity: number, name: string): Promise<Course[]> {
        return this.databaseService.execute("UPDATE Courses SET capacity = ?", [capacity, name])
            .then(() => this.getByName(name));
    }

    delete(name: string): Promise<string> {
        return this.databaseService.execute("DELETE FROM Course WHERE name = ?", [name])
            .then(() => {
                const message = 'Course Deleted'
                return message;
            });
    }


}