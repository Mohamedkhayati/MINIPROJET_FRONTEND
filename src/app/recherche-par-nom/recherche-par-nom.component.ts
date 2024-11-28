import { Component, OnInit } from '@angular/core';
import { Supplement } from '../model/supplement.model';
import { SupplementService } from '../services/supplement.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
})
export class RechercheParNomComponent implements OnInit {
  supplements!: Supplement[]; // Filtered list of supplements
  allSupplements!: Supplement[]; // Complete list of supplements
  searchTerm: string = ''; // Search input value

  constructor(private supplementService: SupplementService) {}

  ngOnInit(): void {
    // Fetch the full list of supplements from the database
    this.supplementService.listeSupplement().subscribe(
      (supplements) => {
        console.log('Fetched Supplements:', supplements);
        this.allSupplements = supplements;
        this.supplements = supplements; // Initialize filtered list
      },
      (error) => {
        console.error('Error fetching supplements:', error);
      }
    );
  }

  // Filter the supplements based on the search term
  onKeyUp(searchTerm: string): void {
    this.searchTerm = searchTerm.trim().toLowerCase();

    if (this.searchTerm) {
      this.supplements = this.allSupplements.filter((supplement) =>
        supplement.nomSupplement.toLowerCase().includes(this.searchTerm)
      );
    } else {
      // Reset the filtered list if search term is cleared
      this.supplements = [...this.allSupplements];
    }
  }

  // Function to delete a supplement (placeholder for real implementation)
  supprimerSupplement(supplement: Supplement): void {
    // Example: Call a delete method from the service
    if (confirm(`Voulez-vous supprimer le supplément ${supplement.nomSupplement}?`)) {
      this.supplementService.supprimerSupplement(supplement.idSupplement).subscribe(
        () => {
          // Remove the supplement from the list after successful deletion
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
