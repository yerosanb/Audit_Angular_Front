import { Injectable } from '@angular/core';
import { BranchReport } from '../payloads/BranchReport';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { Branches } from 'app/models/admin/branches';
import { Region } from 'app/models/admin/region';
import { BranchesR } from '../payloads/branchesR';
import { DiscrepancyCategoryR } from '../payloads/discrepancyCategoryR';
import { FindingsR } from '../payloads/findingsR';
import { ReportResponse } from '../payloads/ReportResponse';
const baseUrl = environment.backendUrl + '/branch/report/';
import { StorageService } from 'app/services/shared/storage.service';
import { BranchReportAbnormalBalance } from '../payloads/Abnormal Balance/BranchReportAbnormalBalance';
import { ReportResponseAbnormalBalance } from '../payloads/Abnormal Balance/ReportResponseAbnormalBalance';
import { BranchReportIncompleteDocument } from '../payloads/Account Incomplete Document/BranchReportAccountIncompleteDocument';
import { ReportResponseIncompleteDocument } from '../payloads/Account Incomplete Document/ReportResponseAccountIncompleteDocument';
import { BranchReportControllableExpense } from '../payloads/Controllable Expense/BranchReportControllableExpense';
import { ReportResponseControllableExpense } from '../payloads/Controllable Expense/ReportResponseControllableExpense';
import { BranchReportAssetLiability } from '../payloads/Asset Liabilities/BranchReportAssetLiabilities';
import { ReportResponseAssetLiability } from '../payloads/Asset Liabilities/ReportResponseAssetLiabilities';
import { BranchReportDormantInactiveAccount } from '../payloads/Dormant Inactive Account/BranchReportDormantInactiveAccount';
import { ReportResponseDormantInactiveAccount } from '../payloads/Dormant Inactive Account/ReportResponseDormantInactiveAccount';
import { BranchReportSuspenseAccount } from '../payloads/Suspense Account/BranchReportSuspenseAccount';
import { ReportResponseSuspenseAccount } from '../payloads/Suspense Account/ReportResponseSuspenseAccount';
import { BranchReportCashExcessOrShortage } from '../payloads/Cash Excess or Shortage/BranchReportCashExcessOrShortage';
import { ReportResponseCashExcessOrShortage } from '../payloads/Cash Excess or Shortage/ReportResponseCashExcessOrShortage';

import { LoanPayload } from '../payloads/LoanAdvance/loan-payload';
import { LoanResponce } from '../payloads/LoanAdvance/loan-responce';
import { LongPayload } from '../payloads/LongOutstanding/long-payload';
import { LongResponce } from '../payloads/LongOutstanding/long-responce';
import { NegotiablePayload } from '../payloads/NegotiableInstrument/negotiable-payload';
import { NegotiableResponce } from '../payloads/NegotiableInstrument/negotiable-responce';
import { ObservationPayload } from '../payloads/ObservationComment/observation-payload';
import { ObservationResponce } from '../payloads/ObservationComment/observation-responce';
import { CashCountPayload } from '../payloads/cash-count/cash-count-payload';
import { CashCountResponce } from '../payloads/cash-count/cash-count-responce';
import { OperationalDescripency } from '../payloads/operational-descripency';
import { OperationalResponce } from '../payloads/operational-responce';
import { BranchReportCashManagement } from '../payloads/Cash Management/BranchReportCashManagement';
import { ReportResponseCashManagement } from '../payloads/Cash Management/ReportResponseCashManagement';
import { MemorandumResponce } from '../payloads/MemorandumContigent/Memorandum-responce';
import { Memorundompayload } from '../payloads/MemorandumContigent/memorundompayload';
import { BranchReportHigherOfficials } from '../payloads/Higher Officials/BranchReportHigherOfficials';

