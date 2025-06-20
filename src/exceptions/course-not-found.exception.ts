export class CourseNotFound extends Error {
     constructor(message?: string) {
        super(message || 'Course not found');
    }
}