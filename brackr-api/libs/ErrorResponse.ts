import ApiResponse from "./ApiResponse";

export default (res: any, e: any) => {

    console.log(e);
    let response = ApiResponse<Error>(true, e.message, e);
    res.json(response);

}