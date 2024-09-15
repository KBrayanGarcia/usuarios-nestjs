import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ResponseClass } from "../classes/response.class";
import { ErrorClass } from "../classes/error.class";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => ResponseClass.createResponse(data)),
            catchError((error) => ErrorClass.handleError(error))
        );
    }
}
