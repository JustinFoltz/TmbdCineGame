/**
 * @author Justin Foltz <justin.foltz@gmail.com>
 * Date 12.2018
 */

import { Genres } from "./Genres";
import { createOfflineCompileUrlResolver } from "@angular/compiler";
export class Film {
    id: string
    title: string;
    resume: string;
    shortResume: string;
    poster: string
    availlableClues: string[][];
    private maxItems: number = 2;

    constructor( id: string, title:string, resume: string ){
        this.id = id;
        this.title = title;
        this.resume = resume;
        this.shortResume = resume.slice(0, 300) + "...";
        this.availlableClues = new Array<Array<string>>();
    }

    //Get and manage data related to films' context provided by JeuService
    setDetails(details: string[][]){
       this.manageProperties( "Genre", new Genres().convertIds( details[0] ) );
       this.manageProperties("Compagny", details[1] );
       this.manageProperties("Country", details[2]);
       this.manageProperties( "Tag line", details[3]);
       this.manageProperties( "Budget", details[4]);
       this.manageProperties( "Revenue", details[5]);
       this.manageProperties( "Release", details[6]);
       this.poster = details[7][0] === null ? "././assets/img/noPoster.jpeg" : "http://image.tmdb.org/t/p/w185//" + details[7][0];
    }

    //Get and manage data related to films' casting provided by JeuService
    setStaff(staff: string[][]) {
        this.manageProperties( "Actor", staff[0] );
        this.manageProperties( "Director", staff[1]);
        this.manageProperties( "Productor", staff[2]);
        this.manageProperties( "Composer", staff[3]);
    }

    //Format and store in availlableClues the valid clues (not empty or not 0)
    private manageProperties(name: string, properties: string[] ): string[] {
        if(properties.length === 0 || +properties[0] < 10000) return [];
        if( properties.length > this.maxItems) properties = this.getSomeProperties(this.maxItems, properties);
        if( name === 'Budget' || name === 'Revenue' )
            if(+properties[0] < 10000 ) return [];
            else properties[0] = this.manageMoney( properties[0] );
        if( name === 'Release') { properties[0] = this.manageDate( properties[0] ); }
        let formatProperty: string[] = new Array<string>();
        formatProperty.push(name);
        for(let i=0;i<properties.length;i++) { formatProperty.push(properties[i]); }
        this.availlableClues.push(formatProperty);
        return formatProperty;
    }

    //Format monetary data (thousand separator and $)
    private manageMoney( amount: string ): string {
        let strAmount: string = String(amount);
        let newAmount: string = "";
        let max = strAmount.length;
        for(let i = 0; i < max; i++) {
            newAmount = strAmount[ max - i -1 ] + newAmount;
            if( (i+1)%3 === 0 && i < max-1 ) newAmount = "'" + newAmount;
        }
        return newAmount+'$';
    }

    //Format date data (month-day-year)
    private manageDate( date: string ): string {
        let dates: string[] = date.split('-');
        date = dates[1]+"."+dates[2]+"."+dates[0];
        return date;
    }

    // Return some no empty propterties from a properties list
    getSomeProperties( some: number, properties: string[] ): string[] {
        let propertiesNoVoid: string[] = properties.filter( element => element !== "").map(element => " "+element);
        some = Math.min(some, propertiesNoVoid.length)
        if(some == 0) { return []; }
        return propertiesNoVoid.slice(0, some);
    }




}