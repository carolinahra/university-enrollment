import { ResultSetHeader } from "mysql2";
import { Course } from "../models/course";
import { DatabaseService } from "../services/database.service";

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

    getByName(name: string): Promise<Course[]> {
        return this.databaseService.execute("SELECT * FROM Course WHERE name = ?", [name])
            .then((courses) => (courses as Course[]).map(course => new Course(course)));
    }

    insert(name: string, capacity: number, state: string): Promise<Course[]> {
        return this.databaseService.execute("INSERT INTO Course (name, capacity, state) VALUES (?,?,?)", [name, capacity, state])
            .then((courses) => (courses as Course[]).map(course => new Course(course)));
    }

    updateName(newName: string, name: string): Promise<Course[]> {
        return this.databaseService.execute("UPDATE Courses SET name = ? WHERE name = ?", [newName, name])
            .then((result: ResultSetHeader) => this.getById(result.insertId));;
    }
    updateState(state: string, name: string): Promise<Course[]> {
        return this.databaseService.execute("UPDATE Courses SET state = ? WHERE name = ?", [state, name])
            .then((result: ResultSetHeader) => this.getById(result.insertId));;
    }
    updateCapacity(capacity: number, name: string): Promise<Course[]> {
        return this.databaseService.execute("UPDATE Courses SET capacity = ?", [capacity, name])
            .then((result: ResultSetHeader) => this.getById(result.insertId));;
    }

    delete(name: string): Promise<string> {
        return this.databaseService.execute("DELETE FROM Course WHERE name = ?", [name])
            .then((message) => message = 'Course Deleted');
    }


}