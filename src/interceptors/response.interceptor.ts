import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ResponseFactory } from "../utilitys/response.utility";
import { ErrorHandler } from "../utilitys/error.utility";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => ResponseFactory.createResponse(data)),
            catchError((error) => ErrorHandler.handleError(error))
        );
    }
}
