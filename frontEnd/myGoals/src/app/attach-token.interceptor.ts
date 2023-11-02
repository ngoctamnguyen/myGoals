import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

@Injectable()
export class AttachTokenInterceptor implements HttpInterceptor {

  constructor(private stateService: StateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.stateService.state.value.token) {
      const authreq = request.clone(
        {headers: request.headers.set('authorization', 'Bearer ' + this.stateService.state.value.token)}
      )
      return next.handle(authreq);
    }
    return next.handle(request);
  }
}
