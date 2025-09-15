export class CourseNotFoundException extends Error {
     constructor(message?: string) {
        super(message || 'Course not found');
    }
}