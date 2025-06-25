import { Prerequisite } from "../models/prerequisite";
import { PrerequisiteFactory } from "../factories/prerequisite.factory";

export class PrerequisiteService {
    private prerequisiteFactory: PrerequisiteFactory;
    constructor(prerequisiteFactory: PrerequisiteFactory) {
        this.prerequisiteFactory = prerequisiteFactory;
    }

    getById(id: number): Promise<Prerequisite[]> {
        return this.prerequisiteFactory.getById(id);
    }

    getByState(state: string): Promise<Prerequisite[]> {
        return this.prerequisiteFactory.getByState(state);
    }

    getAll(): Promise<Prerequisite[]> {
        return this.prerequisiteFactory.getAll();
    }

    getByName(name: string): Promise<Prerequisite[]> {
        return this.prerequisiteFactory.getByName(name);
    }

    insert(name: string, description: string, state: string): Promise<Prerequisite[]> {
        return this.prerequisiteFactory.insert(name, description, state);
    }

    updateName(newName: string, name: string): Promise<Prerequisite[]> {
        return this.prerequisiteFactory.updateName(newName, name);
    }
    updateState(state: string, name: string): Promise<Prerequisite[]> {
        return this.prerequisiteFactory.updateState(state, name)
    }
    updateDescription(description: string, name: string): Promise<Prerequisite[]> {
        return this.prerequisiteFactory.updateDescription(description, name);
    }

    delete(name: string): Promise<Prerequisite[]> {
        return this.prerequisiteFactory.delete(name);
    }


}