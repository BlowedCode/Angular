import { IUserData } from "./IUserData";

export class UserData implements IUserData {
    public id: string = "";
    public username: string = "";
    public password: string = "";
    public email: string = "";
    public dtregister: Date = new Date();
    public dtlastlogin: Date = new Date();
}