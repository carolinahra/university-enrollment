import { Prerequisite } from "../models/prerequisite";
import { PrerequisiteService } from "../services/prerequisite.service";
import { ErrorResponse, ExceptionService } from "../services/exception.service";
import { GetPrerequisiteRequest } from "../requests/prerequisite/get-prerequisite.request.dto";

export class PrerequisiteController {
    private prerequisiteService: PrerequisiteService;
    private exceptionService: ExceptionService;
    constructor(prerequisiteService: PrerequisiteService, exceptionService: ExceptionService) {
        this.prerequisiteService = prerequisiteService;
        this.exceptionService = exceptionService;
    }

    public get(request: GetPrerequisiteRequest): Promise<Prerequisite[] | ErrorResponse> {
        if (request.id) {
            return this.getById(request.id);
        }
        if (request.name) {
            return this.getByName(request.name);
        }
        if (request.state) {
            return this.getByState(request.state);
        }
        return this.getAll();

    }

    private getById(id: number) {
        return this.prerequisiteService.getById(id).catch((error) => {
            return this.exceptionService.handle(error);
        })
    }

    private getByState(state: string) {
        return this.prerequisiteService.getByState(state).catch((error) => {
            return this.exceptionService.handle(error);
        })
    }

    private getAll() {
        return this.prerequisiteService.getAll();
    }

    private getByName(name: string) {
        return this.prerequisiteService.getByName(name).catch((error) => {
            return this.exceptionService.handle(error);
        })
    }

    private insert(name: string, description: string, state: string) {
        return this.prerequisiteService.insert(name, description, state).catch((error) => {
            return this.exceptionService.handle(error);
        })
    }

    private updateName(newName: string, name: string) {
        return this.prerequisiteService.updateName(newName, name).catch((error) => {
            return this.exceptionService.handle(error);
        })
    }
    private updateState(state: string, name: string) {
        return this.prerequisiteService.updateState(state, name).catch((error) => {
            return this.exceptionService.handle(error);
        })
    }
    private updateDescription(description: string, name: string) {
        return this.prerequisiteService.updateDescription(description, name).catch((error) => {
            return this.exceptionService.handle(error);
        })
    }

    private delete(name: string) {
        return this.prerequisiteService.delete(name).catch((error) => {
            return this.exceptionService.handle(error);
        })
    }


}