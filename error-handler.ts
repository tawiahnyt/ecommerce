import { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpException } from "./src/exceptions/root"
import { InternalException } from "./src/exceptions/internal-exception"

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next)
        } catch (error) {
            if (error instanceof HttpException) {
                let exception: HttpException
                if (error instanceof HttpException) {
                    exception = error
                } else {
                    exception = new InternalException('Someething went wrong!', error, ErrorCode.INTERNAL_EXCEPTION)
                }
                next(exception)
            }
        }

    }
}