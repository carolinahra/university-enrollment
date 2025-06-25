export interface CourseHasProfessor {
    courseId: number;
    professorId: number;
    capacity: number;
    state: string;
    createdAt?: string;
    updatedAt?: string;
}

export class CourseHasProfessor {
    studentId: number;
    courseId: number;
    professorId: number;
    capacity: number;
    state: string;
    createdAt?: string;
    updatedAt?: string;

    constructor(courseHasProfessor: CourseHasProfessor) {
        this.studentId = courseHasProfessor.studentId;
        this.courseId = courseHasProfessor.courseId;
        this.professorId = courseHasProfessor.professorId;
        this.capacity = courseHasProfessor.capacity;
        this.state = courseHasProfessor.state;
        this.createdAt = courseHasProfessor.createdAt;
        this.updatedAt = courseHasProfessor.updatedAt;
    }

}