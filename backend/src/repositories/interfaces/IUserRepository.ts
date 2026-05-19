import { IUserDocument } from "../../types/user.types";

export interface IUserRepository {
    findByEmail(email: string): Promise<IUserDocument | null>;
}