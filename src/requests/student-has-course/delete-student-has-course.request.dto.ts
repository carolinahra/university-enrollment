export class DeleteStudentHasCourseRequest {
    studentId: number;
    courseId: number;

    constructor(studentId: number, courseId: number) {
        this.studentId = studentId;
        this.courseId = courseId;
    }
}