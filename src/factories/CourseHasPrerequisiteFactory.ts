import { CourseHasPrerequisite } from "../models/CourseHasPrerequisite";
import { DatabaseService } from "../services/DatabaseService";
// TODO: Introduce indexes in all tables


export class StudentFactory {
    private databaseService: DatabaseService;
    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }


    getByPrerequisiteId(prerequisiteId: number): Promise<CourseHasPrerequisite[]> {
        return this.databaseService.execute("SELECT * FROM CourseHasPrerequisite WHERE prerequisite_id = ?", [prerequisiteId])
            .then((courseHasPrerequisites) => (courseHasPrerequisites as CourseHasPrerequisite[]).map(courseHasPrerequisite => new CourseHasPrerequisite(courseHasPrerequisite)));
    }
    getByCourseId(courseId: number): Promise<CourseHasPrerequisite[]> {
        return this.databaseService.execute("SELECT * FROM CourseHasPrerequisite WHERE course_id = ?", [courseId])
            .then((courseHasPrerequisites) => (courseHasPrerequisites as CourseHasPrerequisite[]).map(courseHasPrerequisite => new CourseHasPrerequisite(courseHasPrerequisite)));
    }
    getByPrerequisiteIdAndCourseId(courseId: number, prerequisiteId: number) {
        return this.databaseService.execute("SELECT * FROM CourseHasPrerequisite WHERE course_id= ? AND prerequisite_id = ?", [courseId, prerequisiteId])
            .then((courseHasPrerequisites) => (courseHasPrerequisites as CourseHasPrerequisite[]).map(courseHasPrerequisite => new CourseHasPrerequisite(courseHasPrerequisite)));
    }

    getAll(): Promise<CourseHasPrerequisite[]> {
        return this.databaseService.execute("SELECT * FROM CourseHasPrerequisite")
            .then((courseHasPrerequisites) => (courseHasPrerequisites as CourseHasPrerequisite[]).map(courseHasPrerequisite => new CourseHasPrerequisite(courseHasPrerequisite)));
    }


    insert(courseId: number, prerequisiteId: number, state: string): Promise<CourseHasPrerequisite[]> {
        return this.databaseService.execute("INSERT INTO CourseHasPrerequisite course_id, prerequisite_id, state  VALUES (?,?,'?')", [courseId, prerequisiteId, state])
            .then((courseHasPrerequisites) => (courseHasPrerequisites as CourseHasPrerequisite[]).map(courseHasPrerequisite => new CourseHasPrerequisite(courseHasPrerequisite)));
    }

    updateState(state: string, courseId: number, prerequisiteId: number): Promise<CourseHasPrerequisite[]> {
        return this.databaseService.execute("UPDATE CourseHasPrerequisite SET state = ? WHERE course_id = ? AND prerequisite_id = ?", [state, courseId, prerequisiteId])
            .then((courseHasPrerequisites) => (courseHasPrerequisites as CourseHasPrerequisite[]).map(courseHasPrerequisite => new CourseHasPrerequisite(courseHasPrerequisite)));
    }
    updateCourseId(newCourseId: number, courseId: number, prerequisiteId: number): Promise<CourseHasPrerequisite[]> {
        return this.databaseService.execute("UPDATE CourseHasPrerequisite SET course_id = ? WHERE course_id = ? AND prerequisite_id = ?", [newCourseId, courseId, prerequisiteId])
            .then((courseHasPrerequisites) => (courseHasPrerequisites as CourseHasPrerequisite[]).map(courseHasPrerequisite => new CourseHasPrerequisite(courseHasPrerequisite)));
    }

    delete(courseId: number, prerequisiteId: number): Promise<CourseHasPrerequisite[]> {
        return this.databaseService.execute("DELETE FROM CourseHasPrerequisite WHERE course_id = ? AND prerequisite_id = ?", [courseId, prerequisiteId])
            .then((courseHasPrerequisites) => (courseHasPrerequisites as CourseHasPrerequisite[]).map(courseHasPrerequisite => new CourseHasPrerequisite(courseHasPrerequisite)));
    }


}