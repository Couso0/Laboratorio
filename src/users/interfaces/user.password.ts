import { UserEntity } from "../entities/user.entity";

export interface UserReturn{
    id:number;
    name:string;
    age:number;
    photo:string;
    email:string;
    role:string;
    gender:string;
    isActive:boolean;
}