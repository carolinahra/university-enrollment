import { StudentHasCourse } from "../models/student-has-course";
import { DatabaseService } from "../services/database.service";
// TODO: Introduce indexes in all tables


export class StudentHasCourseFactory {
    private databaseService: DatabaseService;
    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }

    getByStudentId(studentId: number): Promise<StudentHasCourse[]> {
        return this.databaseService.execute("SELECT * FROM StudentHasCourse WHERE student_id = ?", [studentId])
            .then((studentHasCourses) => (studentHasCourses as StudentHasCourse[]).map(studentHasCourse => new StudentHasCourse(studentHasCourse)));
    }
    getByCourseId(courseId: number): Promise<StudentHasCourse[]> {
        return this.databaseService.execute("SELECT * FROM StudentHasCourse WHERE course_id = ?", [courseId])
            .then((studentHasCourses) => (studentHasCourses as StudentHasCourse[]).map(studentHasCourse => new StudentHasCourse(studentHasCourse)));
    }
    getByStudentIdAndCourseId(studentId: number, courseId: number) {
        return this.databaseService.execute("SELECT * FROM StudentHasCourse WHERE student_id= ? AND course_id = ?", [studentId, courseId])
            .then((studentHasCourses) => (studentHasCourses as StudentHasCourse[]).map(studentHasCourse => new StudentHasCourse(studentHasCourse)));
    }

    getAll(): Promise<StudentHasCourse[]> {
        return this.databaseService.execute("SELECT * FROM StudentHasCourse")
            .then((studentHasCourses) => (studentHasCourses as StudentHasCourse[]).map(studentHasCourse => new StudentHasCourse(studentHasCourse)));
    }


    insert(studentId: number, courseId: number, state: string): Promise<StudentHasCourse[]> {
        return this.databaseService.execute("INSERT INTO StudentHasCourse student_id, course_id VALUES (?,?)", [studentId, courseId, state])
            .then((studentHasCourses) => (studentHasCourses as StudentHasCourse[]).map(studentHasCourse => new StudentHasCourse(studentHasCourse)));
    }

    updateStudentId(studentId: number, courseId: number, newStudentId: number): Promise<StudentHasCourse[]> {
        return this.databaseService.execute("UPDATE StudentHasCourse SET StudentHasCourse = ? WHERE student_id = ? AND course_id = ?", [newStudentId, studentId, courseId])
            .then((studentHasCourses) => (studentHasCourses as StudentHasCourse[]).map(studentHasCourse => new StudentHasCourse(studentHasCourse)));
    }
    updateCourseId(newCourseId: number, studentId: number, courseId: number): Promise<StudentHasCourse[]> {
        return this.databaseService.execute("UPDATE StudentHasCourse SET courseId = ? WHERE student_id = ? AND course_id = ?" , [newCourseId, studentId, courseId])
            .then((studentHasCourses) => (studentHasCourses as StudentHasCourse[]).map(studentHasCourse => new StudentHasCourse(studentHasCourse)));
    }
    updateState(state: string, studentId,courseId: number): Promise<StudentHasCourse[]> {
        return this.databaseService.execute("UPDATE StudentHasCourse SET state = ? WHERE student_id= ? AND course_id = ?", [state, studentId, courseId])
            .then((studentHasCourses) => (studentHasCourses as StudentHasCourse[]).map(studentHasCourse => new StudentHasCourse(studentHasCourse)));
    }

    delete(studentId: number, courseId: number): Promise<StudentHasCourse[]> {
        return this.databaseService.execute("DELETE FROM StudentHasCourse WHERE student_id = ? AND course_id = ?", [studentId, courseId])
            .then((studentHasCourses) => (studentHasCourses as StudentHasCourse[]).map(studentHasCourse => new StudentHasCourse(studentHasCourse)));
    }


}