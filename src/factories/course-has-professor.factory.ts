import { CourseHasProfessor } from "../models/course-has-professor";
import { DatabaseService } from "../services/database.service";
// TODO: Introduce indexes in all tables


export class CourseHasProfessorFactory {
    private databaseService: DatabaseService;
    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }


    getByProfessorId(professorId: number): Promise<CourseHasProfessor[]> {
        return this.databaseService.execute("SELECT * FROM CourseHasProfessor WHERE professor_id = ?", [professorId])
            .then((courseHasProfessors) => (courseHasProfessors as CourseHasProfessor[]).map(courseHasProfessor => new CourseHasProfessor(courseHasProfessor)));
    }
    getByCourseId(courseId: number): Promise<CourseHasProfessor[]> {
        return this.databaseService.execute("SELECT * FROM CourseHasProfessor WHERE course_id = ?", [courseId])
            .then((courseHasProfessors) => (courseHasProfessors as CourseHasProfessor[]).map(courseHasProfessor => new CourseHasProfessor(courseHasProfessor)));
    }
    getByProfessorIdAndCourseId(courseId: number, professorId: number) {
        return this.databaseService.execute("SELECT * FROM CourseHasProfessor WHERE course_id= ? AND professor_id = ?", [courseId, professorId])
            .then((courseHasProfessors) => (courseHasProfessors as CourseHasProfessor[]).map(courseHasProfessor => new CourseHasProfessor(courseHasProfessor)));
    }

    getAll(): Promise<CourseHasProfessor[]> {
        return this.databaseService.execute("SELECT * FROM CourseHasProfessor")
            .then((courseHasProfessors) => (courseHasProfessors as CourseHasProfessor[]).map(courseHasProfessor => new CourseHasProfessor(courseHasProfessor)));
    }


    insert(courseId: number, professorId: number, state: string): Promise<CourseHasProfessor[]> {
        return this.databaseService.execute("INSERT INTO CourseHasProfessor course_id, professor_id, state  VALUES (?,?,'?')", [courseId, professorId, state])
            .then((courseHasProfessors) => (courseHasProfessors as CourseHasProfessor[]).map(courseHasProfessor => new CourseHasProfessor(courseHasProfessor)));
    }

    updateState(state: string, courseId: number, professorId: number): Promise<CourseHasProfessor[]> {
        return this.databaseService.execute("UPDATE CourseHasProfessor SET state = ? WHERE course_id= ? AND professor_id = ?", [state, courseId, professorId])
            .then((courseHasProfessors) => (courseHasProfessors as CourseHasProfessor[]).map(courseHasProfessor => new CourseHasProfessor(courseHasProfessor)));
    }
    updateCourseId(newCourseId: number, courseId: number, professorId): Promise<CourseHasProfessor[]> {
        return this.databaseService.execute("UPDATE CourseHasProfessor SET course_id = ? WHERE course_id= ? AND professor_id = ?", [newCourseId, courseId, professorId])
            .then((courseHasProfessors) => (courseHasProfessors as CourseHasProfessor[]).map(courseHasProfessor => new CourseHasProfessor(courseHasProfessor)));
    }

    delete(courseId: number, professorId: number): Promise<CourseHasProfessor[]> {
        return this.databaseService.execute("DELETE FROM CourseHasProfessor WHERE course_id = ? AND professor_id = ?", [courseId, professorId])
            .then((courseHasProfessors) => (courseHasProfessors as CourseHasProfessor[]).map(courseHasProfessor => new CourseHasProfessor(courseHasProfessor)));
    }


}