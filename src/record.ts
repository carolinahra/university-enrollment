export interface Record {
    timestamp: string;
    error?: string;
    totalTime: number;
}

export class Record {
    timestamp: string;
    error?: string;
    totalTime: number;
    constructor(record: Record) {
        this.timestamp = record.timestamp;
        this.error = record.error;
        this.totalTime = record.totalTime;
    }
}