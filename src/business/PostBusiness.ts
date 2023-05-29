import { PostDatabase } from "../database/PostDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ){}//aqui não há hasheamento de senha

    //enpoints
}