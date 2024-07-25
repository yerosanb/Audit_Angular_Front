import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from 'app/services/shared/storage.service';
import { User } from 'app/models/admin/user';
import { environment } from 'environments/environment';
import { Contact } from 'app/models/admin/contact';
import { ContactService } from 'app/services/admin/contact.service';
import { Feedback } from 'app/models/shared/feedback';
import { ConfirmationService, MessageService } from 'primeng/api';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-need-help',
  templateUrl: './need-help.component.html',
  styleUrls: ['./need-help.component.css'],
})
export class NeedHelpComponent {
  selectedUser: User = new User();
  users: User[] = [];
  allContact: Contact[] = [];
  regesteredBy: any;
  environment = environment;
  isLoggedIn = false;
  private roles: string[] = [];
  feedback: Feedback = new Feedback();
  feedbacks: Feedback[] = [];
  selectedFeedbacks: Feedback[] = [];
  passFeedbacks: Feedback[] = [];
  selectedContacts: Contact[] = [];

  contact_loading = false;
  feedback_loading = false;
  feedback_form_loading = false;

  admin: boolean;
  approver: boolean;
  maker: boolean;
  ho: boolean;
  id: number;

  public Editor = ClassicEditor;

  public config = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'insertTable',
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        '|',
        'undo',
        'redo',
      ],
    },
    language: 'en',
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
  };

  constructor(
    private storageService: StorageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(
      (data) => {
        this.allContact = data;
        this.contact_loading = false;
      },
      (error) => {
        this.contact_loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Something went wrong while fetching contacts !',
          detail: '',
        });
      }
    );
    this.getFeedbacks(this.storageService.getUser().id);

    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.approver = this.roles.includes('ROLE_APPROVER');
      this.maker = this.roles.includes('ROLE_MAKER');
      this.ho = this.roles.includes('ROLE_HO');
      this.id = user.id;
    }
  }

  getFeedbacks(id: any) {
    this.contactService.getFeedbacksByUserID(id).subscribe(
      async (response: any) => {
        this.feedbacks = response;
        this.feedback_loading = false;
      },
      (error: HttpErrorResponse) => {
        this.feedback_loading = false;
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while fetching feedbacks!',

          detail: '',
        });
      }
    );
  }

  writeFeedback(): void {
    this.feedback.user_id = this.id;
    this.feedback_form_loading = true;
    this.contactService.saveFeedback(this.feedback).subscribe({
      next: (res) => {
        this.feedback_form_loading = false;
        this.getFeedbacks(this.storageService.getUser().id);
        this.feedback = new Feedback();
        this.messageService.add({
          severity: 'success',
          summary: `Issue successfully submitted`,
          detail: '',
          life: 3000,
        });
      },
      error: (e) => {
        this.feedback_form_loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Something went wrong while submitting Issue !',
          detail: '',
        });
      },
    });
  }

  closeFeedback(feedback: Feedback) {
    this.passFeedbacks = [];
    this.passFeedbacks.push(feedback);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete selected feedback?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contactService.deleteFeedbacks(this.passFeedbacks).subscribe({
          next: (response) => {
            this.feedbacks = this.feedbacks.filter(
              (val) => val.id !== feedback.id
            );
            this.feedback = new Feedback();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Feedback deleted',
              life: 3000,
            });
            this.feedback_loading = false;
          },
          error: (error: HttpErrorResponse) => {
            this.feedback_loading = false;
            this.messageService.add({
              severity: 'error',
              summary:
                error.status == 401
                  ? 'You are not permitted to perform this action!'
                  : 'Something went wrong while deleting feedback!',
              detail: '',
            });
          },
        });
      },
    });
  }

  closeSelectedFeedbacks() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete selected feedbacks?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contactService.deleteFeedbacks(this.selectedFeedbacks).subscribe({
          next: (response) => {
            this.feedbacks = this.feedbacks.filter(
              (val) => !this.selectedFeedbacks.includes(val)
            );
            this.selectedFeedbacks = [];

            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Feedbacks Deleted',
              life: 3000,
            });
            this.feedback_loading = false;
          },
          error: (error: HttpErrorResponse) => {
            this.feedback_loading = false;
            this.messageService.add({
              severity: 'error',
              summary:
                error.status == 401
                  ? 'You are not permitted to perform this action!'
                  : 'Something went wrong while deleting feedbacks!',
              detail: '',
            });
          },
        });
      },
    });
  }
}
