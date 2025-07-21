import { CourseHasProfessor } from "../models/course-has-professor.js";
import { DatabaseService } from "../services/database.service.js";
// TODO: Introduce indexes in all tables


export class CourseHasProfessorFactory {
    private databaseService: DatabaseService;
    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }


    getByProfessorId(professorId: number): Promise<CourseHasProfessor[]> {
        return this.databaseService.execute("SELECT * FROM CourseHasProfessor WHERE professor_id = ?", [professorId])
            .then((courseHasProfessors) => (courseHasProfessors as CourseHasProfessor[])
                .map(courseHasProfessor => new CourseHasProfessor(courseHasProfessor)));
    }
    getByCourseId(courseId: number): Promise<CourseHasProfessor[]> {
        return this.databaseService.execute("SELECT * FROM Course_has_Professor WHERE course_id = ?", [courseId])
            .then((courseHasProfessors) => (courseHasProfessors as CourseHasProfessor[]).map(courseHasProfessor => new CourseHasProfessor(courseHasProfessor)));
    }
    getByProfessorIdAndCourseId(courseId: number, professorId: number) {
        return this.databaseService.execute("SELECT * FROM Course_has_Professor WHERE course_id= ? AND professor_id = ?", [courseId, professorId])
            .then((courseHasProfessors) => (courseHasProfessors as CourseHasProfessor[]).map(courseHasProfessor => new CourseHasProfessor(courseHasProfessor)));
    }

    getAll(): Promise<CourseHasProfessor[]> {
        return this.databaseService.execute("SELECT * FROM Course_has_Professor")
            .then((courseHasProfessors) => (courseHasProfessors as CourseHasProfessor[]).map(courseHasProfessor => new CourseHasProfessor(courseHasProfessor)));
    }

    get(limit: number, offset: number): Promise<CourseHasProfessor[]> {
        return this.databaseService.execute("SELECT * FROM Course_has_Professor")
            .then((courseHasProfesors) => (courseHasProfesors as CourseHasProfessor[]).map(courseHasProfesor => new CourseHasProfessor(courseHasProfesor)));
    }

    insert(courseId: number, professorId: number, state: string): Promise<CourseHasProfessor[]> {
        return this.databaseService.execute("INSERT IGNORE INTO Course_has_Professor (course_id, professor_id, state)  VALUES (?,?,?)", [courseId, professorId, state])
            .then(() => this.getByProfessorIdAndCourseId(professorId, courseId));
    }

    updateState(state: string, courseId: number, professorId: number): Promise<CourseHasProfessor[]> {
        return this.databaseService.execute("UPDATE Course_has_Professor SET state = ? WHERE course_id= ? AND professor_id = ?", [state, courseId, professorId])
            .then(() => this.getByProfessorIdAndCourseId(professorId, courseId));
    }
    updateCourseId(newCourseId: number, courseId: number, professorId): Promise<CourseHasProfessor[]> {
        return this.databaseService.execute("UPDATE Course_has_Professor SET course_id = ? WHERE course_id= ? AND professor_id = ?", [newCourseId, courseId, professorId])
            .then(() => this.getByProfessorIdAndCourseId(professorId, courseId));
    }

    delete(courseId: number, professorId: number): Promise<string> {
        return this.databaseService.execute("DELETE FROM Course_has_Professor WHERE course_id = ? AND professor_id = ?", [courseId, professorId])
            .then(() => {
                const message = 'Course has Professor deleted'
                return message;
            });
    }


}