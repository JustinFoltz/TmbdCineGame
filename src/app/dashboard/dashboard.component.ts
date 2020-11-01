/**
 * @author Justin Foltz <justin.foltz@gmail.com>
 * Date 12.2018
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mode: string = '4';
  startYear: string = "";
  endYear: string = "";
  genreId: string = "";
  country: string = "";

  constructor() { }

  ngOnInit() { }

  setMode(mode: string) { 
    this.mode = mode; 
  }

  setYears(rangeYears: string) {
    this.startYear = rangeYears !== "" ? rangeYears.split("-")[0] : "";
    this.endYear = rangeYears !== "" ? rangeYears.split("-")[1] : "";
  }

  setGenre( genreId: string ) { 
    this.genreId = genreId; 
  }

  setCountry(country: string) { 
    this.country = country;
   }
}
