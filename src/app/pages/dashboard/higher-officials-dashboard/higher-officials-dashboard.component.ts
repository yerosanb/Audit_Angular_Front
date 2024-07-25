import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-higher-officials-dashboard',
  templateUrl: './higher-officials-dashboard.component.html',
  styleUrls: ['./higher-officials-dashboard.component.css'],
})
export class HigherOfficialsDashboardComponent {
  public dashboardUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'http://localhost:3000/public-dashboards/ba5c965927f2484dbc8373fe2de46028'
    );
  }
}
