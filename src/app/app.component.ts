import { Component, ElementRef } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from 'app/services/shared/auth.service';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import invert from './pages/dark-mode-toggle/inverter';
import { EventBusService } from './services/shared/event-bus.service';
import { StorageService } from './services/shared/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;
  id_login_tracker: number;
  eventBusSub?: Subscription;
  current_route?: UrlTree;
  token?: string;
  token_valid: boolean = false;
  isDark: boolean =
    window.localStorage.getItem('isDark') == 'true' ? true : false;
  constructor(
    private elementRef: ElementRef,
    public _router: Router,
    private storageService: StorageService,
    private eventBusService: EventBusService,
    private authService: AuthService,
    private primengConfig: PrimeNGConfig
  ) {}
  ngOnInit() {
    this.isDark ? invert() : null;
    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };
    this.primengConfig.filterMatchModeOptions = {
      text: [
        FilterMatchMode.STARTS_WITH,
        FilterMatchMode.CONTAINS,
        FilterMatchMode.NOT_CONTAINS,
        FilterMatchMode.ENDS_WITH,
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
      ],
      numeric: [
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
        FilterMatchMode.LESS_THAN,
        FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
        FilterMatchMode.GREATER_THAN,
        FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
      ],
      date: [
        FilterMatchMode.DATE_IS,
        FilterMatchMode.DATE_IS_NOT,
        FilterMatchMode.DATE_BEFORE,
        FilterMatchMode.DATE_AFTER,
      ],
    };

    /** spinner ends after 5 seconds */

    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';
    this.elementRef.nativeElement.appendChild(s);

    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.id_login_tracker = user.id_login_tracker;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
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
    // this.reloadPageAndRedirect('http://localhost:8082/afrfms');
    this.reloadPageAndRedirect('https://afrfms..com/afrfms');
  }

  private handleLogoutError(err: any): void {
    console.error(err);
    // Handle logout error gracefully if needed
  }

  private reloadPageAndRedirect(redirectUrl: string): void {
    window.location.reload();
    window.location.href = redirectUrl;
  }
}
