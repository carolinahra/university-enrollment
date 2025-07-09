import { CourseHasPrerequisite } from "../models/course-has-prerequisite.js";
import { DatabaseService } from "../services/database.service.js";
// TODO: Introduce indexes in all tables


export class CourseHasPrerequisiteFactory {
    private databaseService: DatabaseService;
    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }


    getByPrerequisiteId(prerequisiteId: number): Promise<CourseHasPrerequisite[]> {
        return this.databaseService.execute("SELECT * FROM Course_has_Prerequisite WHERE prerequisite_id = ?", [prerequisiteId])
            .then((courseHasPrerequisites) => (courseHasPrerequisites as CourseHasPrerequisite[]).map(courseHasPrerequisite => new CourseHasPrerequisite(courseHasPrerequisite)));
    }
    getByCourseId(courseId: number): Promise<CourseHasPrerequisite[]> {
        return this.databaseService.execute("SELECT * FROM Course_has_Prerequisite WHERE course_id = ?", [courseId])
            .then((courseHasPrerequisites) => (courseHasPrerequisites as CourseHasPrerequisite[]).map(courseHasPrerequisite => new CourseHasPrerequisite(courseHasPrerequisite)));
    }
    getByPrerequisiteIdAndCourseId(courseId: number, prerequisiteId: number) {
        return this.databaseService.execute("SELECT * FROM Course_has_Prerequisite WHERE course_id= ? AND prerequisite_id = ?", [courseId, prerequisiteId])
            .then((courseHasPrerequisites) => (courseHasPrerequisites as CourseHasPrerequisite[]).map(courseHasPrerequisite => new CourseHasPrerequisite(courseHasPrerequisite)));
    }

    getAll(): Promise<CourseHasPrerequisite[]> {
        return this.databaseService.execute("SELECT * FROM Course_has_Prerequisite")
            .then((courseHasPrerequisites) => (courseHasPrerequisites as CourseHasPrerequisite[]).map(courseHasPrerequisite => new CourseHasPrerequisite(courseHasPrerequisite)));
    }

    get(limit: number, offset: number): Promise<CourseHasPrerequisite[]> {
        return this.databaseService.execute("SELECT * FROM Course_has_Prerequisite LIMIT = ? OFFSET = ?", [limit, offset])
            .then((courseHasPrerequisites) => (courseHasPrerequisites as CourseHasPrerequisite[]).map(courseHasPrerequisite => new CourseHasPrerequisite(courseHasPrerequisite)));
    }

    insert(courseId: number, prerequisiteId: number, state: string): Promise<CourseHasPrerequisite[]> {
        return this.databaseService.execute("INSERT INTO Course_has_Prerequisite (course_id, prerequisite_id, state)  VALUES (?,?,?)", [courseId, prerequisiteId, state])
            .then(() => this.getByPrerequisiteIdAndCourseId(prerequisiteId, courseId));
    }

    updateState(state: string, courseId: number, prerequisiteId: number): Promise<CourseHasPrerequisite[]> {
        return this.databaseService.execute("UPDATE Course_has_Prerequisite SET state = ? WHERE course_id = ? AND prerequisite_id = ?", [state, courseId, prerequisiteId])
            .then(() => this.getByPrerequisiteIdAndCourseId(prerequisiteId, courseId));
    }
    updateCourseId(newCourseId: number, courseId: number, prerequisiteId: number): Promise<CourseHasPrerequisite[]> {
        return this.databaseService.execute("UPDATE Course_has_Prerequisite SET course_id = ? WHERE course_id = ? AND prerequisite_id = ?", [newCourseId, courseId, prerequisiteId])
            .then(() => this.getByPrerequisiteIdAndCourseId(prerequisiteId, courseId));
    }

    delete(courseId: number, prerequisiteId: number): Promise<string> {
        return this.databaseService.execute("DELETE FROM Course_has_Prerequisite WHERE course_id = ? AND prerequisite_id = ?", [courseId, prerequisiteId])
            .then(() => {
                const message = 'Course has Prerequisite deleted'
                return message;
            });
    }


}