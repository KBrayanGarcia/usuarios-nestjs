import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ErrorService } from "src/modules/error/error.service";
import { ResponseService } from "../response.service";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor(
        private readonly errorService: ErrorService,
        private readonly responseService: ResponseService
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => this.responseService.createResponse(data)),
            catchError((error) => this.errorService.handleError(error))
        );
    }
}

export const ResponseInterceptorProvider = {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
};
