import { InvalidRequestException } from "../../exceptions/invalid-request.exception";

export class InsertGradeRequest {
    studentId: number;
    courseId: number;
    grade: number;
    semester: number;

    constructor(  studentId: number, courseId: number, grade: number, semester: number) {
        this.studentId = studentId;
        this.courseId = courseId;
        this.grade = grade;
        this.semester = semester;
    }

    public validate() {
        if (this.isValidId(this.courseId)) {
            return this.courseId;
        }
        if (this.isValidId(this.studentId)) {
            return this.studentId;
        }
        if (this.isValidGrade(this.grade)) {
            return this.grade;
        }
        if (this.isValidSemester(this.semester)) {
            return this.semester;
        }
        throw new InvalidRequestException();
    }

       private isValidId(id: number) {
        const idRegex = /^[0-9]+$/;
        return idRegex.test(id.toString());
    }

    private isValidGrade (grade: number) {
        const gradeRegex = /^[0-9.]+$/;
        return gradeRegex.test(grade.toString());
    }
    
    private isValidSemester (semester: number) {
        const semesterRegex = /^[1-2]{1}$/;
        return semesterRegex.test(semester.toString())
    }
}