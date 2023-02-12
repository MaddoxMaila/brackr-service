
type UserType = {
    name            : String,
    type            : String,
    password        : String,
    companyId       : number,
    id              : number,
    createdAt       : String,
    email           : String
}

type ApiKeyType = {
    companyId       : number,
    id              : number,
    apiKey          : String,
    createdAt       : String,
    expire          : String
}


type ResponseType = {
    error: boolean,
    message: String,
    response: any
}


export {
    UserType,
    ApiKeyType,
    ResponseType
}