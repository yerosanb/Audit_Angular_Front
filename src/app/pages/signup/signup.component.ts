import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/admin/user';
import { BranchService } from 'app/services/admin/branch.service';
import { Branches } from 'app/models/admin/branches';
import { ValidationService } from 'app/services/shared/validation.service';
import { Region } from 'app/models/admin/region';
import { AuthService } from 'app/services/shared/auth.service';
import { Router } from '@angular/router';
import { RegionService } from 'app/services/admin/region.service';
import { JobPosition } from 'app/models/admin/job-position';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  email_status = false;
  phone_number_status = false;
  employee_id_status = false;
  real_region_status = false;
  real_branch_status = false;
  real_ho_status = false;
  real_job_position_status = false;

  employee_id_status_system = false;
  proceed = false;
  email: string;
  phone_number: string;
  employee_id: string;
  regionRadioButton: boolean = false;
  branchRadioButton: boolean = false;
  headOfficeRadioButton: boolean = false;

  selectedBranch: Branches = new Branches();
  selectedRegion: Region = new Region();
  selectedHO: Region = new Region();
  selectedJobPosition: JobPosition = {};

  allBranches: Branches[] = [];
  headOfficeData: Region[] = [];
  regions: Region[] = [];
  headOfficeFilter: Region[] = [];
  regionFilter: Region[] = [];

  errorMessage = '';
  submitted = false;
  showJobPosition = false;
  radio_button_place_validation = true;

  userFromHr: any = {};
  loading: Boolean = false;

  user = new User();

  job_positions: JobPosition[] = [];

  confrimationDialog = false;

  loadLazyTimeout: any;

  loading_dropdown = true;

  jobDropdownOptions: JobPosition[] = [];
  regionDropdownOptions: Region[] = [];
  branchDropdownOptions: Branches[] = [];
  hoDropdownOptions: Branches[] = [];

  radio_value: string;

  authenthicationOptions: any[];

  account_created = false;

  ho: Region[] = [];

  hoWorkPlaces: Branches[] = [];

  constructor(
    private branchService: BranchService,
    private regionService: RegionService,
    private validationService: ValidationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenthicationOptions = [
      { icon: 'pi pi-envelope', value: true },
      { icon: 'pi pi-phone', value: false },
    ];
    this.jobDropdownOptions = Array.from({ length: 1000 });
    this.regionDropdownOptions = Array.from({ length: 1000 });
    this.branchDropdownOptions = Array.from({ length: 1000 });
    this.hoDropdownOptions = Array.from({ length: 1000 });
    this.getBranches();
    this.getJobPositions();
    this.getRegions();
  }

  onSelectBranch(item: any) {
    if (item.name.trim() == this.userFromHr.unit.trim()) {
      this.real_branch_status = false;
    } else {
      this.real_branch_status = true;
    }
    this.user.region = {};
  }

  onBranchClear() {
    this.real_branch_status = false;
  }
  onSelectJobPosition(item: any) {
    if (item.title.trim() == this.userFromHr.position.trim()) {
      this.real_job_position_status = false;
    } else {
      this.real_job_position_status = true;
    }
  }
  onJobPositionClear() {
    this.real_job_position_status = false;
  }

  onSelectRegion(item: any) {
    // if (this.headOfficeRadioButton) {
    //   if (this.userFromHr.deptLocation == item.name) {
    //     this.real_ho_status = false;
    //   } else {
    //     this.real_ho_status = true;
    //   }
    // } else {
    if (item.name.trim() == this.userFromHr.deptLocation.trim()) {
      this.real_region_status = false;
    } else {
      this.real_region_status = true;
    }
    // }
    this.user.branch = {};
  }

  onSelectHO(item: any) {
    if (this.userFromHr.unit.trim() == item.name.trim()) {
      this.real_ho_status = false;
    } else {
      this.real_ho_status = true;
    }
    this.user.region = {};
  }

  onRegionClear() {
    this.real_region_status = false;
  }
  onHoClear() {
    this.real_ho_status = false;
  }

  getBranches(): void {
    this.branchService.getActiveBranchesList().subscribe({
      next: (data) => {
        this.allBranches = data.filter(
          (branch) => branch.region?.id != this.ho[0].id
        );
        this.hoWorkPlaces = data.filter(
          (branch) => branch.region?.id === this.ho[0].id
        );
      },
      error: (e) => console.error(e),
    });
  }

  getJobPositions(): void {
    this.validationService.getJobPositions().subscribe({
      next: (data) => {
        this.job_positions = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  getRegions() {
    this.regionService.getActiveRegions().subscribe({
      next: (data: any) => {
        this.regions = data;
        // for (const region of this.regions) {
        //   if (
        //     region.name?.includes('Head Office') ||
        //     region.name?.includes('HO')
        //   ) {
        //     this.headOfficeFilter.push(region);
        //   } else {
        //     this.regionFilter.push(region);
        //   }
        // }
        this.regionFilter = this.regions.filter(
          (region) =>
            region.name?.toLocaleLowerCase().trim() != 'ho' ||
            region.name?.toLocaleLowerCase().trim() != 'head office'
        );
        this.ho = this.regions.filter(
          (region) =>
            region.name?.toLocaleLowerCase().trim() === 'ho' ||
            region.name?.toLocaleLowerCase().trim() === 'head office'
        );
      },

      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
      },
    });
  }
  chooseRegion(data: any) {
    this.user.jobPosition = {};
    this.showJobPosition = true;
    this.regionRadioButton = true;
    this.branchRadioButton = false;
    this.headOfficeRadioButton = false;
    this.real_ho_status = false;
    this.real_branch_status = false;
    this.radio_button_place_validation = false;

    this.user.branch = {};
    this.user.region = {};
    // this.selectedHO = {};
    // this.dropdownListHO = [];
  }
  chooseHO(data: any) {
    this.user.jobPosition = {};

    this.showJobPosition = true;
    this.headOfficeRadioButton = true;
    this.regionRadioButton = false;
    this.branchRadioButton = false;
    this.real_region_status = false;
    this.real_branch_status = false;
    this.real_job_position_status = false;
    this.radio_button_place_validation = false;

    this.user.branch = {};
    this.user.region = {};
    // this.selectedRegion = {};
  }

  chooseBranch(data: any) {
    this.selectedJobPosition = {};

    this.showJobPosition = true;
    this.branchRadioButton = true;
    this.headOfficeRadioButton = false;
    this.regionRadioButton = false;
    this.real_ho_status = false;
    this.real_region_status = false;
    this.radio_button_place_validation = false;
    this.user.region = {};
  }

  onDropdownLoad(event: any, identifier: String) {
    this.loading_dropdown = true;
    if (this.loadLazyTimeout) {
      clearTimeout(this.loadLazyTimeout);
    }
    this.loadLazyTimeout = setTimeout(() => {
      const { first, last } = event;
      if (identifier == 'Job') {
        this.jobDropdownOptions = this.job_positions;
      } else if (identifier == 'Region') {
        this.regionDropdownOptions = this.regionFilter;
      } else if (identifier == 'Branch') {
        this.branchDropdownOptions = this.allBranches;
      } else if (identifier == 'HO') {
        this.hoDropdownOptions = this.hoWorkPlaces;
      }
      this.loading_dropdown = false;
    }, Math.random() * 1000 + 250);
  }

  reloadPage(): void {
    window.location.reload();
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

  checkAwashBankIdStatus(event: any) {
    this.employee_id = event.target.value;
    const pattern = /^(AB|AIB)\/(\d{1,7})\/(19|20|21)(\d{2})$/;
    const awash_id = {
      id_no: this.employee_id.match(pattern)![2],
      year:
        this.employee_id.match(pattern)![3] +
        this.employee_id.match(pattern)![4],
    };

    this.validationService.checkUserEmployeeId(awash_id).subscribe({
      next: (res: any) => {
        if (res) {
          this.userFromHr = res;
          this.employee_id_status = false;
          this.proceed = true;
        } else {
          this.employee_id_status = true;
          this.proceed = false;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
      },
    });
    this.validationService.checkEmployeeIdSystem(awash_id).subscribe({
      next: (res: any) => {
        if (res) {
          this.employee_id_status_system = true;
          this.proceed = false;
        } else {
          this.employee_id_status_system = false;
          this.proceed = true;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
      },
    });
    this.selectedBranch = {};
    this.selectedHO = {};
    this.selectedRegion = {};
    // this.dropdownListBranch = [];
    // this.dropdownListHO = [];
    // this.dropdownListRegions = [];
    this.selectedJobPosition = {};
    this.user.email = '';
  }

  openModal() {
    this.confrimationDialog = true;
  }

  hideDialog() {
    this.confrimationDialog = false;
  }

  addUser(): void {
    this.loading = true;
    this.authService.signup(this.user).subscribe({
      next: (res) => {
        this.loading = false;
        this.confrimationDialog = false;
        this.submitted = true;
        this.errorMessage = '';
        // this.messageService.add({
        //   severity: 'success',
        //   summary: `User ${this.user.first_name} ${this.user.middle_name}  ${this.user.last_name}is created successfully!`,
        //   detail: `Your password is sent to your email at ${this.user.email}. Please check on your email to proceed.`,
        // });
        if (this.user.authenthication_media) {
          this.messageService.add({
            severity: 'success',
            summary: `User account for ${this.user.first_name} ${this.user.middle_name}  ${this.user.last_name} is created successfully.`,
            detail: `Your password is sent to your email at ${this.user.email}. Please check on your email to proceed.`,
            life: 6000,
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: `User account for ${this.user.first_name} ${this.user.middle_name}  ${this.user.last_name} is created successfully.`,
            detail: `Verification code is sent to your phone number at ${this.user.phone_number}. Please check on to proceed for password ammendement.`,
            life: 6000,
          });
          setTimeout(() => {
            this.account_created = true;
          }, 4000);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.submitted = false;
        this.errorMessage = error.error.message;
        console.log(error.message);
        this.messageService.add({
          severity: 'error',
          summary: 'Something went wrong while signup!',
          detail: '',
        });
      },
    });
  }

  onDataChange() {
    this.router.navigateByUrl('/');
    this.loading = false;
  }

  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
