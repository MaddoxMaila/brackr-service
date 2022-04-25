import { LiteORM } from "../db";




export default class User extends LiteORM{

    static user: User

    constructor(){
        super()
        this.tableName = 'user'
        this.primaryKey = 'id'
        this.columns = [
            'id', 'name', 'email', 'password', 'type', 'companyId', 'auth_token'
        ]
    }

    static all(){
        if(!this.user){
            this.user = new User()
        }
        return this.user
    }

}
