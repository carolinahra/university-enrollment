export interface StudentHasCourse {
    courseId: number;
    studentId: number;
    state: string;

}

export class StudentHasCourse {

    courseId: number;
    studentId: number;
    state: string;


    constructor(studentHasCourse: StudentHasCourse) {
        this.courseId = studentHasCourse.courseId;
        this.studentId = studentHasCourse.studentId;
        this.state = this.state;
    }

}