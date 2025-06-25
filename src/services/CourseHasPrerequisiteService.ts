import { CourseHasPrerequisite } from "../models/CourseHasPrerequisite";
import { CourseHasPrerequisiteFactory } from "../factories/CourseHasPrerequisiteFactory";
// TODO: Introduce indexes in all tables


export class CourseHasPrerequisiteService {
    private courseHasPrerequisiteFactory: CourseHasPrerequisiteFactory;
    constructor(courseHasPrerequisiteFactory: CourseHasPrerequisiteFactory) {
        this.courseHasPrerequisiteFactory = courseHasPrerequisiteFactory;
    }


    getByPrerequisiteId(prerequisiteId: number): Promise<CourseHasPrerequisite[]> {
        return this.courseHasPrerequisiteFactory.getByPrerequisiteId(prerequisiteId);
    }
    getByCourseId(courseId: number): Promise<CourseHasPrerequisite[]> {
        return this.courseHasPrerequisiteFactory.getByCourseId(courseId);
    }
    getByPrerequisiteIdAndCourseId(courseId: number, prerequisiteId: number) {
        return this.courseHasPrerequisiteFactory.getByPrerequisiteIdAndCourseId(prerequisiteId, courseId);
    }

    getAll(): Promise<CourseHasPrerequisite[]> {
        return this.courseHasPrerequisiteFactory.getAll();
    }


    insert(courseId: number, prerequisiteId: number, state: string): Promise<CourseHasPrerequisite[]> {
        return this.courseHasPrerequisiteFactory.insert(courseId, prerequisiteId, state);
    }

    updateState(state: string, courseId: number, prerequisiteId: number): Promise<CourseHasPrerequisite[]> {
        return this.courseHasPrerequisiteFactory.updateState(state, courseId, prerequisiteId);
    }
    updateCourseId(newCourseId: number, courseId: number, prerequisiteId): Promise<CourseHasPrerequisite[]> {
        return this.courseHasPrerequisiteFactory.updateCourseId(newCourseId, courseId, prerequisiteId);
    }

    delete(courseId: number, prerequisiteId: number): Promise<CourseHasPrerequisite[]> {
        return this.courseHasPrerequisiteFactory.delete(courseId, prerequisiteId);
    }


}