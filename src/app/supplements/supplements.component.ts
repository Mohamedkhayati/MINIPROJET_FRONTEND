import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplementService } from '../services/supplement.service';
import { Supplement } from '../model/supplement.model';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-supplements',
  templateUrl: './supplements.component.html',
  
})
export class SupplementsComponent implements OnInit {
  supplements!: Supplement[];

  constructor(private supplementService: SupplementService, public authService : AuthService) {}
  
  ngOnInit(): void {
    this.chargerSupplement();
    }
    chargerSupplement(){
    this.supplementService.listeSupplement().subscribe(supplements => {
    console.log(supplements);
    this.supplements = supplements;
    });
    }
    supprimerSupplement(s: Supplement) {
      this.supplementService.supprimerSupplement(s.idSupplement).subscribe(() => {
        console.log("Supplement supprimé");
        this.chargerSupplement(); 
        window.alert('Supplement supprimé avec succès'); 
      });
    }
    
  
}
