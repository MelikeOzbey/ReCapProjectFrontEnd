import { RegisterModel } from "./registerModel";

export class UpdateUserModel implements RegisterModel{
    userId: number;
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;

}