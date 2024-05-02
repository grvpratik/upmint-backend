import HttpException from "./root";


export class BadRequestsException extends HttpException{
    constructor(message: string, errorCode: number,error:any) {
        super(message, errorCode, 400,error);
        
    }
}