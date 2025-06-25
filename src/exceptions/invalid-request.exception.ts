export class InvalidRequest extends Error {
     constructor(message?: string) {
        super(message || 'Invalid request');
    }
}