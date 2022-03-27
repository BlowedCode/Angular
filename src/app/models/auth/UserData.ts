import { IUserData } from "./IUserData";

export class UserData implements IUserData {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
}