import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { CompiledBranchAudit } from 'app/branch_audit/model/compiled-branch-audit';
import { User } from 'app/models/admin/user';
const baseUrl = environment.backendUrl + '/branch_audit/regional_compiler/';

@Injectable({
  providedIn: 'root',
})
export class RegionalCompilerService {
  constructor(private httpClient: HttpClient) {}

  getCompiledFindings(compiler_id: any): Observable<any> {
    return this.httpClient.get<CompiledBranchAudit[]>(
      baseUrl + 'compiled/' + `${compiler_id}`
    );
  }

  getSubmittedCompiledFindings(user: User): Observable<any> {
    return this.httpClient.post(baseUrl + 'progress', user);
  }

  compileFindings(audit: CompiledBranchAudit): Observable<any> {
    return this.httpClient.put(baseUrl + 'compile', audit);
  }

  submitCompiledFindings(audit: CompiledBranchAudit): Observable<any> {
    return this.httpClient.put(baseUrl + 'submit', audit);
  }

  submitSelectedCompiledFindings(
    audit: CompiledBranchAudit[]
  ): Observable<any> {
    return this.httpClient.put(baseUrl + 'submit/selected', audit);
  }

  decompileFinding(audit: CompiledBranchAudit): Observable<any> {
    return this.httpClient.put(baseUrl + 'decompile', audit);
  }

  decompileSelectedFindings(audit: CompiledBranchAudit[]): Observable<any> {
    return this.httpClient.put(baseUrl + 'decompile/selected', audit);
  }
}
