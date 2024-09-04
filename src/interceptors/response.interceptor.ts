import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ResponseUtility } from "../utilitys/response.utility";
import { ErrorUtility } from "../utilitys/error.utility";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => ResponseUtility.createResponse(data)),
            catchError((error) => ErrorUtility.handleError(error))
        );
    }
}
