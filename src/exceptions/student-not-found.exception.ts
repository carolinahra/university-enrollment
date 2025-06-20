export class StudentNotFound extends Error {
    constructor(message?: string) {
        super(message || 'Student not found');
    }
}
