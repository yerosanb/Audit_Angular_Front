import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/services/shared/storage.service';
import { UserService } from 'app/services/admin/user.service';
import { User } from 'app/models/admin/user';
import { Password } from 'app/models/password/password';
import { PasswordService } from 'app/services/password/password.service';
import { AuthService } from 'app/services/shared/auth.service';
import { environment } from 'environments/environment';
import { ImageSnippet } from 'app/helpers/image-snippet';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationService } from 'app/services/shared/validation.service';
@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css'],
})
export class UsersProfileComponent implements OnInit {
  environment = environment;
  isLoggedIn = false;
  private roles: string[] = [];
  userData = new User();
  message = '';
  username?: string;

  title?: string;

  submitted = false;

  // change password functionalities object
  passwordData = new Password();

  // change user profile pic
  selectedFile: ImageSnippet;

  // user roles
  admin = false;
  approver = false;
  followup_officer = false;
  reviewer = false;
  auditee = false;
  auditee_division = false;
  auditor = false;

  errorMessage: string;

  user_job_position: string;
  // logout
  id_login_tracker: number;

  is_password_matched: boolean = true;

  email: string;
  phone_number: string;
  email_status = false;
  phone_number_status = false;

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private passwordService: PasswordService,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // returned datas when user logins successffully
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.admin = this.roles.includes('ROLE_ADMIN');
      // this.approver = this.roles.includes('ROLE_APPROVER');
      // this.reviewer = this.roles.includes('ROLE_REVIEWER');
      // this.followup_officer = this.roles.includes('ROLE_FOLLOWUP_OFFICER');
      // this.auditor = this.roles.includes('ROLE_AUDITOR');
      // this.auditee = this.roles.includes('ROLE_AUDITEE');
      // this.auditee_division = this.roles.includes('ROLE_AUDITEE_DIVISION');
      this.username = user.email;
      this.title = user.title;
      this.id_login_tracker = user.id_login_tracker;
      this.retrieveUser(user.id);
    }
  }

  retrieveUser(id: any): void {
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.userData = data;
        console.log(this.userData)
        const pattern = /^(AB|AIB)\/(\d{1,7})\/(19|20|21)(\d{2})$/;

        const _id = {
          id_no: this.userData.employee_id?.match(pattern)![2],
          year:
            this.userData.employee_id!.match(pattern)![3] +
            this.userData.employee_id!.match(pattern)![4],
        };

        this.validationService.checkUserEmployeeId(_id).subscribe({
          next: (res: any) => {
            if (res) {
              this.user_job_position = res.position;
            } else {
              this.user_job_position = '';
            }
          },
          error: (error: HttpErrorResponse) => {
            this.errorMessage = error.error.message;
          },
        });
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  addUser(): void {
    if (this.selectedFile) {
      this.userService
        .addUser(this.userData, this.selectedFile.file)
        .subscribe({
          next: (res) => {
            this.message = '';
            this.submitted = true;
          },
          error: (e) => {
            console.error(e);
            this.message = e;
          },
        });
    } else {
      this.userService.addUser(this.userData).subscribe({
        next: (res) => {
          this.message = '';
          this.submitted = true;
        },
        error: (e) => {
          console.error(e);
          this.message = e;
        },
      });
    }
  }

  confirmPassword(event: any) {
    let confirmPassword = event.target.value;
    this.is_password_matched =
      this.passwordData.password == confirmPassword ? true : false;
  }

  changePassword(): void {
    this.passwordData.id = this.userData.id;
    this.passwordService.changeMyPassword(this.passwordData).subscribe({
      next: (res) => {
        this.message = '';
        this.submitted = true;
        this.storageService.clean();
        window.location.reload();
      },
      error: (e) => {
        console.error(e);
        this.message = e;
      },
    });

    if (this.submitted) {
      this.authService.logout(this.id_login_tracker).subscribe({
        next: (res) => {
          this.storageService.clean();
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.userData.photoUrl = '';
    this.addUser();
  }

  alertClosed(status: String): void {
    if (status === 'success') {
      this.submitted = false;
    } else if (status === 'danger') {
      this.message = '';
    }
  }

  checkEmailStatus(event: any) {
    this.email = event.target.value;
    this.validationService.checkUserEmail(this.email).subscribe({
      next: (res: any) => {
        if (res) {
          this.email_status = true;
        } else {
          this.email_status = false;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
      },
    });
  }
  checkPhoneNumberStatus(event: any) {
    this.phone_number = event.target.value;
    this.validationService.checkUserPhoneNumber(this.phone_number).subscribe({
      next: (res: any) => {
        if (res) {
          this.phone_number_status = true;
        } else {
          this.phone_number_status = false;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
      },
    });
  }
}
