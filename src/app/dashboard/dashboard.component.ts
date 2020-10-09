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

  //met à jour mode en focntion du choix de l'utilisateur
  setMode(mode: string) { 
    this.mode = mode; 
  }

  //met à jour startYear et endYear en focntion du choix de l'utilisateur
  setYears(rangeYears: string) {
    this.startYear = rangeYears !== "" ? rangeYears.split("-")[0] : "";
    this.endYear = rangeYears !== "" ? rangeYears.split("-")[1] : "";
  }

  //met à jour genreId en focntion du choix de l'utilisateur
  setGenre( genreId: string ) { 
    this.genreId = genreId; 
  }

  //met à jour country en focntion du choix de l'utilisateur
  setCountry(country: string) { 
    this.country = country;
   }
}
