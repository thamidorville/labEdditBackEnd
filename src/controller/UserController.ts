import { UserBusiness } from "../business/UserBusiness";

export class UserController { //UserController chama a UserBusiness
    constructor(
        private userBusiness: UserBusiness
    ){}

    //endpoints
}