
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { CompiledRegionalAudit } from '../model/compiled-regional-audit';
const baseUrl = environment.backendUrl + '/branch_audit/division_compiler/';

@Injectable({
  providedIn: 'root',
})
export class DivisionCompilerForCompilingService {
  constructor(private httpClient: HttpClient) {}

  getCompiledFindings(compiler_id: any): Observable<any> {
    return this.httpClient.get<CompiledRegionalAudit[]>(
      baseUrl + 'compiled/' + `${compiler_id}`
    );
  }

  getSubmittedCompiledFindings(compiler_id: any): Observable<any> {
    return this.httpClient.get<CompiledRegionalAudit[]>(
      baseUrl + 'progress/' + `${compiler_id}`
    );
  }

  compileFindings(audit: CompiledRegionalAudit): Observable<any> {
    return this.httpClient.put(baseUrl + 'compile', audit);
  }

  submitCompiledFindings(audit: CompiledRegionalAudit): Observable<any> {
    return this.httpClient.put(baseUrl + 'submit', audit);
  }

  submitSelectedCompiledFindings(
    audit: CompiledRegionalAudit[]
  ): Observable<any> {
    return this.httpClient.put(baseUrl + 'submit/selected', audit);
  }

  decompileFinding(audit: CompiledRegionalAudit): Observable<any> {
    return this.httpClient.put(baseUrl + 'decompile', audit);
  }

  decompileSelectedFindings(audit: CompiledRegionalAudit[]): Observable<any> {
    return this.httpClient.put(baseUrl + 'decompile/selected', audit);
  }

}
