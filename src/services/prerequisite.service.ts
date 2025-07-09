import { Prerequisite } from "../models/prerequisite.js";
import { PrerequisiteFactory } from "../factories/prerequisite.factory.js";

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

    get(limit: number, offset: number): Promise<Prerequisite[]> {
        return this.prerequisiteFactory.get(limit, offset);
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

    delete(name: string): Promise<string> {
        return this.prerequisiteFactory.delete(name);
    }


}