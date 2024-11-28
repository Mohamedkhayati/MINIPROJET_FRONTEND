import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplementService } from '../services/supplement.service';
import { Supplement } from '../model/supplement.model';
import { Nutritional } from '../model/nutritional.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../validators/email-validator'; 

@Component({
  selector: 'app-add-supplement',
  templateUrl: './add-supplement.component.html',
})
export class AddSupplementComponent implements OnInit {
  newSupplement = new Supplement();
  nutritionals!: Nutritional[];
  newIdNutritional!: number;
  newNutritional!:Nutritional;
  addSupplementForm!: FormGroup;


  constructor(private supplementService: SupplementService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  
    ngOnInit(): void {
      this.supplementService.listeNutritionals().
      subscribe(nutritionals => {console.log(nutritionals);
      this.nutritionals = nutritionals._embedded.nutritionals;
      });
    

    this.addSupplementForm = this.formBuilder.group({
      idSupplement: ['', [Validators.required, Validators.minLength(1)]],
      nomSupplement: ['', [Validators.required, Validators.minLength(3)]],
      prixSupplement: ['', [Validators.required]],
      dosageSupplement: ['', [Validators.required]],
      dateCreation: ['', [Validators.required]],
      idNut: ['', [Validators.required]]
    });
  }

  addSupplement() {
    this.newSupplement.idSupplement = this.addSupplementForm.value.idSupplement;
    this.newSupplement.nomSupplement = this.addSupplementForm.value.nomSupplement;
    this.newSupplement.prixSupplement = this.addSupplementForm.value.prixSupplement;
    this.newSupplement.dosageSupplement = this.addSupplementForm.value.dosageSupplement;
    this.newSupplement.dateCreation = this.addSupplementForm.value.dateCreation;
  
    this.newSupplement.nutritional = this.nutritionals.find(
      nutritional => nutritional.idNut == this.addSupplementForm.value.idNut
    )!;
  
    this.supplementService.ajouterSupplement(this.newSupplement).subscribe(
      supplement => {
        console.log('Supplement added:', supplement);
        this.router.navigate(['supplements']);
      },
      error => {
        console.error('Error adding supplement:', error);
      }
    );
  }
  
}
