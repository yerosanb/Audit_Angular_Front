import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { StorageService } from 'app/services/shared/storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  category = ''

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storageService: StorageService,
  ) {}
  ngOnInit(): void {

    this.isLoggedIn = this.storageService.isLoggedIn();
    this.document.body.classList.toggle('toggle-sidebar');

    if (this.isLoggedIn) {
      this.category = this.storageService.getUser().category;
    }
  }
}
