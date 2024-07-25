
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

  constructor() { }

  year:number;

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

  scrollTop()
  {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
});

  }
}
