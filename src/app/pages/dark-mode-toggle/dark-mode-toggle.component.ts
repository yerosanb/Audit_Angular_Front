import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';

import invert from './inverter.js'

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.css']
})
export class DarkModeToggleComponent {
  darkMode$ = this.darkModeService.darkMode$;
  
  isDark: boolean = window.localStorage.getItem("isDark")=="true"? true: false

  constructor(private darkModeService: DarkModeService) {}

  onToggle(): void {
    // this.darkModeService.toggle();
    this.isDark = !this.isDark
    invert()
    window.localStorage.setItem("isDark", this.isDark? "true":"false")
  }
}
