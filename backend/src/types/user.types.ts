import { Types } from "mongoose";

export interface IUser{
    name: string,
    email: string,
    password: string,
}

export interface IUserDocument extends IUser {
    _id: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
}