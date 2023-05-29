import { UserDatabase } from "../database/UserDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness { //cuida das regras de negócio
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManeger: TokenManager,
        private hashManager: HashManager
    ){}
    //endpoints
}