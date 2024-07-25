import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'app/services/shared/storage.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isLoggedIn = false;
  contentLoaded = false;
  category = "";
  constructor(private storageService: StorageService, public _router: Router) {}
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.category = user.category;
    }
  }
}
