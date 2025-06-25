export interface ErrorResponse {
    httpCode: number;
    message: string;
}

export class ExceptionService {


    public handle(error): ErrorResponse {
        return {httpCode: 404,
            message: "Not Found"
        };
    }
}