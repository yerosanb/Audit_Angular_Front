import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordAndToken } from 'app/models/password/password_and_token/password-and-token';
import { PasswordService } from 'app/services/password/password.service';
import { AuthService } from 'app/services/shared/auth.service';
import { StorageService } from 'app/services/shared/storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-password-reset-otp',
  templateUrl: './password-reset-otp.component.html',
  styleUrls: ['./password-reset-otp.component.css'],
})
export class PasswordResetOtpComponent {
  count = 0; // 2 minutes in seconds

  otp: string;

  loading = false;

  counter = '';

  is_verified = false;

  interval: any;

  @Input() passedData: any;
  @Output() outputData: EventEmitter<any> = new EventEmitter();

  passwordData = new PasswordAndToken();

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private passwordService: PasswordService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.startCounter();
  }

  startCounter() {
    this.count = 120; // 2 minutes in seconds
    this.interval = setInterval(() => {
      const minutes = Math.floor(this.count / 60);
      const seconds = this.count % 60;
      this.counter = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      this.count--;
      if (this.count < 0) {
        this.emitData();
        clearInterval(this.interval);
      }
    }, 1000);
  }

  emitData() {
    this.outputData.emit();
  }

  verifyOTP(): void {
    this.loading = true;
    this.passwordService.verifyOTP(this.otp).subscribe({
      next: (data) => {
        this.loading = false;
        this.is_verified = true;
        this.otp = data;
        console.log(this.otp);
        clearInterval(this.interval);
      },
      error: (err) => {
        this.is_verified = false;
        this.messageService.add({
          severity: 'error',
          summary:
            'The provided verification code is invalid, or there is interent connection issue !',
          detail: '',
          life: 10000,
        });

        this.loading = false;
      },
    });
  }

  changePassword(): void {
    this.passwordData.token = this.otp;
    this.loading = true;
    this.passwordService.changePasswordWithToken(this.passwordData).subscribe({
      next: (res) => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Your password successfully changed!',
          detail: '',
          life: 10000,
        });
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 4000);
      },
      error: (e) => {
        console.error(e);
        this.messageService.add({
          severity: 'error',
          summary: 'Something went wrong while changing password!',
          detail: '',
          life: 10000,
        });
        this.loading = false;
      },
    });
  }
}
