import { StudentHasCourse } from "../models/student-has-course";
import { DatabaseService } from "../services/database.service";
// TODO: Introduce indexes in all tables


export class StudentHasCourseFactory {
    private databaseService: DatabaseService;
    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }

    getByStudentId(studentId: number): Promise<StudentHasCourse[]> {
        return this.databaseService.execute("SELECT * FROM Student_has_Course WHERE student_id = ?", [studentId])
            .then((studentHasCourses) => (studentHasCourses as StudentHasCourse[]).map(studentHasCourse => new StudentHasCourse(studentHasCourse)));
    }
    getByCourseId(courseId: number): Promise<StudentHasCourse[]> {
        return this.databaseService.execute("SELECT * FROM Student_has_Course WHERE course_id = ?", [courseId])
            .then((studentHasCourses) => (studentHasCourses as StudentHasCourse[]).map(studentHasCourse => new StudentHasCourse(studentHasCourse)));
    }
    getByStudentIdAndCourseId(studentId: number, courseId: number) {
        return this.databaseService.execute("SELECT * FROM Student_has_Course WHERE student_id= ? AND course_id = ?", [studentId, courseId])
            .then((studentHasCourses) => (studentHasCourses as StudentHasCourse[]).map(studentHasCourse => new StudentHasCourse(studentHasCourse)));
    }

    getAll(): Promise<StudentHasCourse[]> {
        return this.databaseService.execute("SELECT * FROM Student_has_Course")
            .then((studentHasCourses) => (studentHasCourses as StudentHasCourse[]).map(studentHasCourse => new StudentHasCourse(studentHasCourse)));
    }


    insert(studentId: number, courseId: number, state: string): Promise<StudentHasCourse[]> {
        return this.databaseService.execute("INSERT INTO Student_has_Course (student_id, course_id, state) VALUES (?,?,?)", [studentId, courseId, state])
            .then(() => this.getByStudentIdAndCourseId(studentId, courseId));
    }

    updateStudentId(studentId: number, courseId: number, newStudentId: number): Promise<StudentHasCourse[]> {
        return this.databaseService.execute("UPDATE Student_has_Course SET Student_has_Course = ? WHERE student_id = ? AND course_id = ?", [newStudentId, studentId, courseId])
            .then(() => this.getByStudentIdAndCourseId(studentId, courseId));
    }
    updateCourseId(newCourseId: number, studentId: number, courseId: number): Promise<StudentHasCourse[]> {
        return this.databaseService.execute("UPDATE Student_has_Course SET courseId = ? WHERE student_id = ? AND course_id = ?", [newCourseId, studentId, courseId])
            .then(() => this.getByStudentIdAndCourseId(studentId, courseId));
    }
    updateState(state: string, studentId, courseId: number): Promise<StudentHasCourse[]> {
        return this.databaseService.execute("UPDATE Student_has_Course SET state = ? WHERE student_id= ? AND course_id = ?", [state, studentId, courseId])
            .then(() => this.getByStudentIdAndCourseId(studentId, courseId));
    }

    delete(studentId: number, courseId: number): Promise<string> {
        return this.databaseService.execute("DELETE FROM Student_has_Course WHERE student_id = ? AND course_id = ?", [studentId, courseId])
            .then((message) => message = 'Student has Course deleted');
    }


}