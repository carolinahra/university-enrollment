export interface Prerequisite {
    id?: number;
    name: string;
    description: string;
    state: string;
    createdAt?: string;
    updatedAt?: string;
}

export class Prerequisite {
    id?: number;
    name: string;
    description: string;
    state: string;
    createdAt?: string;
    updatedAt?: string;

    constructor(prerequisite: Prerequisite) {
        this.id = prerequisite.id;
        this.name = prerequisite.name;
        this.description = prerequisite.description;
        this.state = prerequisite.state;
        this.createdAt = prerequisite.createdAt;
        this.updatedAt = prerequisite.updatedAt;
    }

}