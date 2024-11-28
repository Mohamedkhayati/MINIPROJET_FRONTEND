
import { Component, OnInit } from '@angular/core';
import { Nutritional } from './../model/nutritional.model';
import { SupplementService } from '../services/supplement.service';

@Component({
  selector: 'app-listenutritional',
  templateUrl: './liste-nutritional.component.html',
})
export class ListeNutritionalsComponent implements OnInit {
  nutritionals!: Nutritional[];
  updatedNutritional: Nutritional = { "idNut": 0, "nomNut": "" };
  ajout: boolean = true;

  constructor(private supplementService: SupplementService) { }

  ngOnInit(): void {
    this.chargerNutritionals();
  }

  chargerNutritionals() {
    this.supplementService.listeNutritionals().
      subscribe(genres => {
        this.nutritionals = genres._embedded.nutritionals;
        console.log(genres);
      });
  }

  nutritionalUpdated(genre: Nutritional) {
    console.log("Nutritional updated event", genre);
    this.supplementService.ajouterNutritional(genre).subscribe(() => this.chargerNutritionals());
  } 

  updateNut(genre: Nutritional) {
    this.updatedNutritional = genre;
    this.ajout = false;
  }
}
