import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ResponseFactory } from "../factories/response.factory";
import { ErrorHandler } from "../handlers/error.handler";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => ResponseFactory.createResponse(data)),
            catchError((error) => ErrorHandler.handleError(error))
        );
    }
}
