import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { IUserDocument } from "../types/user.types";
import { IAuthService } from "./interfaces/IAuthService";
import bcrypt from 'bcryptjs'

class AuthService implements IAuthService {
    constructor(
        private _userRepository: IUserRepository
    ){}

    async login(email: string, password: string): Promise<IUserDocument> {

        const user = await this._userRepository.findByEmail(email);

        if(!user){
            throw new Error('User not found');
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw new Error('Password is not match');
        }

        return user;
    }
}