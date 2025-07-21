export interface Record {
     timestamp: string;
    request: string;
    response?: string;
    error?: string;
    totalTime: number;
    startTime: number;
}

export class Record {
    timestamp: string;
    request: string;
    response?: string;
    error?: string;
    totalTime: number;
    startTime: number;

    constructor(record: Record) {
        this.timestamp = record.timestamp;
        this.request = record.request;
        this.response = record.response;
        this.error = record.error;
        this.totalTime = record.totalTime;
        this.startTime = record.startTime;
    }    
}