import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/admin/user';
import { Password } from 'app/models/password/password';
import { AuthService } from 'app/services/shared/auth.service';
import { PasswordService } from 'app/services/password/password.service';
import { StorageService } from 'app/services/shared/storage.service';
import { Platform } from '@angular/cdk/platform';
@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css'],
})
export class PagesLoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoginFailed = false;
  errorMessage = '';
  errorMessage1 = '';
  passwordChangeCheck: boolean = false;
  change: boolean = false;
  userData = new User();

  message = '';
  submitted = false;
  passwordData = new Password();
  loading: boolean;
  exception: String[] = [];
  userAgent?: String;

  is_password_matched:boolean = true;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private passwordService: PasswordService,
    private platform: Platform
  ) {}
  ngOnInit(): void {}

  togglePassword() {
    const passwordInput = document.querySelector('#yourPassword');
    const eye = document.querySelector('#eye');
    eye?.classList.toggle('bi-eye');
    const type =
      passwordInput?.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput?.setAttribute('type', type);
  }

  onSubmit(): void {
    if (this.platform.BLINK) {
      this.userAgent = 'Chrom(Webkit or old Edge version) device';
    } else {
      if (this.platform.IOS) {
        this.userAgent = 'IOS device';
      } else {
        if (this.platform.FIREFOX) {
          this.userAgent = 'FIREFOX device';
        } else {
          if (this.platform.WEBKIT) {
            this.userAgent = ' WebKit-based browser (Opera) device';
          } else {
            if (this.platform.TRIDENT) {
              this.userAgent = ' IE device';
            } else {
              if (this.platform.EDGE) {
                this.userAgent = ' EDGE device';
              } else {
                if (this.platform.SAFARI) {
                  this.userAgent = ' SAFARI device';
                } else {
                  if (this.platform.ANDROID) {
                    this.userAgent = ' ANDROID  device';
                  } else {
                    this.userAgent = ' browser type unknown  device';
                  }
                }
              }
            }
          }
        }
      }
    }

    this.loading = true;
    const { username, password } = this.form;

    this.authService.login(username, password, this.userAgent).subscribe({
      next: (data) => {
        this.loading = false;
        this.isLoginFailed = false;
        this.storageService.saveUser(data);
        this.relodePage();
        // this.router.navigate(['dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error.message;
        //  this.errorMessage1= err.error.message;
        if (this.errorMessage.includes('password_expired')) {
          this.change = true;
          let errorM: any[] = this.errorMessage.split(' ');
          this.passwordData.id = errorM[1];
          this.errorMessage = 'User credentials expired.';
        }
        this.isLoginFailed = true;
      },
    });
  }
  relodePage(): void {
    window.location.reload();
  }
  checkPasswordStatus(): void {
    this.passwordChangeCheck = true;
  }
  changePassword(): void {
    if (this.passwordData.oldPassword != this.passwordData.password) {
      this.loading = true;
      this.passwordService.changeMyPassword(this.passwordData).subscribe({
        next: (res) => {
          this.loading = false;
          this.message = '';
          this.submitted = true;
          this.storageService.clean();
          window.location.reload();
        },
        error: (e) => {
          this.loading = false;
          console.error(e);
          this.message = 'Incorrect Old Password!';
        },
      });
    } else {
      this.message = "Old password and new password shouldn't be similar!";
    }
  }
  confirmPassword(event: any) {
    let confirmPassword = event.target.value;
    this.is_password_matched = this.passwordData.password == confirmPassword ? true : false;
  }

  alertClosed(status: String): void {
    if (status === 'success') {
      this.submitted = false;
    } else if (status === 'danger') {
      this.message = '';
    }
  }
}
