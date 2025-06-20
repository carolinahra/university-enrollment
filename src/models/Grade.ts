export interface Grade {
    id?: number;
    studentId: number;
    courseId: number;
    grade: number;
    semester: number;
    createdAt?: string;
    updatedAt?: string;
}

export class Grade {
    id?: number;
    studentId: number;
    courseId: number;
    grade: number;
    semester: number;
    createdAt?: string;
    updatedAt?: string;

    constructor(grade: Grade) {
        this.id = grade.id;
        this.studentId = grade.studentId;
        this.courseId = grade.courseId;
        this.grade = grade.grade;
        this.semester = grade.semester;
        this.createdAt = grade.createdAt;
        this.updatedAt = grade.updatedAt;
    }

}