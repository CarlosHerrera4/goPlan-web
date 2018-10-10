import { ApiError } from './../models/api-error.model';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from './../services/session.service';
import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(
    private sessionService: SessionService) { }

  handleError(error: ApiError | Error | HttpErrorResponse) {
    if (error instanceof ApiError && error.status === 403) {
      this.sessionService.logout()
        .subscribe(() => {
          window.location.href = '/login';
        });
    }
  }
}
