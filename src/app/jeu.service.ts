/**
 * @author Justin Foltz <justin.foltz@gmail.com>
 * Date 12.2018
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from './Film';


@Injectable({
  providedIn: 'root'
})
export class JeuService {
  private URL: string = "https://api.themoviedb.org/3/"
  private LANGUAGE: string= "&language=en-EN";
  private APIKEY: string = "your api key";
  private KEY: string = "&api_key=" + this.APIKEY;

  constructor( private http: HttpClient ) { }

  //Build request url depending on parameters
  constructPersonalizedRequest( baseUrl: string, startYear: string, endYear: string , genreId: string, country: string ): string {
    return  baseUrl 
            + "&release_date.gte=" + startYear
            + "&release_date.lte=" + endYear
            + "&with_genres=" + genreId 
            + "&with_original_language=" + country; 
  }

  //Return the number max of pages of request
  getMaxPage(startYear: string, endYear: string, genreId: string, country: string): Promise<number> {
    let baseRequest: string = "discover/movie?&include_adult=false&page=1";
    let request = this.constructPersonalizedRequest(baseRequest, startYear, endYear, genreId, country);
    return new Promise( (resolve, reject) => {
      this.http.get(this.URL + request + this.LANGUAGE + this.KEY).subscribe(films => {
        resolve( films["total_pages"] ); 
      });
    });

  }

  //Return a list of films in a random page 
  getFilms(maxPage: number, startYear: string, endYear: string, genreId: string, country: string): Promise<Film[]> {
    let baseRequest: string = "discover/movie?&include_adult=false";
    let request = this.constructPersonalizedRequest(baseRequest, startYear, endYear, genreId, country);
    return new Promise( (resolve, reject) => {
      maxPage = Math.min( maxPage, 1000);
      let randomPage = Math.floor(Math.random() * maxPage) + 1;
      let page = "&page=" + randomPage;
      this.http.get(this.URL + request + this.LANGUAGE + this.KEY + page).subscribe( element => {
        let isOverview  = false;
        element["results"].forEach( subElement => { if( subElement["overview"] !== "" ) isOverview = true; })
        if (isOverview) {
          let arrFilms = new Array<Film>();
          element["results"].forEach( element => arrFilms.push( new Film(element.id, element.title, element.overview ) ) );
          resolve(arrFilms); 
        } else { this.getFilms(maxPage, startYear, endYear, genreId, country).then(value => resolve(value)) }
      });
    })
  }
 
  //Get context data of a film by ID
  getFilmDetails(idFilm: string): Promise<string[][]> {
    console.log("idFilm", idFilm);
    let request: string = "movie/" + idFilm + "?";
    return new Promise( (resolve, reject) => {
      let data: Observable<any> = this.http.get(this.URL + request + this.LANGUAGE + this.KEY);
      let details: string[][];
      data.subscribe(filmDetails => {
        let arrGenres: string[] = new Array<string>();
        filmDetails.genres.forEach( genre => { arrGenres.push(genre.id) } );
        let arrCompanies: string[] = new Array<string>();
        filmDetails.production_companies.forEach( companie => { arrCompanies.push(companie.name) } );
        let arrCountries: string[] = new Array<string>();
        filmDetails.production_countries.forEach( country => { arrCountries.push(country.name) } );
        let tagline: string[] = [filmDetails.tagline];
        let budget: string[] = [filmDetails.budget];
        let revenue: string[] = [filmDetails.revenue];
        let release_date: string[] = [filmDetails.release_date];
        console.log( filmDetails.poster_path );
        let poster: string[] = [filmDetails.poster_path];

        details = new Array<string[]>(arrGenres, arrCompanies, arrCountries, tagline, budget, revenue, release_date, poster);
        resolve(details); 
      });      
    });
  }

  //Get casting data of a film by ID
  getFilmStaff(idFilm: string): Promise<string[][]> {
    let request: string = "movie/" + idFilm + "/credits?";
    return new Promise( (resolve, reject) => {
      let data: Observable<any> = this.http.get(this.URL + request + this.LANGUAGE + this.KEY);
      let staff: string[][];
      data.subscribe(filmStaff => {
        let actors: string[] = new Array<string>();
        filmStaff.cast.forEach( actor => { actors.push(actor.name )});
        let directing = filmStaff.crew.filter(staff => staff.department === "Directing");
        let directors: string[] = new Array<string>();
        directing.filter( director => directors.push(director.name))
        let production = filmStaff.crew.filter(staff => staff.department === "Production");
        let productors: string[] = new Array<string>();
        production.filter( productor => productors.push(productor.name))
        let sound = filmStaff.crew.filter(staff => staff.department === "Sound");
        let sounders: string[] = new Array<string>();
        sound.filter( sounder => sounders.push(sounder.name))
        staff = new Array<Array<string>>( actors, directors, productors, sounders);
        resolve(staff); 
      });      
    });
  }

}

