import { Injectable } from '@angular/core';
import { Supplement } from '../model/supplement.model';
import { Nutritional } from '../model/nutritional.model';
import { Observable, observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLNut } from '../config';
import { NutritionalWrapper } from '../model/WrappedNutritional.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SupplementService {
  
  supplements!: Supplement[];
  nutritionals! : Nutritional[];
  supplementsRecherche!: Supplement[]; 

  constructor(private http: HttpClient) {}

  listeSupplement(): Observable<Supplement[]> {
    return this.http.get<Supplement[]>(apiURL);
  }

  ajouterSupplement(game: Supplement): Observable<Supplement> {
    return this.http.post<Supplement>(apiURL, game, httpOptions);
  }

  supprimerSupplement(id: number) {
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterSupplement(id: number): Observable<Supplement> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Supplement>(url);
  }

  updateSupplement(supplement: Supplement): Observable<Supplement> {
    return this.http.put<Supplement>(apiURL, supplement, httpOptions);
  }

  listeNutritionals():Observable<NutritionalWrapper>{
    return this.http.get<NutritionalWrapper>(apiURLNut);
  }
  consulterNutritional(id: number): Nutritional {
    return this.nutritionals.find(cat => cat.idNut == id)!;
  }


  rechercherParNutritional(idGenre: number):Observable< Supplement[]> {
    const url = `${apiURL}/supplements/nut/${idGenre}`;
    return this.http.get<Supplement[]>(url);
  }

  /* rechercherParNom(nom: string):Observable< Game[]> {
    const url = `${apiURL}/gamesByName/${nom}`;
    return this.http.get<Game[]>(url);
  } */
  
  ajouterNutritional( genre: Nutritional):Observable<Nutritional>{
    return this.http.post<Nutritional>(apiURLNut, genre, httpOptions);
  }

  trierGames() {
    this.supplements = this.supplements.sort((n1, n2) => {
      if (n1.idSupplement! > n2.idSupplement!) {
        return 1;
      }
      if (n1.idSupplement! < n2.idSupplement!) {
        return -1;
      }
      return 0;
    });
  }
  
}

