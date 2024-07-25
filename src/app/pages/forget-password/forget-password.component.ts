import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/admin/user';
import { Password } from 'app/models/password/password';
import { AuthService } from 'app/services/shared/auth.service';
import { PasswordService } from 'app/services/password/password.service';
import { StorageService } from 'app/services/shared/storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  form: any = {
    authenthication_media: true,
    email: '',
    phone_number: '',
  };
  errorMessage = '';
  errorMessage1 = '';
  emailSentCheck: boolean = false;
  change: boolean = false;
  userData = new User();

  message = '';
  submitted = false;
  passwordData = new Password();
  loading: boolean;
  exception: String[] = [];

  authenthicationOptions = [
    { icon: 'pi pi-envelope', value: true },

    { icon: 'pi pi-phone', value: false },
  ];

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private passwordService: PasswordService,
    private messageService: MessageService
  ) {}

  onSubmit(): void {
    const userAgent = window.navigator.userAgent;

    this.loading = true;
    let user_agent = window.navigator.userAgent;

    this.passwordService.forgotPassword(user_agent, this.form).subscribe({
      next: (data) => {
        this.loading = false;
        this.emailSentCheck = true;
      },
      error: (err) => {
        this.emailSentCheck = false;
        if (this.form.authenthication_media) {
          this.messageService.add({
            severity: 'error',
            summary:
              'The provided email is not verfied before, or there is interent connection issue !',
            detail: '',
            life: 10000,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary:
              'The provided phone number is not verfied before, or there is interent connection issue !',
            detail: '',
            life: 10000,
          });
        }
        this.loading = false;
      },
    });
  }
  relodePage(): void {
    window.location.reload();
  }
  goHome(): void {
    this.router.navigateByUrl('/');
  }

  onDataChange() {
    this.emailSentCheck = false;
    this.loading = false;
  }
}
