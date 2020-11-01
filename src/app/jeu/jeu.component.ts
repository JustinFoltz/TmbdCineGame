/**
 * @author Justin Foltz <justin.foltz@gmail.com>
 * Date 12.2018
 */


import { Component, OnInit } from '@angular/core';
import { JeuService } from '../jeu.service';
import { Film } from '../Film';
import {ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css']
})

export class JeuComponent implements OnInit {

  mode: string = '4';
  startYear: string = ""
  endYear: string = "";
  genreId: string = "";
  country: string = "";
  
  films: Film[] = new Array<Film>();
  film: Film = new Film("", "", "");
  clues: string[][] = new Array<Array<string>>();
  cluesHeader: string[] = new Array<string>();
  nbClues: number[] = new Array<number>(1, 1, 1, 1);
  end: boolean = false;
  userExit: boolean = false;
  
  question: number = 1;
  qestionMax: number = 10;
  score: number = 0;
  points: number = 5 ;
  maxPoints: number = this.points*this.qestionMax;
  continue: number = 3;
  inputResponse: string ="";
  isAnswer: boolean = false;
  answer: boolean = false;

  constructor( private jeuService: JeuService, private route: ActivatedRoute ) {}

  ngOnInit() { this.selectFilms(); }

  //Get and manage JeuService informations
  selectFilms(): void { 
    new Promise( (resolve, reject) => {this.route.params.subscribe(params => {resolve(params);})}).then (value => {
      this.mode = value["mode"];
      this.startYear = value["startYear"];
      this.endYear = value["endYear"];
      this.genreId = value["genreId"];
      this.country = value["country"];
      this.jeuService.getMaxPage(this.startYear, this.endYear, this.genreId, this.country).then ( maxPage => {
        this.jeuService.getFilms(maxPage, this.startYear, this.endYear, this.genreId, this.country).then( value => {
          let filmsWithResume: Film[] = value.filter(element => element.resume !== "");
          console.log(filmsWithResume);
          let max = filmsWithResume.length - 1;
          this.film = filmsWithResume[ Math.floor(Math.random() * max) + 0 ];
          this.films = value.filter( element => element.title !== this.film.title);
          this.films = this.getSomeFilms(+this.mode-1, this.films);
          this.films.push(this.film);
          this.films = this.randomizeFilms(this.films); 
          this.jeuService.getFilmDetails(this.film.id).then( details => {
            this.film.setDetails(details);
            this.jeuService.getFilmStaff(this.film.id).then( staff => {
              this.film.setStaff(staff);
              this.clues = this.getRandomHints();
              this.extractCluesHeaders();
            });
          });
        });
      });
    });
  }

  //Display a clue on template
  loadClues() {
    if(this.nbClues.length>0) this.nbClues.pop();
    this.points -= 1;
  }

  //Check and process user response
  checkResponse(selectedFilm?: string) {
    if(!selectedFilm) {
      selectedFilm = this.inputResponse;
      this.inputResponse ="" 
    }
    this.answer = this.isValideReponse(selectedFilm);
    if( this.answer  ) { this.score += this.points; }
    else { this.continue -= 1; }
    this.isAnswer = true;
    this.question += 1;
  }

  //Init parameters and reload a question or ends the game
  returnToGAme() {
    this.isAnswer = false;
    if(this.continue > 0 && this.question <= this.qestionMax) {  
      this.points = 5;
      this.nbClues = new Array<number>(1, 1, 1, 1);
      this.cluesHeader = new Array<string>();
      this.selectFilms();
      this.answer = false;
    } else { this.end = true; }
  }

  //Check if selectedFilm is the good answer
  isValideReponse( selectedFilm: string): boolean { 
    return selectedFilm === this.film.title; 
  }

  //Randomize rows of films array
  randomizeFilms(films: Film[]): Film[] {
    return this.getSomeFilms(films.length, films);
  }

  //Random get some films in an films array
  getSomeFilms(some: number, allFilms: Film[]): Film[] {
    some = Math.min(some, allFilms.length)
    let range: number[] = this.getRandomRange(0, some);
    let someFilms: Film[] = new Array<Film>(some);
    for( let i=0; i<some; i++) { someFilms[i] = allFilms[ range[i] ]; }
    return someFilms;
  } 

  //Build a random array with min (include) and max (exclude) 
  getRandomRange(min: number, max: number): number[] {
    let range: number[] = new Array<number>();
    for( let i = min; i < max; i++) { range.push(i); }
    let randomRange = new Array<number>();
    for( let i = 0; i < max-min; i++) { 
      let randomIndex = Math.floor(Math.random() * range.length);
      randomRange.push( range[ randomIndex ] );
      range.splice( randomIndex, 1 );
    }
    return randomRange;
  }

  //Picks 4 random clues among those available
  getRandomHints(): string[][] {
    let indexMax = this.film.availlableClues.length;
    let randomIndex: number[] = this.getRandomRange(0, indexMax);
    let randomHints: string[][] = new Array<Array<string>>(indexMax);
    for(let i=0; i<4; i++) { randomHints[i] = this.film.availlableClues[ randomIndex[i] ]; }
    return randomHints;     
  }

  //Delete clues' headers and store them into clueHeaders
  extractCluesHeaders(): void {
      for(let i = 0; i < this.nbClues.length; i++) {
        console.log("this.clues[i] : ", i, " : ", this.clues[i])
        this.cluesHeader.push( this.clues[i].shift() );   
      }
  }




}
