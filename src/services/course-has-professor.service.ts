import { CourseHasProfessor } from "../models/course-has-professor.js";
import { CourseHasProfessorFactory } from "../factories/course-has-professor.factory.js";
// TODO: Introduce indexes in all tables


export class CourseHasProfessorService {
    private courseHasProfessorFactory: CourseHasProfessorFactory;
    constructor(courseHasProfessorFactory: CourseHasProfessorFactory) {
        this.courseHasProfessorFactory = courseHasProfessorFactory;
    }


    getByProfessorId(professorId: number): Promise<CourseHasProfessor[]> {
        return this.courseHasProfessorFactory.getByProfessorId(professorId);
    }
    getByCourseId(courseId: number): Promise<CourseHasProfessor[]> {
        return this.courseHasProfessorFactory.getByCourseId(courseId);
    }
    getByProfessorIdAndCourseId(courseId: number, professorId: number) {
        return this.courseHasProfessorFactory.getByProfessorIdAndCourseId(professorId, courseId);
    }

    getAll(): Promise<CourseHasProfessor[]> {
        return this.courseHasProfessorFactory.getAll();
    }

    get(limit: number, offset: number): Promise<CourseHasProfessor[]> {
        return this.courseHasProfessorFactory.get(limit, offset);
    }

    insert(courseId: number, professorId: number, state: string): Promise<CourseHasProfessor[]> {
        return this.courseHasProfessorFactory.insert(courseId, professorId, state);
    }

    updateState(state: string, courseId: number, professorId: number): Promise<CourseHasProfessor[]> {
        return this.courseHasProfessorFactory.updateState(state, courseId, professorId);
    }
    updateCourseId(newCourseId: number, courseId: number, professorId): Promise<CourseHasProfessor[]> {
        return this.courseHasProfessorFactory.updateCourseId(newCourseId, courseId, professorId);
    }

    delete(courseId: number, professorId: number): Promise<string> {
        return this.courseHasProfessorFactory.delete(courseId, professorId);
    }


}