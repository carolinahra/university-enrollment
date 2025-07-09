import { error } from "console";
import { Professor } from "../models/professor.js"
import { ProfessorService } from "../services/professor.service.js"
import { ExceptionService, ErrorResponse } from "../services/exception.service.js"
import { GetProfessorRequest } from "../requests/professor/get-professor.request.dto.js";

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

        return this.getProfessor(request.limit, request.offset);
    }

    private getAll() {
        return this.professorService.getAll();
    }

    private getProfessor(limit: number, offset: number) {
        return this.professorService.get(limit, offset);
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
