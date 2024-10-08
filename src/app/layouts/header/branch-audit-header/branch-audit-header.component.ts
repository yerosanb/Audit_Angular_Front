import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/shared/auth.service';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-branch-audit-header',
  templateUrl: './branch-audit-header.component.html',
  styleUrls: ['./branch-audit-header.component.scss'],
})
export class BranchAuditHeaderComponent {
  isLoggedIn = false;
  private roles: string[] = [];
  approver = false;
  reviewer = false;
  branch_manager = false;
  division_compiler = false;
  auditor = false;
  regional_d = false;

  id_login_tracker?: number;

  username?: string;

  index = 0;

  admin_notification: any[] = [];

  environment = environment;
  photoUrl: String;

  items: MenuItem[];
  auditor_items: MenuItem[];
  regional_compiler_items: MenuItem[];
  division_compiler_items: MenuItem[];
  regional_director_items: MenuItem[];
  approver_items: MenuItem[];
  bm_items: MenuItem[];

  displayedItems: MenuItem[];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.sidebarToggle();
    this.regional_compiler_items = [
      // {
      //   label: 'Compiled',
      //   // icon: 'pi pi-fw pi-file',
      //   items: [
      //     {
      //       label: 'Discrepancies',
      //       icon: 'pi pi-fw pi-th-large',
      //       items: [
      //         {
      //           label: 'Compiled',
      //           icon: 'pi pi-fw pi-table',
      //           routerLink: 'app-regional-compiled-findings-pending',
      //         },
      //         {
      //           separator: true,
      //         },
      //         {
      //           label: 'Progress',
      //           icon: 'pi pi-fw pi-spin pi-spinner',
      //           routerLink: 'regional-compiled-audits-progress',
      //         },
      //         {
      //           separator: true,
      //         },

      //         {
      //           label: 'Unseen Remarks',
      //           icon: 'pi pi-fw pi-envelope',
      //           routerLink: 'app-remark-notification-branch',
      //         },
      //       ],
      //     },

      //   ],
      // },

      {
        label: 'Financial Audit Findings',
        // icon: 'pi pi-fw pi-file-word',
        items: [
          {
            label: 'Account opened with incomplete Document',
            icon: 'pi pi-fw pi-id-card',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'incomplete-account-pending-branch',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'incomplete-account-reviewed-branch',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Transaction related findings',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'operational-discrepancy-pending-region',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'operational-discrepancy-reviewed-region',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Dormant/Inactive Account',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'dormant-pending',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'dormant-reviewed',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'General Observation and Comment',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'general-observation-pending-branch',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'general-observation-reviewed-branch',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Back log status',
            icon: 'pi pi-fw pi-history',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'statusofaudit_pending_reviewer',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'statusofaudit_reviewed_reviewer',
              },
            ],
          },
        ],
      },
      {
        label: 'Cash related discrepancies',
        // icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: 'Cash Count',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'cash_count_pending_reviewer',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'cash_count_reviewed_reviewer',
              },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Cash Excess or Shortage',
            icon: 'pi pi-fw pi-sort-amount-down-alt',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'cash-performance-pending-reviewer-branch',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'cash-performance-reviewed-reviewer-branch',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Cash Management Branch',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'cash-management-pending-branch',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'cash-management-passed',
              },
            ],
          },
        ],
      },
      {
        label: 'Books of Accounts',
        // icon: 'pi pi-fw pi-credit-card',
        items: [
          {
            label: 'Negotiable Instrument',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'negotiable_instrument_pending_for_review',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'negotiable_instrument_reviewed',
              },
            ],
          },

          {
            separator: true,
          },
          {
            label: 'Long Outstanding Item',
            icon: 'pi pi-fw pi-tags',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'long_outstanding_items_pending',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'long_outstanding_items_reviewed',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Expenses-related findings',
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'controllable-expense-reviewer-pending',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'controllable-expense-reviewer-reviewed',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Asset and Liabilities',
            icon: 'pi pi-fw pi-chart-line',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'asset-liability-pending-reviewer',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'asset-liability_reviewed-reviewer',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Abnormal Balance',
            icon: 'pi pi-fw pi-circle-fill',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'abnormal-balance-pending-reviewer',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'abnormal-balance-reviewed-reviewer',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Memorandum & contingent',
            icon: 'pi pi-fw pi-chart-line',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'contigent',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'contigent-reviewed',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Suspense Account',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'suspense_account_pending_for_review',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'suspense_account_reviewed',
              },
            ],
          },
        ],
      },
      {
        label: 'Digital ing findings',
        // icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: 'ATM',
            icon: 'pi pi-fw pi-credit-card',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'atm-card-pending-reviewer',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'atm-card-reviewed-reviewer',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'POS',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                // routerLink: 'cash_count_pending_reviewer',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                // routerLink: 'cash_count_reviewed_reviewer',
              },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Agent',
            icon: 'pi pi-fw pi-sort-amount-down-alt',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                // routerLink: 'cash-performance-pending-reviewer-branch',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                // routerLink: 'cash-performance-reviewed-reviewer-branch',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'E-Branch',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                // routerLink: 'cash-management-pending-branch',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                // routerLink: 'cash-management-passed',
              },
            ],
          },
        ],
      },

      {
        label: 'Loans and Advances findings',
        // icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: 'Loan and Advance',
            icon: 'pi pi-fw pi-truck',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'loan-and-advance-pending-branch',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'loan-and-advance-reviewed-branch',
              },
            ],
          },

          {
            separator: true,
          },
        ],
      },
      {
        label: 'Report',
        icon: 'pi pi-fw pi-table',
        items: [
          {
            label: 'Financial Audit Findings',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Account Opened With Incomplete Document',
                icon: 'pi pi-fw pi-id-card',
                routerLink: 'report-account-incomplete-document',
              },
              {
                label: 'Dormant/Inactive Account',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'report-dormant-inactive-account',
              },
              {
                label: 'Transaction Findings ',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'operational',
              },
              {
                label: 'General Observation and Comment',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'generalobservation',
              },
              // {
              //   label: 'n-Back log status',
              //   icon: 'pi pi-fw pi-calendar-minus',
              //   routerLink: 'report-status-of-audit',
              // },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Books of Accounts',
            icon: 'pi pi-fw pi-credit-card',
            items: [
              {
                label: 'Abnormal Balance',
                icon: 'pi pi-fw pi-circle-fill',
                routerLink: 'report-abnormal-balance',
              },
              {
                label: 'Asset And Liabilities',
                icon: 'pi pi-fw pi-chart-line',
                routerLink: 'report-asset-liabilities',
              },
              {
                label: 'Expenses-related findings',
                icon: 'pi pi-fw pi-shopping-cart',
                routerLink: 'report-controllable-expense',
              },
              {
                label: 'Suspense Accounts',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'report-suspense-account',
              },
              {
                label: 'Memorandum & contingent accounts',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'memorandumcontingent',
              },
              {
                label: ' Negotiable Instruments',
                icon: 'pi pi-fw pi-tags',
                routerLink: 'negotiableinstrument',
              },
              {
                label: 'Long Outstanding Item',
                icon: 'pi pi-fw pi-tags',
                routerLink: 'longoutstandingitem',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Cash related discrepancies',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Cash Excess or Shortage',
                icon: 'pi pi-fw pi-sort-amount-down-alt',
                routerLink: 'report-cash-excess-shortage',
              },
              {
                label: 'Cash Management',
                icon: 'pi pi-fw pi-money-bill',
                routerLink: 'report-cash-management',
              },
              {
                label: 'Cash Count',
                icon: 'pi pi-fw pi-money-bill',
                routerLink: 'cashcount',
              },
            ],
          },
          {
            label: 'Digital Finding related findings',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'ATM',
                icon: 'pi pi-fw pi-credit-card',
                routerLink: 'report-atm-card',
              },

              {
                label: 'POS',
                icon: 'pi pi-fw pi-money-bill',
              },

              {
                label: 'Agent',
                icon: 'pi pi-fw pi-sort-amount-down-alt',
              },
              {
                label: 'E - Branch',
                icon: 'pi pi-fw pi-sort-amount-down-alt',
              },
            ],
          },

          {
            label: 'Loans and Advances related findings',
            icon: 'pi pi-fw pi-truck',
            items: [
              {
                label: 'Loan and Advance',
                icon: 'pi pi-fw pi-truck',
                routerLink: 'loanadvance',
              },
            ],
          },

          {
            separator: true,
          },
        ],
      },
    ];

    this.auditor_items = [
      // {
      //   label: 'Notification',
      //   icon: 'pi pi-fw pi-bell',
      //   items: [
      //     {
      //       label: 'Progress',
      //       icon: 'pi pi-fw pi-spin pi-spinner',
      //       routerLink: 'incomplete-account-on-progress-branch',
      //     },

      //     {
      //       separator: true,
      //     },

      //     {
      //       label: 'Unseen Remarks',
      //       icon: 'pi pi-fw pi-envelope',
      //       routerLink: 'app-remark-notification-branch',
      //     },
      //   ],
      // },

      {
        label: 'Financial Audit Findings',
        // icon: 'pi pi-fw pi-file-word',
        items: [
          {
            label: 'Account opened with incomplete Document',
            icon: 'pi pi-fw pi-id-card',

            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'incomplete-account-drafting-branch',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'incomplete-account-passed-branch',
              },

              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'incomplete-account-on-progress-branch',
              // },
            ],
          },

          {
            label: 'Dormant/Inactive Account ',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'dormant-drafting-branch',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'dormant-passed-branch',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Transaction related findings',
            icon: 'pi pi-fw pi-tag',
            items: [
              // label: 'Finding Management',
              // icon: 'pi pi-fw pi-spin pi-cog',
              // items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'operational_descripancy_drafted',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'operational_descripancy_passed',
              },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'operational_descripancy_progress',
              // },
              // ],
            ],
          },

          {
            separator: true,
          },

          {
            label: 'General Observation and Comment',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'general-observation-draft-branch',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'general-observation-passed-branch',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Back log status',
            icon: 'pi pi-fw pi-history',

            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'statusofaudit_drafting',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'statusofaudit_passed',
              },
            ],
          },
        ],
      },

      {
        label: 'Books of Accounts',
        // icon: 'pi pi-fw pi-credit-card',
        items: [
          {
            label: 'Negotiable Instrument',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'negotiable_instrument_drafted',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'negotiable_instrument_passed',
              },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-bookmark',
              //   routerLink: 'negotiable_instrument_onprogress',
              // },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Long Outstanding Item',
            icon: 'pi pi-fw pi-tags',
            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'long_outstanding_items_draft',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'long_outstanding_items_passed',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Asset and Liabilities',
            icon: 'pi pi-fw pi-chart-line',
            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'asset-liability-drafting',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'asset-liability-passed',
              },

              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'asset-liability-progress',
              // },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Abnormal Balance',
            icon: 'pi pi-fw pi-circle-fill',
            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'abnormal-balance-drafting',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'abnormal-balance-passed',
              },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'abnormal-balance-progress',
              // },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Memorandum & contingent ',
            icon: 'pi pi-fw pi-chart-line',
            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'memorandum-contigent-drafting-branch',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'memorandum-contigent-passed-branch',
              },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-arrow-circle-right',
              //   routerLink: 'memorandum-contigent-progress-branch',
              // },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Suspense Account',
            icon: 'pi pi-fw pi-id-card',
            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'suspense_account_drafted',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'suspense_account_passed',
              },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'suspense_account_onprogress',
              // },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Expenses-related findings',
            icon: 'pi pi-fw pi-shopping-cart',

            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'controllable_expense_pending',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'controllable_expense_passed',
              },
              // {
              //   label: 'Progess',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'controllable_expense_progress',
              // },
            ],
          },
        ],
      },
      {
        label: 'Cash related discrepancies',
        // icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: 'Cash Count',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'cash-count-draft',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'cash-count-passed',
              },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Cash Excess or Shortage',
            icon: 'pi pi-fw pi-sort-amount-down-alt',
            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'cash-on-drafting-branch',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'cash-on-passed-branch',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Cash Management Branch',
            icon: 'pi pi-fw pi-money-bill',

            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'cash-management-drafting-branch',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'cash-managemenet-passed-branch',
              },
            ],
          },
        ],
      },

      {
        label: 'Digital ing findings',
        // icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: 'ATM',
            icon: 'pi pi-fw pi-credit-card',

            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'atm-card-drafting',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'atm-card-passed-finding',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'POS',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                // routerLink: 'cash_count_pending_reviewer',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                // routerLink: 'cash_count_reviewed_reviewer',
              },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Agent',
            icon: 'pi pi-fw pi-sort-amount-down-alt',
            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                // routerLink: 'cash-performance-pending-reviewer-branch',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                // routerLink: 'cash-performance-reviewed-reviewer-branch',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'E-Branch',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                // routerLink: 'cash-management-pending-branch',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                // routerLink: 'cash-management-passed',
              },
            ],
          },
        ],
      },

      {
        label: 'Loans and Advances findings',
        // icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: 'Loan and Advance',
            icon: 'pi pi-fw pi-truck',

            items: [
              {
                label: 'Drafting',
                icon: 'pi pi-fw pi-bookmark',
                routerLink: 'loan-and-advance-drafted-branch',
              },
              {
                label: 'Passed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'loan-and-advance-passed-branch',
              },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-arrow-circle-right',
              //   routerLink: 'loan-and-advance-progress-branch',
              // },
            ],
          },

          {
            separator: true,
          },
        ],
      },

      {
        label: 'Report',
        icon: 'pi pi-fw pi-table',
        items: [
          {
            label: 'Financial Audit Findings',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Account Opened With Incomplete Document',
                icon: 'pi pi-fw pi-id-card',
                routerLink: 'report-account-incomplete-document',
              },
              {
                label: 'Dormant/Inactive Account',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'report-dormant-inactive-account',
              },
              {
                label: 'Transaction Findings ',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'operational',
              },
              {
                label: 'General Observation and Comment',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'generalobservation',
              },
              // {
              //   label: 'n-Back log status',
              //   icon: 'pi pi-fw pi-calendar-minus',
              //   routerLink: 'report-status-of-audit',
              // },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Books of Accounts',
            icon: 'pi pi-fw pi-credit-card',
            items: [
              {
                label: 'Abnormal Balance',
                icon: 'pi pi-fw pi-circle-fill',
                routerLink: 'report-abnormal-balance',
              },
              {
                label: 'Asset And Liabilities',
                icon: 'pi pi-fw pi-chart-line',
                routerLink: 'report-asset-liabilities',
              },
              {
                label: 'Expenses-related findings',
                icon: 'pi pi-fw pi-shopping-cart',
                routerLink: 'report-controllable-expense',
              },
              {
                label: 'Suspense Accounts',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'report-suspense-account',
              },
              {
                label: 'Memorandum & contingent accounts',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'memorandumcontingent',
              },
              {
                label: ' Negotiable Instruments',
                icon: 'pi pi-fw pi-tags',
                routerLink: 'negotiableinstrument',
              },
              {
                label: 'Long Outstanding Item',
                icon: 'pi pi-fw pi-tags',
                routerLink: 'longoutstandingitem',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Cash related discrepancies',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Cash Excess or Shortage',
                icon: 'pi pi-fw pi-sort-amount-down-alt',
                routerLink: 'report-cash-excess-shortage',
              },
              {
                label: 'Cash Management',
                icon: 'pi pi-fw pi-money-bill',
                routerLink: 'report-cash-management',
              },
              {
                label: 'Cash Count',
                icon: 'pi pi-fw pi-money-bill',
                routerLink: 'cashcount',
              },
            ],
          },
          {
            label: 'Digital Finding related findings',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'ATM',
                icon: 'pi pi-fw pi-credit-card',
                routerLink: 'report-atm-card',
              },

              {
                label: 'POS',
                icon: 'pi pi-fw pi-money-bill',
              },

              {
                label: 'Agent',
                icon: 'pi pi-fw pi-sort-amount-down-alt',
              },
              {
                label: 'E - Branch',
                icon: 'pi pi-fw pi-sort-amount-down-alt',
              },
            ],
          },

          {
            label: 'Loans and Advances related findings',
            icon: 'pi pi-fw pi-truck',
            items: [
              {
                label: 'Loan and Advance',
                icon: 'pi pi-fw pi-truck',
                routerLink: 'loanadvance',
              },
            ],
          },

          {
            separator: true,
          },
        ],
      },
    ];

    this.division_compiler_items = [
      // {
      //   label: 'Compiled',
      //   icon: 'pi pi-fw pi-file',
      //   items: [
      //     {
      //       label: 'Discrepancies',
      //       icon: 'pi pi-fw pi-cog',
      //       items: [
      //         {
      //           label: 'Compiled',
      //           icon: 'pi pi-fw pi-file',
      //           routerLink: 'compiled-audits-division',
      //         },
      //         {
      //           separator: true,
      //         },
      //         {
      //           label: 'Progress',
      //           icon: 'pi pi-fw pi-spin pi-spinner',
      //           routerLink: 'compiled-audits-progress-division',
      //         },
      //         {
      //           separator: true,
      //         },

      //         {
      //           label: 'Unseen Remarks',
      //           icon: 'pi pi-fw pi-envelope',
      //           routerLink: 'app-remark-notification-branch',
      //         },
      //       ],
      //     },
      //   ],
      // },

      {
        label: 'Financial Audit Findings',
        // icon: 'pi pi-fw pi-file-word',
        items: [
          {
            label: 'Account opened with incomplete Document',
            icon: 'pi pi-fw pi-id-card',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'incomplete-account-pending-division-branch',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'incomplete-account-reviewed-division-branch',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Transaction related findings',
            icon: 'pi pi-fw pi-folder',
            items: [
              {
                label: 'Manage Common Findings',
                icon: 'pi pi-fw pi-spin pi-cog',
                items: [
                  {
                    label: 'Manage Findings',
                    icon: 'pi pi-fw pi-cog',
                    routerLink: 'operational_descripancy_category',
                  },
                ],
              },

              {
                separator: true,
              },

              {
                label: 'Findings Management',
                icon: 'pi pi-fw pi-spin pi-cog',
                items: [
                  {
                    label: 'Pending',
                    icon: 'pi pi-fw pi-spin pi-spinner',
                    routerLink: 'app-operational-discrepancy-pending-division',
                  },
                  {
                    label: 'Reviewed',
                    icon: 'pi pi-fw pi-check-circle',
                    routerLink: 'app-operational-discrepancy-reviewed-division',
                  },
                ],
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Dormant/Inactive Account ',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'app-compiled-dormant-inactive-division',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink:
                  'app-compiled-dormant-inactive-account-reviewed-division',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'General Observation and Comment',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'compiled-general-observation-division-pending',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'compiled-general-observation-division-reviewed',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Back log status',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'compiled-status-audit-division-pending',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'compiled-status-audit-division-reviewed',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Common Finding',
            icon: 'pi pi-folder-open',
            items: [
              // {
              //   label: 'Add',
              //   icon: 'pi pi-fw pi-bookmark',
              //   routerLink: 'common-finding',
              // },
              {
                label: 'Manage',
                icon: 'pi pi-wrench',
                routerLink: 'manage-common-finding',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Common Recommendation',
            icon: 'pi pi-folder-open',
            items: [
              // {
              //   label: 'Add',
              //   icon: 'pi pi-fw pi-bookmark',
              //   routerLink: 'recommendation',
              // },
              {
                label: 'Manage',
                icon: 'pi pi-wrench',
                routerLink: 'Manage-recommendation',
              },
            ],
          },
        ],
      },
      {
        label: 'Cash related discrepancies',
        // icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: 'Cash Count',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'app-compiled-cash-count-division',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-arrow-circle-right',
                routerLink: 'cash-count-reviewed-division-branch',
              },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Cash Excess or Shortage',
            icon: 'pi pi-fw pi-sort-amount-down-alt',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'app-compiled-cash-performance-division',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-send',
                routerLink: 'app-compiled-cash-performance-reviewed-division',
              },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Cash Management',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'compiled-cash-management-division-pending',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-send',
                routerLink: 'compiled-cash-management-division-reviewed',
              },
            ],
          },
        ],
      },

      {
        label: 'Books of Accounts',
        // icon: 'pi pi-fw pi-credit-card',
        items: [
          {
            label: 'Negotiable Instrument',
            icon: 'pi pi-fw pi-folder',
            items: [
              {
                label: 'Common Stock Items',
                icon: 'pi pi-fw pi-cog',
                items: [
                  {
                    label: 'Manage Stock Items',
                    icon: 'pi pi-fw pi-spin pi-cog',
                    routerLink: 'negotiable_stock_item',
                  },
                ],
              },

              {
                separator: true,
              },

              {
                label: 'Findings Management',
                icon: 'pi pi-fw pi-spin pi-cog',
                items: [
                  {
                    label: 'Pending',
                    icon: 'pi pi-fw pi-spin pi-spinner',
                    routerLink:
                      'app-compiled-negotiable-instrument-division-pending',
                  },
                  {
                    label: 'Reviewed',
                    icon: 'pi pi-fw pi-check-circle',
                    routerLink:
                      'app-compiled-negotiable-instrument-division-reviewed',
                  },
                ],
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Long Outstanding Item',
            icon: 'pi pi-fw pi-tags',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'compiled-long-outstanding-division-pending',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'compiled-long-outstanding-division-reviewed',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Expenses-related findings',
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
              {
                label: 'Manage Expenses-related findings',
                icon: 'pi pi-fw pi-spin pi-cog',
                items: [
                  {
                    label: 'Manage Expenses-related findings',
                    icon: 'pi pi-fw pi-cog',
                    routerLink: 'controllable_expense_type',
                  },
                ],
              },

              {
                separator: true,
              },

              {
                label: 'Findings Management',
                icon: 'pi pi-fw pi-spin pi-cog',
                items: [
                  {
                    label: 'Pending',
                    icon: 'pi pi-fw pi-spin pi-spinner',
                    routerLink:
                      'compiled-controllable-expense-division-pending',
                  },
                  {
                    label: 'Reviewed',
                    icon: 'pi pi-fw pi-check-circle',
                    routerLink:
                      'compiled-controllable-expense-division-reviewed',
                  },
                ],
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Suspense Account',
            icon: 'pi pi-fw pi-folder',
            items: [
              {
                label: 'Common Suspense Accounts',
                icon: 'pi pi-fw pi-cog',
                items: [
                  {
                    label: 'Manage Suspense Account Type',
                    icon: 'pi pi-fw pi-spin pi-cog',
                    routerLink: 'suspense_account_type',
                  },
                ],
              },

              {
                separator: true,
              },

              {
                label: 'Findings Management',
                icon: 'pi pi-fw pi-spin pi-cog',
                items: [
                  {
                    label: 'Pending',
                    icon: 'pi pi-fw pi-spin pi-spinner',
                    routerLink:
                      'app-compiled-suspense-account-division-pending',
                  },
                  {
                    label: 'Reviewed',
                    icon: 'pi pi-fw pi-check-circle',
                    routerLink:
                      'app-compiled-suspense-account-division-reviewed',
                  },
                ],
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Asset and Liabilities',
            icon: 'pi pi-fw pi-chart-line',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'app-compiled-asset-liability-division',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'app-compiled-asset-liability-reviewed-division',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Abnormal Balance',
            icon: 'pi pi-fw pi-folder',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'app-compiled-abnormal-balance-division',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'app-compiled-abnormal-balance-reviewed-divisio',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Memorandum & contingent ',
            icon: 'pi pi-fw pi-folder',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink:
                  'app-compiled-memorandum-contigent-division-pending',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink:
                  'app-compiled-memorandum-contigent-division-reviewed',
              },
            ],
          },
        ],
      },

      {
        label: 'Digital ing findings',
        // icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: 'ATM',
            icon: 'pi pi-fw pi-credit-card',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'compiled-atm-card-division-branch',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'compiled-atm-card-reviewed-division-branch',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'POS',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                // routerLink: 'cash_count_pending_reviewer',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                // routerLink: 'cash_count_reviewed_reviewer',
              },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Agent',
            icon: 'pi pi-fw pi-sort-amount-down-alt',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                // routerLink: 'cash-performance-pending-reviewer-branch',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                // routerLink: 'cash-performance-reviewed-reviewer-branch',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'E-Branch',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                // routerLink: 'cash-management-pending-branch',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                // routerLink: 'cash-management-passed',
              },
            ],
          },
        ],
      },

      {
        label: 'Loans and Advances findings',
        // icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: 'Loan and Advance',
            icon: 'pi pi-fw pi-truck',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'compiled-loan-advance-division-pending',
              },
              {
                label: 'Reviewed',
                icon: 'pi pi-fw pi-check-circle',
                routerLink: 'compiled-loan-advance-division-reviewed',
              },
            ],
          },

          {
            separator: true,
          },
        ],
      },

      {
        label: 'Report',
        icon: 'pi pi-fw pi-table',
        items: [
          {
            label: 'Financial Audit Findings',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Account Opened With Incomplete Document',
                icon: 'pi pi-fw pi-id-card',
                routerLink: 'report-account-incomplete-document',
              },
              {
                label: 'Dormant/Inactive Account',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'report-dormant-inactive-account',
              },
              {
                label: 'Transaction Findings ',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'operational',
              },
              {
                label: 'General Observation and Comment',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'generalobservation',
              },
              // {
              //   label: 'n-Back log status',
              //   icon: 'pi pi-fw pi-calendar-minus',
              //   routerLink: 'report-status-of-audit',
              // },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Books of Accounts',
            icon: 'pi pi-fw pi-credit-card',
            items: [
              {
                label: 'Abnormal Balance',
                icon: 'pi pi-fw pi-circle-fill',
                routerLink: 'report-abnormal-balance',
              },
              {
                label: 'Asset And Liabilities',
                icon: 'pi pi-fw pi-chart-line',
                routerLink: 'report-asset-liabilities',
              },
              {
                label: 'Expenses-related findings',
                icon: 'pi pi-fw pi-shopping-cart',
                routerLink: 'report-controllable-expense',
              },
              {
                label: 'Suspense Accounts',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'report-suspense-account',
              },
              {
                label: 'Memorandum & contingent accounts',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'memorandumcontingent',
              },
              {
                label: ' Negotiable Instruments',
                icon: 'pi pi-fw pi-tags',
                routerLink: 'negotiableinstrument',
              },
              {
                label: 'Long Outstanding Item',
                icon: 'pi pi-fw pi-tags',
                routerLink: 'longoutstandingitem',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Cash related discrepancies',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Cash Excess or Shortage',
                icon: 'pi pi-fw pi-sort-amount-down-alt',
                routerLink: 'report-cash-excess-shortage',
              },
              {
                label: 'Cash Management',
                icon: 'pi pi-fw pi-money-bill',
                routerLink: 'report-cash-management',
              },
              {
                label: 'Cash Count',
                icon: 'pi pi-fw pi-money-bill',
                routerLink: 'cashcount',
              },
            ],
          },
          {
            label: 'Digital Finding related findings',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'ATM',
                icon: 'pi pi-fw pi-credit-card',
                routerLink: 'report-atm-card',
              },

              {
                label: 'POS',
                icon: 'pi pi-fw pi-money-bill',
              },

              {
                label: 'Agent',
                icon: 'pi pi-fw pi-sort-amount-down-alt',
              },
              {
                label: 'E - Branch',
                icon: 'pi pi-fw pi-sort-amount-down-alt',
              },
            ],
          },

          {
            label: 'Loans and Advances related findings',
            icon: 'pi pi-fw pi-truck',
            items: [
              {
                label: 'Loan and Advance',
                icon: 'pi pi-fw pi-truck',
                routerLink: 'loanadvance',
              },
            ],
          },

          {
            separator: true,
          },
        ],
      },
    ];

    this.approver_items = [
      {
        label: 'Pending Audits',
        icon: 'pi pi-fw pi-spin pi-spinner',
        items: [
          {
            label: 'Pending',
            icon: 'pi pi-fw pi-spin pi-spinner',
            routerLink: 'compiled-pending-approver-branch',
          },
          // {
          //   separator: true,
          // },

          // {
          //   label: 'Unseen Remarks',
          //   icon: 'pi pi-fw pi-envelope',
          //   routerLink: 'app-remark-notification-branch',
          // },
        ],
      },

      {
        label: 'Drafted Audits',
        icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            label: 'Drafted',
            icon: 'pi pi-fw pi-bookmark',
            routerLink: 'compiled-audits-drafting-approver-branch',
          },
          // {
          //   separator: true,
          // },
          // {
          //   label: 'Progress',
          //   icon: 'pi pi-fw pi-spin pi-spinner',
          //   routerLink: 'regional-compiled-audits-progress',
          // },
        ],
      },

      {
        label: 'Approved Audits',
        icon: 'pi pi-fw pi-verified',
        items: [
          {
            label: 'Approved',
            icon: 'pi pi-fw pi-check-square',
            routerLink: 'compiled-approved-approver-branch',
          },
          // {
          //   separator: true,
          // },
          // {
          //   label: 'Progress',
          //   icon: 'pi pi-fw pi-spin pi-spinner',
          //   routerLink: 'regional-compiled-audits-progress',
          // },
        ],
      },

      {
        label: 'Report',
        icon: 'pi pi-fw pi-table',
        items: [
          {
            label: 'Financial Audit Findings',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Account Opened With Incomplete Document',
                icon: 'pi pi-fw pi-id-card',
                routerLink: 'report-account-incomplete-document',
              },
              {
                label: 'Dormant/Inactive Account',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'report-dormant-inactive-account',
              },
              {
                label: 'Transaction Findings ',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'operational',
              },
              {
                label: 'General Observation and Comment',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'generalobservation',
              },
              // {
              //   label: 'n-Back log status',
              //   icon: 'pi pi-fw pi-calendar-minus',
              //   routerLink: 'report-status-of-audit',
              // },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Books of Accounts',
            icon: 'pi pi-fw pi-credit-card',
            items: [
              {
                label: 'Abnormal Balance',
                icon: 'pi pi-fw pi-circle-fill',
                routerLink: 'report-abnormal-balance',
              },
              {
                label: 'Asset And Liabilities',
                icon: 'pi pi-fw pi-chart-line',
                routerLink: 'report-asset-liabilities',
              },
              {
                label: 'Expenses-related findings',
                icon: 'pi pi-fw pi-shopping-cart',
                routerLink: 'report-controllable-expense',
              },
              {
                label: 'Suspense Accounts',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'report-suspense-account',
              },
              {
                label: 'Memorandum & contingent accounts',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'memorandumcontingent',
              },
              {
                label: ' Negotiable Instruments',
                icon: 'pi pi-fw pi-tags',
                routerLink: 'negotiableinstrument',
              },
              {
                label: 'Long Outstanding Item',
                icon: 'pi pi-fw pi-tags',
                routerLink: 'longoutstandingitem',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Cash related discrepancies',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Cash Excess or Shortage',
                icon: 'pi pi-fw pi-sort-amount-down-alt',
                routerLink: 'report-cash-excess-shortage',
              },
              {
                label: 'Cash Management',
                icon: 'pi pi-fw pi-money-bill',
                routerLink: 'report-cash-management',
              },
              {
                label: 'Cash Count',
                icon: 'pi pi-fw pi-money-bill',
                routerLink: 'cashcount',
              },
            ],
          },
          {
            label: 'Digital Finding related findings',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'ATM',
                icon: 'pi pi-fw pi-credit-card',
                routerLink: 'report-atm-card',
              },

              {
                label: 'POS',
                icon: 'pi pi-fw pi-money-bill',
              },

              {
                label: 'Agent',
                icon: 'pi pi-fw pi-sort-amount-down-alt',
              },
              {
                label: 'E - Branch',
                icon: 'pi pi-fw pi-sort-amount-down-alt',
              },
            ],
          },

          {
            label: 'Loans and Advances related findings',
            icon: 'pi pi-fw pi-truck',
            items: [
              {
                label: 'Loan and Advance',
                icon: 'pi pi-fw pi-truck',
                routerLink: 'loanadvance',
              },
            ],
          },

          {
            separator: true,
          },
        ],
      },
    ];

    this.bm_items = [
      // {
      //   label: 'Notification',
      //   icon: 'pi pi-fw pi-bell',
      //   items: [
      //     // {
      //     //   label: 'Progress',
      //     //   icon: 'pi pi-fw pi-spin pi-spinner',
      //     //   routerLink: 'incomplete-account-on-progress-branch',
      //     // },

      //     // {
      //     //   separator: true,
      //     // },

      //     {
      //       label: 'Unseen Remarks',
      //       icon: 'pi pi-fw pi-envelope',
      //       routerLink: 'app-remark-notification-branch',
      //     },
      //   ],
      // },
      {
        label: 'Financial Audit Findings',
        // icon: 'pi pi-fw pi-file-word',
        items: [
          {
            label: 'Account opened with incomplete Document',
            icon: 'pi pi-fw pi-id-card',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'incomplete-account-branch-manager-pending',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Transaction related findings',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'operational-descripancy-pending',
              },
            ],
          },

          {
            label: 'Dormant/Inactive Account ',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'dormant_inactive_branch_manager_pending',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'General Observation and Comment',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'general_observation_branch_manager_pending',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Back log status',
            icon: 'pi pi-fw pi-history',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'status_of_audit_branch_manager_pending',
              },
            ],
          },
          {
            separator: true,
          },
        ],
      },

      {
        label: 'Books of Accounts',
        // icon: 'pi pi-fw pi-credit-card',
        items: [
          {
            label: 'Negotiable Instrument',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'negotiable_instrument_branch_manager_pending',
              },
              // {
              //   label: 'Rectified',
              //   icon: 'pi pi-fw pi-video',
              //   routerLink: 'negotiable_instrument_branch_manager_rectified',
              // },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'negotiable_instrument_branch_manager_responded',
              // },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Asset and Liabilities',
            icon: 'pi pi-fw pi-chart-line',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'asset_liability_branch_manager_pending',
              },
              // {
              //   label: 'Rectified',
              //   icon: 'pi pi-fw pi-video',
              //   routerLink: 'asset_liability_branch_manager_rectified',
              // },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'asset_liability_branch_manager_responded',
              // },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Abnormal Balance',
            icon: 'pi pi-fw pi-circle-fill',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'abnormalbalance_branch_manager_pending',
              },
              // {
              //   label: 'Rectified',
              //   icon: 'pi pi-fw pi-video',
              //   routerLink: 'abnormalbalance_branch_manager_rectified',
              // },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'abnormalbalance_branch_manager_responded',
              // },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Expenses-related findings',
            icon: 'pi pi-fw pi-shopping-cart',

            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'controllable_expense_branch_manager_pending',
              },
              // {
              //   label: 'Rectified',
              //   icon: 'pi pi-fw pi-video',
              //   routerLink: 'controllable_expense_branch_manager_rectified',
              // },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'controllable_expense_branch_manager_responded',
              // },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Suspense Account ',
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'suspense_account_branch_manager_pending',
              },
              // {
              //   label: 'Rectified',
              //   icon: 'pi pi-fw pi-video',
              //   routerLink: 'suspense_account_branch_manager_rectified',
              // },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'suspense_account_branch_manager_responded',
              // },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Long Outstanding Item',
            icon: 'pi pi-fw pi-tags',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'long_outstanding_item_branch_manager_pending',
              },
              // {
              //   label: 'Rectified',
              //   icon: 'pi pi-fw pi-video',
              //   routerLink: 'atm-card-passed-finding',
              // },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'atm-card-passed-finding',
              // },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Memorandum & contingent ',
            icon: 'pi pi-fw pi-folder',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'memorandom_contingent_branch_manager_pending',
              },
              // {
              //   label: 'Rectified',
              //   icon: 'pi pi-fw pi-video',
              //   routerLink: 'atm-card-passed-finding',
              // },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'atm-card-passed-finding',
              // },
            ],
          },
        ],
      },
      {
        label: 'Cash related discrepancies',
        // icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: 'Cash Count',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'cash_count_branch_manager_pending',
              },
              // {
              //   label: 'Rectified',
              //   icon: 'pi pi-fw pi-video',
              //   routerLink: 'cash_count_branch_manager_rectified',
              // },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'cash_count_branch_manager_responded',
              // },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Cash Performance',
            icon: 'pi pi-fw pi-sort-amount-down-alt',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'cash_performance_branch_manager_pending',
              },
              // {
              //   label: 'Rectified',
              //   icon: 'pi pi-fw pi-video',
              //   routerLink: 'cash_performance_branch_manager_rectified',
              // },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'cash_performance_branch_manager_responded',
              // },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Cash Management',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Pending',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'cash_management_branch_manager_pending',
              },
              // {
              //   label: 'Rectified',
              //   icon: 'pi pi-fw pi-video',
              //   routerLink: 'cash_management_branch_manager_rectified',
              // },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'cash_management_branch_manager_responded',
              // },
            ],
          },
        ],
      },

      {
        label: 'Digital ing findings',
        // icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: 'ATM',
            icon: 'pi pi-fw pi-credit-card',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'atm-card-branch-manager-pending',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'POS',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-bookmark',
                // routerLink: 'cash_count_pending_reviewer',
              },
              // {
              //   label: 'Passed',
              //   icon: 'pi pi-fw pi-arrow-circle-right',
              //   // routerLink: 'cash_count_reviewed_reviewer',
              // },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Agent',
            icon: 'pi pi-fw pi-sort-amount-down-alt',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-bookmark',
                // routerLink: 'cash-performance-pending-reviewer-branch',
              },
              // {
              //   label: 'Passed',
              //   icon: 'pi pi-fw pi-arrow-circle-right',
              //   // routerLink: 'cash-performance-reviewed-reviewer-branch',
              // },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'E-Branch',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-bookmark',
                // routerLink: 'cash-management-pending-branch',
              },
              // {
              //   label: 'Passed',
              //   icon: 'pi pi-fw pi-arrow-circle-right',
              //   // routerLink: 'cash-management-passed',
              // },
            ],
          },
        ],
      },

      {
        label: 'Loans and Advances findings',
        // icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: 'Loan and Advance',
            icon: 'pi pi-fw pi-truck',
            items: [
              {
                label: 'Reported',
                icon: 'pi pi-fw pi-spin pi-spinner',
                routerLink: 'loan_and_advance_branch_manager_pending',
              },
              // {
              //   label: 'Rectified',
              //   icon: 'pi pi-fw pi-video',
              //   routerLink: 'loan_and_advance_branch_manager_rectified',
              // },
              // {
              //   label: 'Progress',
              //   icon: 'pi pi-fw pi-spin pi-spinner',
              //   routerLink: 'loan_and_advance_branch_manager_responded',
              // },
            ],
          },

          {
            separator: true,
          },
        ],
      },

      {
        label: 'Report',
        icon: 'pi pi-fw pi-table',
        items: [
          {
            label: 'Financial Audit Findings',
            icon: 'pi pi-fw pi-tag',
            items: [
              {
                label: 'Account Opened With Incomplete Document',
                icon: 'pi pi-fw pi-id-card',
                routerLink: 'report-account-incomplete-document',
              },
              {
                label: 'Dormant/Inactive Account',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'report-dormant-inactive-account',
              },
              {
                label: 'Transaction Findings ',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'operational',
              },
              {
                label: 'General Observation and Comment',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'generalobservation',
              },
              // {
              //   label: 'n-Back log status',
              //   icon: 'pi pi-fw pi-calendar-minus',
              //   routerLink: 'report-status-of-audit',
              // },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Books of Accounts',
            icon: 'pi pi-fw pi-credit-card',
            items: [
              {
                label: 'Abnormal Balance',
                icon: 'pi pi-fw pi-circle-fill',
                routerLink: 'report-abnormal-balance',
              },
              {
                label: 'Asset And Liabilities',
                icon: 'pi pi-fw pi-chart-line',
                routerLink: 'report-asset-liabilities',
              },
              {
                label: 'Expenses-related findings',
                icon: 'pi pi-fw pi-shopping-cart',
                routerLink: 'report-controllable-expense',
              },
              {
                label: 'Suspense Accounts',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'report-suspense-account',
              },
              {
                label: 'Memorandum & contingent accounts',
                icon: 'pi pi-fw pi-tag',
                routerLink: 'memorandumcontingent',
              },
              {
                label: ' Negotiable Instruments',
                icon: 'pi pi-fw pi-tags',
                routerLink: 'negotiableinstrument',
              },
              {
                label: 'Long Outstanding Item',
                icon: 'pi pi-fw pi-tags',
                routerLink: 'longoutstandingitem',
              },
            ],
          },
          {
            separator: true,
          },

          {
            label: 'Cash related discrepancies',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'Cash Excess or Shortage',
                icon: 'pi pi-fw pi-sort-amount-down-alt',
                routerLink: 'report-cash-excess-shortage',
              },
              {
                label: 'Cash Management',
                icon: 'pi pi-fw pi-money-bill',
                routerLink: 'report-cash-management',
              },
              {
                label: 'Cash Count',
                icon: 'pi pi-fw pi-money-bill',
                routerLink: 'cashcount',
              },
            ],
          },
          {
            label: 'Digital Finding related findings',
            icon: 'pi pi-fw pi-money-bill',
            items: [
              {
                label: 'ATM',
                icon: 'pi pi-fw pi-credit-card',
                routerLink: 'report-atm-card',
              },

              {
                label: 'POS',
                icon: 'pi pi-fw pi-money-bill',
              },

              {
                label: 'Agent',
                icon: 'pi pi-fw pi-sort-amount-down-alt',
              },
              {
                label: 'E - Branch',
                icon: 'pi pi-fw pi-sort-amount-down-alt',
              },
            ],
          },

          {
            label: 'Loans and Advances related findings',
            icon: 'pi pi-fw pi-truck',
            items: [
              {
                label: 'Loan and Advance',
                icon: 'pi pi-fw pi-truck',
                routerLink: 'loanadvance',
              },
            ],
          },

          {
            separator: true,
          },
        ],
      },
    ];

    this.regional_director_items = [
      {
        label: 'Unseen Remarks',
        icon: 'pi pi-fw pi-envelope',
        routerLink: 'app-remark-notification-branch',
      },

      {
        label: 'Reported Findings',
        icon: 'pi pi-fw pi-bell',
        routerLink: 'regional-compiled-audits-progress',
      },

      {
        label: 'Financial Audit Findings Report',
        icon: 'pi pi-fw pi-table',
        items: [
          {
            label: 'ATMs Undelivered',
            icon: 'pi pi-fw pi-table',
            routerLink: 'report-atm-card',
          },
          {
            label: 'Account Opened With Incomplete Document',
            icon: 'pi pi-fw pi-table',
            routerLink: 'report-account-incomplete-document',
          },
          {
            label: 'Dormant/Inactive Account',
            icon: 'pi pi-fw pi-table',
            routerLink: 'report-dormant-inactive-account',
          },
          {
            label: 'Transaction related findings',
            icon: 'pi pi-fw pi-table',
            routerLink: 'operational',
          },
          {
            label: 'General Observation and Comment',
            icon: 'pi pi-fw pi-table',
            routerLink: 'generalobservation',
          },
          // {
          //   label: 'n-Back log status',
          //   icon: 'pi pi-fw pi-calendar-minus',
          //   routerLink: 'report-status-of-audit',
          // },
        ],
      },
      {
        label: 'Books of Accounts Report',
        icon: 'pi pi-fw pi-table',
        items: [
          {
            label: 'Abnormal Balance',
            icon: 'pi pi-fw pi-tags',
            routerLink: 'report-abnormal-balance',
          },
          {
            label: 'Asset And Liabilities',
            icon: 'pi pi-fw pi-tags',
            routerLink: 'report-asset-liabilities',
          },
          {
            label: 'Expenses-related findings',
            icon: 'pi pi-fw pi-tags',
            routerLink: 'report-controllable-expense',
          },
          {
            label: 'Suspense Accounts',
            icon: 'pi pi-fw pi-tags',
            routerLink: 'report-suspense-account',
          },
          {
            label: 'Memorandum & contingent accounts',
            icon: 'pi pi-fw pi-tags',
            routerLink: 'memorandumcontingent',
          },
          {
            label: ' Negotiable Instruments',
            icon: 'pi pi-fw pi-tags',
            routerLink: 'negotiableinstrument',
          },
          {
            label: 'Long Outstanding Item',
            icon: 'pi pi-fw pi-tags',
            routerLink: 'longoutstandingitem',
          },
          {
            label: 'Loan and Advance',
            icon: 'pi pi-fw pi-tags',
            routerLink: 'loanadvance',
          },
        ],
      },
      {
        label: 'Cash related discrepancies report',
        icon: 'pi pi-fw pi-table',
        items: [
          {
            label: 'Cash Excess or Shortage',
            icon: 'pi pi-fw pi-tags',
            routerLink: 'report-cash-excess-shortage',
          },
          {
            label: 'Cash Management',
            icon: 'pi pi-fw pi-tags',
            routerLink: 'report-cash-management',
          },
          {
            label: 'Cash Count',
            icon: 'pi pi-fw pi-tags',
            routerLink: 'cashcount',
          },
        ],
      },
    ];

    this.isLoggedIn = this.storageService.isLoggedIn();
    this.document.body.classList.toggle('toggle-sidebar');

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.approver = this.roles.includes('ROLE_APPROVER_BFA');
      this.reviewer = this.roles.includes('ROLE_REVIEWER_BFA');
      this.auditor = this.roles.includes('ROLE_AUDITOR_BFA');
      this.division_compiler = this.roles.includes('ROLE_COMPILER_BFA');
      this.branch_manager = this.roles.includes('ROLE_BRANCHM_BFA');

      this.regional_d = this.roles.includes('ROLE_REGIONALD_BFA');
      this.username = user.email;
      this.id_login_tracker = user.id_login_tracker;
      this.photoUrl = user.photoUrl;

      if (this.reviewer) {
        this.items = this.regional_compiler_items;
        this.displayedItems = this.items;
      } else if (this.auditor) {
        this.items = this.auditor_items;
        this.displayedItems = this.items;
      } else if (this.division_compiler) {
        this.items = this.division_compiler_items;
        this.displayedItems = this.items;
      } else if (this.branch_manager) {
        this.items = this.bm_items;
        this.displayedItems = this.items;
      } else if (this.approver) {
        this.items = this.approver_items;
        this.displayedItems = this.items;
      } else if (this.regional_d) {
        this.items = this.regional_director_items;
        this.displayedItems = this.items;
      }
    }
  }

  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logout(): void {
    this.authService.logout(this.id_login_tracker).subscribe({
      next: () => {
        this.handleLogoutSuccess();
      },
      error: (err) => {
        this.handleLogoutError(err);
      },
    });
  }

  private handleLogoutSuccess(): void {
    this.storageService.clean();
    this.redirectToLogin();
  }

  private handleLogoutError(err: any): void {
    console.error(err);
    // Handle logout error gracefully if needed
  }

  private redirectToLogin(): void {
    // this.storageService.clean();
    // window.location.reload();

    const loginUrl = 'https://afrfms..com/afrfms';
    window.location.href = loginUrl;
  }

  // Function to filter menu items based on search input
  filterMenuItems(searchInput: string, menuItems: MenuItem[]): MenuItem[] {
    const filteredItems: MenuItem[] = [];

    if (!searchInput) {
      return menuItems; // Return original items if searchInput is empty
    }

    menuItems.forEach((menuItem) => {
      const filteredSubItems: MenuItem[] = [];

      if (menuItem.label)
        if (menuItem.label.toLowerCase().includes(searchInput.toLowerCase())) {
          // Add the main menu item if it matches the search criteria
          filteredItems.push(menuItem);
        } else if (menuItem.items) {
          // Check sub-items if present
          menuItem.items.forEach((subItem) => {
            if (subItem.label)
              if (
                subItem.label.toLowerCase().includes(searchInput.toLowerCase())
              ) {
                filteredSubItems.push(subItem);
              }
          });

          // Add the main menu item with filtered sub-items
          if (filteredSubItems.length > 0) {
            const filteredMenuItem: MenuItem = {
              ...menuItem,
              items: filteredSubItems,
            };
            filteredItems.push(filteredMenuItem);
          }
        }
    });

    return filteredItems;
  }

  onSearchInputChange(searchInput: string): void {
    if (!searchInput) {
      this.displayedItems = this.items;
    } else {
      this.displayedItems = this.filterMenuItems(searchInput, this.items);
    }
  }
}
