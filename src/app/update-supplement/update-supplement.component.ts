import { Component } from '@angular/core';
import { Supplement } from '../model/supplement.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplementService } from '../services/supplement.service';
import { Nutritional } from '../model/nutritional.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-supplement',
  templateUrl: './update-supplement.component.html'
})
export class UpdateSupplementComponent {

  currentSupplement = new Supplement();
  nutritionals!: Nutritional[];
  updatedNutritionalId!: number;
  myForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private supplementService: SupplementService,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.supplementService.listeNutritionals().
      subscribe(nutritionals => {
        console.log(nutritionals);
        this.nutritionals = nutritionals._embedded.nutritionals;
      });
      
    this.supplementService.consulterSupplement(this.activatedRoute.snapshot.params['id']).subscribe(supplement => {
      this.currentSupplement = supplement;
      this.updatedNutritionalId = this.currentSupplement.nutritional.idNut;
    });
    
    this.myForm = this.formBuilder.group({
      idSupplement: ['', [Validators.required]],
      nomSupplement: ['', [Validators.required, Validators.minLength(5)]],
      prixSupplement: ['', [Validators.required, Validators.min(0)]],
      dosageSupplement: ['', [Validators.required]],
      datedeSortie: ['', [Validators.required]],
      nutritional: ['', [Validators.required]]
    });
  }

  updateSupplement() {
    this.currentSupplement.nutritional = this.nutritionals.
      find(nutritional => nutritional.idNut == this.updatedNutritionalId)!;
    this.supplementService.updateSupplement(this.currentSupplement).subscribe(supplement => {
      this.router.navigate(['supplements']);
    });
  }
}
