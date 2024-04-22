

export default class HttpException extends Error{
    message: any;
    errorCode: any;
    statusCode: number;
    error: any;

    constructor(message:string, errorCode:any, statusCode:number, error:any) {
        super(message)
        this.message(message)
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.error=error
    }
}

export enum ErrorCode{
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSOWRD=1003
}