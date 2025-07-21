import { InvalidRequestException } from "../exceptions/invalid-request.exception.js";
import { StudentHasCourse } from "../models/student-has-course.js";
import { InscriptionRequest } from "../requests/inscription/inscription.request.dto.js";
import { ErrorResponse, ExceptionService } from "../services/exception.service.js";
import { InscriptionService } from "../services/inscription.service.js";

export class InscriptionController {
    inscriptionService: InscriptionService;
    exceptionService: ExceptionService;

    constructor(inscriptionService: InscriptionService, exceptionService: ExceptionService) {
        this.inscriptionService = inscriptionService;
        this.exceptionService = exceptionService;
    }

    public handle(request: InscriptionRequest): Promise<StudentHasCourse[] | ErrorResponse | void> {
        if (request.email && request.name) {
            return this.inscribeOne(request.email, request.name);
        }
        if (request.emails && request.names) {
            return this.inscribeMany(request.emails, request.names);
        }
        throw new InvalidRequestException();
    }

    private inscribeOne(email: string, name: string) {
        return this.inscriptionService.inscribeOne(email, name)
            .catch((error) => { return this.exceptionService.handle(error) });
    }

    private inscribeMany(emails: string[], names: string[]) {
        return this.inscriptionService.inscribeMany(emails, names)
            .catch((error) => {
                return this.exceptionService.handle(error)
            });
    }
}