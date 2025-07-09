import { Grade } from "../models/grade.js";
import { GradeFactory } from "../factories/grade.factory.js";
// TODO: Introduce indexes in all tables


export class GradeService {
    private gradeFactory: GradeFactory;
    constructor(gradeFactory: GradeFactory) {
        this.gradeFactory = gradeFactory;
    }

    getById(id: number): Promise<Grade[]> {
        return this.gradeFactory.getById(id);
    }
    getByStudentId(studentId: number): Promise<Grade[]> {
        return this.gradeFactory.getByStudentId(studentId);
    }
    getByCourseId(courseId: number): Promise<Grade[]> {
        return this.gradeFactory.getByCourseId(courseId);
    }
    getByStudentIdAndCourseId(studentId: number, courseId: number) {
        return this.gradeFactory.getByStudentIdAndCourseId(studentId, courseId);
    }

    getAll(): Promise<Grade[]> {
        return this.gradeFactory.getAll();
    }

    get(limit: number, offset: number): Promise<Grade[]> {
        return this.gradeFactory.get(limit, offset);
    }

    getByGrade(grade: number): Promise<Grade[]> {
        return this.gradeFactory.getByGrade(grade);
    }

    getBySemester(semester: number): Promise<Grade[]> {
        return this.gradeFactory.getBySemester(semester);
    }

    insert(studentId: number, courseId: number, grade: number, semester: number): Promise<Grade[]> {
        return this.gradeFactory.insert(studentId, courseId, grade, semester);
    }

    updateGrade(grade: number, studentId: number, courseId: number): Promise<Grade[]> {
        return this.gradeFactory.updateGrade(grade, studentId, courseId);
    }
    updateSemester(semester: number, studentId: number, courseId: number): Promise<Grade[]> {
        return this.gradeFactory.updateSemester(semester, studentId, courseId);
    }

    delete(studentId: number, courseId: number): Promise<string> {
        return this.gradeFactory.delete(studentId, courseId);
    }


}