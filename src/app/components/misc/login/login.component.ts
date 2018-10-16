import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { ApiError } from '../../../shared/models/api-error.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  user: User = new User();
  apiError: ApiError;

  constructor(private sessionService: SessionService, private router: Router) { }

  onSubmitLogin(loginForm: FormGroup): void {
    if (loginForm.valid) {
      this.sessionService.authenticate(this.user)
        .subscribe(
          () => {
            loginForm.reset();
            this.router.navigate(['/events']);
          },
          (error: ApiError) => this.apiError = error
        );
    }
  }
}
