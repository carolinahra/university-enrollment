export class UpdateStudentHasCourse {
    studentId: number;
    courseId: number;
    newStudentId?: number;
    newCourseId?: number;
    state?: number;

    constructor( studentId: number, courseId: number, newStudentId?: number, newCourseId?: number, state?: number) {
        this.studentId = studentId;
        this.courseId = courseId;
        this.newStudentId = newStudentId;
        this.newCourseId = newCourseId;
        this.state = state;
    }
}