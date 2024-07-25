import { Component } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { StorageService } from 'app/services/shared/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'app/models/admin/user';
import { RecommendationService } from 'app/services/approver/recommendation.service';
import { Recommendation } from 'app/services/approver/recommendation';

@Component({
  selector: 'app-manage-recommendation',
  templateUrl: './manage-recommendation.component.html',
  styleUrls: ['./manage-recommendation.component.css'],
})
export class ManageRecommendationComponent {
  recomendation: Recommendation = new Recommendation();
  recomendations: Recommendation[] = [];
  user: User = new User();

  selectedRecomendations: Recommendation[] = [];

  recommendationEditDialog = false;

  outputRecommendation: any[] = [];
  isEditData = false;

  loading = true;

  constructor(
    private messageService: MessageService,
    private recommendationService: RecommendationService,
    private storageService: StorageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    const user_id = this.storageService.getUser().id;
    this.getCommonRecommendation(user_id);
  }

  onDataChange(data: any) {
    if (data[1]) {
      let user_id = this.storageService.getUser().id;
      this.getCommonRecommendation(user_id);
      this.recomendations = [...this.recomendations];
      this.recommendationEditDialog = false;
      this.recomendation = new Recommendation();
    } else {
      this.recomendations[this.findIndexById(data[0].id)] = data[0];
    }
    this.recommendationEditDialog = false;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.recomendations.length; i++) {
      if (this.recomendations[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  openNew() {
    this.outputRecommendation = [];
    this.recomendation = new Recommendation();
    this.isEditData = true;
    this.outputRecommendation.push(this.recomendation);
    this.outputRecommendation.push(this.isEditData);
    this.recommendationEditDialog = true;
  }

  editRecommendation(recommendation: Recommendation) {
    this.outputRecommendation = [];
    this.recomendation = { ...recommendation };
    this.isEditData = false;
    this.outputRecommendation.push(this.recomendation);
    this.outputRecommendation.push(this.isEditData);
    this.recommendationEditDialog = true;
  }

  deleteSelectedRecommendations() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected recommendations?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.recommendationService
          .deleteRecommendations(this.selectedRecomendations)
          .subscribe({
            next: (response) => {
              this.recomendations = this.recomendations.filter(
                (val) => !this.selectedRecomendations.includes(val)
              );
              this.selectedRecomendations = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Recommendations Deleted',
                life: 3000,
              });
            },
            error: (error: HttpErrorResponse) => {
              this.messageService.add({
                severity: 'error',
                summary:
                  error.status == 401
                    ? 'You are not permitted to perform this action!'
                    : 'Something went wrong while deleting selected recommendations!',
                detail: '',
              });
            },
          });
      },
    });
  }

  deleteRecommendation(recommendation: Recommendation) {
    this.user.id = this.storageService.getUser().id;
    recommendation.user = this.user;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected recommendation?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.recommendationService
          .deleteRecommendation(recommendation.id)
          .subscribe({
            next: (response) => {
              this.recomendations = this.recomendations.filter(
                (val) => val.id !== recommendation.id
              );
              this.recomendation = new Recommendation();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Recommendation Deleted',
                life: 3000,
              });
            },
            error: (error: HttpErrorResponse) => {
              this.messageService.add({
                severity: 'error',
                summary:
                  error.status == 401
                    ? 'You are not permitted to perform this action!'
                    : 'Something went wrong while deleting common Recommendation!',
                detail: '',
              });
            },
          });
      },
    });
  }

  getCommonRecommendation(id: any): void {
    this.recommendationService.getRecommondation(id).subscribe({
      next: (response) => {
        this.loading = false;
        this.recomendations = response;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while retriving common finding!',
          detail: '',
        });
      },
    });
  }
}
