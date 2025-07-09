import { StudentHasCourse } from "../models/student-has-course.js";
import { StudentHasCourseFactory } from "../factories/student-has-course.factory.js";
import { PoolConnection } from "mysql2/promise";
// TODO: Introduce indexes in all tables


export class StudentHasCourseService {
    private studentHasCourseFactory: StudentHasCourseFactory;
    constructor(studentHasCourseFactory: StudentHasCourseFactory) {
        this.studentHasCourseFactory = studentHasCourseFactory;
    }

    getByStudentId(studentId: number): Promise<StudentHasCourse[]> {
        return this.studentHasCourseFactory.getByStudentId(studentId);
    }
    getByCourseId(courseId: number): Promise<StudentHasCourse[]> {
        return this.studentHasCourseFactory.getByCourseId(courseId);
    }
    getByStudentIdAndCourseId(studentId: number, courseId: number) {
        return this.studentHasCourseFactory.getByStudentIdAndCourseId(studentId, courseId);
    }

    getAll(): Promise<StudentHasCourse[]> {
        return this.studentHasCourseFactory.getAll();
    }
    get(limit: number, offset: number): Promise<StudentHasCourse[]> {
        return this.studentHasCourseFactory.get(limit, offset);
    }

    insert(studentId: number, courseId: number, state: string, connection?: PoolConnection): Promise<StudentHasCourse[]> {
        return this.studentHasCourseFactory.insert(studentId, courseId, state, connection);
    }

    updateStudentId(studentId: number, courseId: number, newStudentId: number): Promise<StudentHasCourse[]> {
        return this.studentHasCourseFactory.updateStudentId(studentId, courseId, newStudentId);
    }
    updateCourseId(newCourseId: number, studentId: number, courseId: number): Promise<StudentHasCourse[]> {
        return this.studentHasCourseFactory.updateCourseId(newCourseId, studentId, courseId);
    }
    updateState(state: string, studentId: number, courseId: number): Promise<StudentHasCourse[]> {
        return this.studentHasCourseFactory.updateState(state, studentId, courseId);
    }

    delete(studentId: number, courseId: number): Promise<string> {
        return this.studentHasCourseFactory.delete(studentId, courseId);
    }


}