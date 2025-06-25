import { Grade } from "../models/grade";
import { DatabaseService } from "../services/database.service";
// TODO: Introduce indexes in all tables


export class GradeFactory {
    private databaseService: DatabaseService;
    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }

    getById(id: number): Promise<Grade[]> {
        return this.databaseService.execute("SELECT * FROM Grade WHERE id = ?", [id])
            .then((grades) => (grades as Grade[]).map(grade => new Grade(grade)));
    }
    getByStudentId(studentId: number): Promise<Grade[]> {
        return this.databaseService.execute("SELECT * FROM Grade WHERE student_id = ?", [studentId])
            .then((grades) => (grades as Grade[]).map(grade => new Grade(grade)));
    }
    getByCourseId(courseId: number): Promise<Grade[]> {
        return this.databaseService.execute("SELECT * FROM Grade WHERE course_id = ?", [courseId])
            .then((grades) => (grades as Grade[]).map(grade => new Grade(grade)));
    }
    getByStudentIdAndCourseId(studentId: number, courseId: number) {
        return this.databaseService.execute("SELECT * FROM Grade WHERE student_id= ? AND course_id = ?", [studentId, courseId])
            .then((grades) => (grades as Grade[]).map(grade => new Grade(grade)));
    }

    getAll(): Promise<Grade[]> {
        return this.databaseService.execute("SELECT * FROM Grade")
            .then((grades) => (grades as Grade[]).map(grade => new Grade(grade)));
    }

    getByGrade(grade: number): Promise<Grade[]> {
        return this.databaseService.execute("SELECT * FROM Grade WHERE grade = '?'", [grade])
            .then((grades) => (grades as Grade[]).map(grade => new Grade(grade)));
    }

    getBySemester(semester: number): Promise<Grade[]> {
        return this.databaseService.execute("SELECT * FROM Grade WHERE semester = '?'", [semester])
            .then((grades) => (grades as Grade[]).map(grade => new Grade(grade)));
    }

    insert(studentId: number, courseId: number, grade: number, semester: number): Promise<Grade[]> {
        return this.databaseService.execute("INSERT INTO Grade student_id, course_id, grade VALUES (?,?,?,?)", [studentId, courseId, grade, semester])
            .then((grades) => (grades as Grade[]).map(grade => new Grade(grade)));
    }

    updateGrade(grade: number, studentId: number, courseId: number): Promise<Grade[]> {
        return this.databaseService.execute("UPDATE Grade SET grade = ? WHERE student_id= ? AND course_id = ?", [grade, studentId, courseId])
            .then((grades) => (grades as Grade[]).map(grade => new Grade(grade)));
    }
    updateSemester(semester: number, studentId: number, courseId: number): Promise<Grade[]> {
        return this.databaseService.execute("UPDATE Grade SET semester = ? WHERE student_id= ? AND course_id = ?", [semester, studentId, courseId])
            .then((grades) => (grades as Grade[]).map(grade => new Grade(grade)));
    }

    delete(studentId: number, courseId: number): Promise<Grade[]> {
        return this.databaseService.execute("DELETE FROM Grade WHERE email = '?'", [studentId, courseId])
            .then((grades) => (grades as Grade[]).map(grade => new Grade(grade)));
    }


}