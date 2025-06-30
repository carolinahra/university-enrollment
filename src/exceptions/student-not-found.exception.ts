export class StudentNotFoundException extends Error {
    constructor(message?: string) {
        super(message || 'Student not found');
    }
}
