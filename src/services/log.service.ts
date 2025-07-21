import { appendFile, mkdir } from "node:fs/promises"
import { Record } from "src/models/record.js"
import { Request } from "express"
import { existsSync } from "node:fs"
import path from "node:path"

export class LogService {
    record: Record;

    constructor() {
        this.record = new Record(this.record);
    }

    public start() {
        const start = Date.now();
        this.record.startTime = start;
        this.record.timestamp = Date();

    }

    public collect(request?: Request, resBody?, error?: Error) {
        if (request) {
            const requestData = [
                `${request.method} ${request.originalUrl}`,
                `Query: ${JSON.stringify(request.query)}`,
                `Body: ${JSON.stringify(request.body)}`
            ].join(" | ");
            this.record.request = requestData;
        }
        if (error) {
            this.record.error = error.toString();
        }

        if (resBody) {

        }
    }

    public log() {
        const end = Date.now();
        this.record.totalTime = end - this.record.startTime;
        const log = this.record.toString() + "\n";
        const logDir = path.resolve('logs');
        const logFile = path.join(logDir, 'university_enrollment_system.log')

        if (!existsSync(logDir)) {
            mkdir(logDir);
        }

        appendFile(logFile, log)
            .catch((error) => { throw error });


    }

}