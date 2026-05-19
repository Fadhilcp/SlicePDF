import { IUserDocument } from "../types/user.types";
import { BaseRepository } from "./base.repository";
import { IUserRepository } from "./interfaces/IUserRepository";
import UserModel from "../models/user.schema"

export class UserRepository 
    extends BaseRepository<IUserDocument>
        implements IUserRepository {

    constructor(){
        super(UserModel);
    }

    async findByEmail(email: string): Promise<IUserDocument | null> {
        return await UserModel.findOne({ email });
    }
}