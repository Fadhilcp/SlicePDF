import { Model } from "mongoose";
import { IBaseRepository } from "./interfaces/IBaseRepository";

export class BaseRepository<T> implements IBaseRepository<T> {
    constructor(private model: Model<T>){}

    async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data);
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id);
    }

    async findOne(filter: object): Promise<T | null> {
        return await this.model.findOne(filter);
    }

    async findAll(filter = {}): Promise<T[]> {
        return await this.model.find(filter);
    }

    async updateById(id: string, data: Partial<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteById(id: string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id);
    }
}