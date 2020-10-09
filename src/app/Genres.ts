import { formControlBinding } from "@angular/forms/src/directives/reactive_directives/form_control_directive";
import { query } from "@angular/core/src/render3";


export class Genres  {
    
    //correspondance entre id tmbd et nom de genre
    private genres = [
        { "id": 28, "name": "Action" },
        { "id": 12, "name": "Aventure" },
        { "id": 16,"name": "Animation" },
        { "id": 35,"name": "Comédie" },
        { "id": 80,"name": "Crime" },
        { "id": 99,"name": "Documentaire" },
        { "id": 18,"name": "Drame" },
        { "id": 10751,"name": "Familial" },
        { "id": 14,"name": "Fantastique" },
        { "id": 36,"name": "Histoire" },
        { "id": 27,"name": "Horreur" },
        { "id": 10402,"name": "Musique" },
        { "id": 9648,"name": "Mystère" },
        { "id": 10749,"name": "Romance" },
        { "id": 878,"name": "Science-Fiction" },
        { "id": 10770,"name": "Téléfilm" },
        { "id": 53,"name": "Thriller" },
        { "id": 10752,"name": "Guerre" },
        { "id": 37,"name": "Western" }
    ]

    //convertit un id genre au format tmbd par son nom
    private convertId(id: string): string {
        let strGenre = this.genres.filter( element => element.id === +id);
        if(strGenre.length == 0) return "";
        return strGenre[0].name;
    }

    //convertit un tableau id genre au format tmbd par un tableau de nom
    convertIds(ids: string[]): string[] {
        if( ids.length == 0) return [];
        return ids.filter(element => element !== "").map(element => this.convertId(element));
    }

}