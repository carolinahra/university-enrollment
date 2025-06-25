import { error } from "console";
import { Professor } from "../models/Professor"
import { ProfessorService } from "../services/ProfessorService"
import { ExceptionService, ErrorResponse } from "../services/exception.service"
import { GetProfessorRequest } from "../requests/professor/get-professor.request.dto";

export class ProfessorController {
    private professorService: ProfessorService;
    private exceptionService: ExceptionService;
    constructor(professorService: ProfessorService, exceptionService: ExceptionService) {
        this.professorService = professorService;
        this.exceptionService = exceptionService;
    }

    public get(request: GetProfessorRequest): Promise<Professor[] | ErrorResponse> {
        if (request.email) {
            return this.getProfessorByEmail(request.email);
        }
        if (request.name) {
            return this.getProfessorsByName(request.name);
        }

        return this.getAll();
    }

    private getAll() {
        return this.professorService.getAll();
    }

    private getProfessorsByName(name: string) {
        return this.professorService.getByName(name).catch((error) => {
            return this.exceptionService.handle(error);
        });
    }

    private getProfessorByEmail(email: string) {
        return this.professorService.getByEmail(email).catch((error) => {
            return this.exceptionService.handle(error);
        });
    }


}
