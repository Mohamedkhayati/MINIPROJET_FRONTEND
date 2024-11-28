import { Component, OnInit } from '@angular/core';
import { Nutritional } from '../model/nutritional.model';
import { Supplement } from '../model/supplement.model';
import { SupplementService } from '../services/supplement.service';

@Component({
  selector: 'app-recherche-par-nutritional',
  templateUrl: './recherche-par-nutritional.component.html',
})
export class RechercheParNutritionalComponent implements OnInit {
  supplements: Supplement[] = []; // Filtered supplements list
  nutritionals: Nutritional[] = []; // All nutritional categories
  IdGenre!: number; // Selected Nutritional ID

  constructor(private supplementService: SupplementService) {}

  ngOnInit(): void {
    // Fetch all nutritional categories from the database
    this.supplementService.listeNutritionals().subscribe(
      (response) => {
        this.nutritionals = response._embedded.nutritionals;
        console.log('Fetched Nutritionals:', this.nutritionals);
      },
      (error) => {
        console.error('Error fetching nutritionals:', error);
      }
    );
  }

  // Triggered when the user selects a nutritional category
  onChange(): void {
    if (this.IdGenre) {
      this.supplementService.rechercherParNutritional(this.IdGenre).subscribe(
        (supplements) => {
          this.supplements = supplements;
          console.log(`Supplements for Nutritional ID ${this.IdGenre}:`, supplements);
        },
        (error) => {
          console.error('Error fetching supplements:', error);
        }
      );
    } else {
      this.supplements = []; // Clear supplements if no nutritional selected
    }
  }

  // Delete a supplement
  supprimerSupplement(supplement: Supplement): void {
    if (confirm(`Voulez-vous supprimer le supplément ${supplement.nomSupplement}?`)) {
      this.supplementService.supprimerSupplement(supplement.idSupplement).subscribe(
        () => {
          // Remove the deleted supplement from the list
          this.supplements = this.supplements.filter(
            (s) => s.idSupplement !== supplement.idSupplement
          );
          alert('Supplément supprimé avec succès!');
        },
        (error) => {
          console.error('Error deleting supplement:', error);
          alert('Une erreur est survenue lors de la suppression.');
        }
      );
    }
  }
}