@Injectable({
  providedIn: 'root',
})
export class BranchReportService {
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  fetchHigherOfficialReport(
    branch_report: BranchReportHigherOfficials
  ): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    console.log('request: ' + JSON.stringify(branch_report, null, 5));
    return this.httpClient.post<ReportResponse>(
      baseUrl + 'fetchReportHigherOfficials',
      branch_report
    );
  }

  fetchReport(branch_report: BranchReport): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;
    console.log('request: ' + JSON.stringify(branch_report, null, 5));
    return this.httpClient.post<ReportResponse>(
      baseUrl + 'fetchReport',
      branch_report
    );
  }

  fetchReportAbnormalBalance(
    branch_report: BranchReportAbnormalBalance
  ): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;
    return this.httpClient.post<ReportResponseAbnormalBalance>(
      baseUrl + 'fetchReportAbnormalBalance',
      branch_report
    );
  }

  fetchReportIncompleteDocument(
    branch_report: BranchReportIncompleteDocument
  ): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;
    console.log('all in all: ' + JSON.stringify(branch_report, null, 4));
    return this.httpClient.post<ReportResponseIncompleteDocument>(
      baseUrl + 'fetchReportIncompleteDocument',
      branch_report
    );
  }

  fetchReportControllableExpense(
    branch_report: BranchReportControllableExpense
  ): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;
    console.log('all in all: ' + JSON.stringify(branch_report, null, 4));
    return this.httpClient.post<ReportResponseControllableExpense>(
      baseUrl + 'fetchReportControllableExpense',
      branch_report
    );
  }

  fetchReportAssetLiability(
    branch_report: BranchReportAssetLiability
  ): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;
    console.log('all in all: ' + JSON.stringify(branch_report, null, 4));
    return this.httpClient.post<ReportResponseAssetLiability>(
      baseUrl + 'fetchReportAssetLiability',
      branch_report
    );
  }

  fetchReportDormantInactiveAccount(
    branch_report: BranchReportDormantInactiveAccount
  ): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;
    console.log('all in all: ' + JSON.stringify(branch_report, null, 4));
    return this.httpClient.post<ReportResponseDormantInactiveAccount>(
      baseUrl + 'fetchReportDormantInactiveAccount',
      branch_report
    );
  }

  fetchReportSuspenseAccount(
    branch_report: BranchReportSuspenseAccount
  ): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;
    console.log('all in all: ' + JSON.stringify(branch_report, null, 4));
    return this.httpClient.post<ReportResponseSuspenseAccount>(
      baseUrl + 'fetchReportSuspenseAccount',
      branch_report
    );
  }

  //////////////////////////////////////////////////////

  fetchReportCashExcessOrShortage(
    branch_report: BranchReportCashExcessOrShortage
  ): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;
    console.log('all in all: ' + JSON.stringify(branch_report, null, 4));
    return this.httpClient.post<ReportResponseCashExcessOrShortage>(
      baseUrl + 'fetchReportCashExcessOrShortage',
      branch_report
    );
  }

  fetchReportCashManagement(
    branch_report: BranchReportCashManagement
  ): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;
    console.log('all in all: ' + JSON.stringify(branch_report, null, 4));
    return this.httpClient.post<ReportResponseCashManagement>(
      baseUrl + 'fetchReportCashManagement',
      branch_report
    );
  }

  getBranches(): Observable<BranchesR[]> {
    return this.httpClient.get<BranchesR[]>(baseUrl + 'getBranches');
  }

  getFindings(type: string): Observable<FindingsR[]> {
    return this.httpClient.post<FindingsR[]>(baseUrl + 'getFindings', type);
  }

  getDiscrepancies(): Observable<DiscrepancyCategoryR[]> {
    return this.httpClient.get<DiscrepancyCategoryR[]>(
      baseUrl + 'getDiscrepancies'
    );
  }

  getSuspenseAccountTypeOptions(): Observable<DiscrepancyCategoryR[]> {
    return this.httpClient.get<DiscrepancyCategoryR[]>(
      baseUrl + 'getSuspenseAccountTypeOptions'
    );
  }

  getControllableExpenseTypes(): Observable<DiscrepancyCategoryR[]> {
    return this.httpClient.get<DiscrepancyCategoryR[]>(
      baseUrl + 'getControllableExpenseTypes'
    );
  }

  getRegions(): Observable<Region[]> {
    return this.httpClient.get<Region[]>(baseUrl + 'getRegions');
  }

  fetchReportOperation(branch_report: OperationalDescripency): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;

    return this.httpClient.post<OperationalResponce>(
      baseUrl + 'fetchReportOperation',
      branch_report
    );
  }
  fetchReportObservation(branch_report: ObservationPayload): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;
    console.log('all in all: ' + JSON.stringify(branch_report, null, 4));
    return this.httpClient.post<ObservationResponce>(
      baseUrl + 'fetchReportObservation',
      branch_report
    );
  }

  fetchReportMemorandum(branch_report: Memorundompayload): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;

    return this.httpClient.post<MemorandumResponce>(
      baseUrl + 'fetchReportMemorandum',
      branch_report
    );
  }

  fetchReportNegotiable(branch_report: NegotiablePayload): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;
    console.log('request info: ' + JSON.stringify(branch_report, null, 4));
    return this.httpClient.post<NegotiableResponce>(
      baseUrl + 'fetchReportNegotiable',
      branch_report
    );
  }

  fetchReportLong(branch_report: LongPayload): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;

    console.log('user info: ' + JSON.stringify(branch_report, null, 4));
    return this.httpClient.post<LongResponce>(
      baseUrl + 'fetchReportLong',
      branch_report
    );
  }

  fetchReportLoanAdvance(branch_report: LoanPayload): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;

    console.log('all in all: ' + JSON.stringify(branch_report, null, 4));

    return this.httpClient.post<LoanResponce>(
      baseUrl + 'fetchReportLoanAdvance',
      branch_report
    );
  }

  fetchReportCashCount(branch_report: CashCountPayload): Observable<any> {
    let user = this.storageService.getUser();
    branch_report.user_id = user.id;
    branch_report.user_roles = user.roles;
    branch_report.user_region_id =
      user.region == null ? user.branch.id : user.region.id;

    return this.httpClient.post<CashCountResponce>(
      baseUrl + 'fetchReportCashCount',
      branch_report
    );
  }
}
