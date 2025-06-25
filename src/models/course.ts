export interface Course {
    id?: number;
    name: string;
    capacity: number;
    state: string;
    createdAt?: string;
    updatedAt?: string;
}

export class Course {
    id?: number;
    name: string;
    capacity: number;
    state: string;
    createdAt?: string;
    updatedAt?: string;

    constructor(course: Course) {
        this.id = course.id;
        this.name = course.name;
        this.capacity = course.capacity;
        this.state = course.state;
        this.createdAt = course.createdAt;
        this.updatedAt = course.updatedAt;
    }

}