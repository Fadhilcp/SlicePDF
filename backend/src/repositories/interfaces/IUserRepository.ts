import { IUserDocument } from "../../types/user.types";
import { BaseRepository } from "../base.repository";

export interface IUserRepository extends BaseRepository<IUserDocument> {
    findByEmail(email: string): Promise<IUserDocument | null>;
}