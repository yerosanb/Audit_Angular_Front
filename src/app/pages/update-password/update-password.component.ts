import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/models/admin/user';
import { AuthService } from 'app/services/shared/auth.service';
import { PasswordService } from 'app/services/password/password.service';
import { StorageService } from 'app/services/shared/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PasswordAndToken } from 'app/models/password/password_and_token/password-and-token';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent {
  token?: string;
  form: any = {
    username: null,
    password: null,
  };
  isLoginFailed = false;

  passwordChangeCheck: boolean = false;
  change: boolean = false;
  userData = new User();

  passwordData = new PasswordAndToken();
  loading: boolean;
  exception: String[] = [];

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private messageService: MessageService,
    private passwordService: PasswordService,
    private _Activatedroute: ActivatedRoute
  ) {
    this._Activatedroute.params.subscribe((params) => {
      this.token = params['token'];
    });
  }
  ngOnInit(): void {
    //Gets token from url query param, if not availaible then null
    this.token = new URLSearchParams(window.location.search).get('token') ?? '';

    // Check token validity
    this.passwordService.getUserByPasswordResetToken(this.token).subscribe({
      next: (user: any) => {
        // this.userData = user;
        this.passwordData.token = this.token;
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Something went wrong !',
          detail: '',
          life: 10000,
        });
        this.router.navigateByUrl('/invalid-token');
      },
    });
  }

  onSubmit(): void {
    const userAgent = window.navigator.userAgent;

    this.loading = true;
    this.changePassword();
  }

  relodePage(): void {
    window.location.reload();
  }
  checkPasswordStatus(): void {
    this.passwordChangeCheck = true;
  }
  changePassword(): void {
    this.passwordService.changePasswordWithToken(this.passwordData).subscribe({
      next: (res) => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Your password is successfully changed.',
          detail: '',
          life: 10000,
        });
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 4000);

      },
      error: (e) => {
        console.error(e);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Something went wrong while changing password !',
          detail: '',
          life: 10000,
        });
      },
    });
  }
}
