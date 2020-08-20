import { Component, OnInit } from '@angular/core';

declare function customInitFunctions() : any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  year = new Date().getFullYear();
  
  constructor() { }

  ngOnInit(): void {
    customInitFunctions();
  }

}
