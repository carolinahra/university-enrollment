import { Course } from "../models/course";
import { CourseFactory } from "../factories/course.factory";

// TODO: Introduce indexes in all tables
export class CourseService {
    private courseFactory: CourseFactory;
    constructor(courseFactory: CourseFactory) {
        this.courseFactory = courseFactory;
    }

    getById(id: number): Promise<Course[]> {
        return this.courseFactory.getById(id);
    }

    getByState(state: string): Promise<Course[]> {
        return this.courseFactory.getByState(state);
    }

    getAll(): Promise<Course[]> {
        return this.courseFactory.getAll();
    }

    getByName(name: string): Promise<Course[]> {
        return this.courseFactory.getByName(name);
    }

    insert(name: string, capacity: number, state: string): Promise<Course[]> {
        return this.courseFactory.insert(name, capacity, state);
    }

    updateName(newName: string, name: string): Promise<Course[]> {
        return this.courseFactory.updateName(newName, name);
    }
    updateState(state: string, name: string): Promise<Course[]> {
        return this.courseFactory.updateState(state, name);
    }
    updateCapacity(capacity: number, name: string): Promise<Course[]> {
        return this.courseFactory.updateCapacity(capacity, name);
    }

    delete(name: string): Promise<Course[]> {
        return this.courseFactory.delete(name);
    }


}