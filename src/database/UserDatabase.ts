import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    //metodos db

    public insertUser = async (userDB: UserDB): Promise<void> => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(userDB)

    }
    public findUserByEmail = async (email: string): Promise<UserDB | undefined> => {
        const [userDB]:UserDB[] | undefined[]= await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ email })

        return userDB 
    }


}