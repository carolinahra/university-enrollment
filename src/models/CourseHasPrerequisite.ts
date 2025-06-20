export interface CourseHasPrerequisite {
    courseId: number;
    prerequisiteId: number;
    state: string;

}

export class CourseHasPrerequisite {

    courseId: number;
    prerequisiteId: number;
    state: string;


    constructor(courseHasPrerequisite: CourseHasPrerequisite) {
        this.courseId = courseHasPrerequisite.courseId;
        this.prerequisiteId = courseHasPrerequisite.prerequisiteId;
        this.state = courseHasPrerequisite.state;
    }

}