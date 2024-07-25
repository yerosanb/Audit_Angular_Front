import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'app/services/shared/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isLoggedIn = false;
  private roles: string[] = [];
  admin = false;
  contentLoaded = false;

  constructor(private storageService: StorageService, public _router: Router) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 4000);

    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.admin = this.roles.includes('ROLE_ADMIN');
    }
  }

}
