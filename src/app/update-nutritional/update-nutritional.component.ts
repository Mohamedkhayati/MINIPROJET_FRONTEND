// update-nutritional.component.ts

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Nutritional } from '../model/nutritional.model';

@Component({
  selector: 'app-update-nutritional',
  templateUrl: './update-nutritional.component.html',
  styles: []
})
export class UpdateNutritionalComponent implements OnInit {
  @Input() nutritional!: Nutritional;
  @Input() ajout!: boolean;
  @Output() nutritionalUpdated = new EventEmitter<Nutritional>();
  constructor() {}
  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ", this.nutritional);
  }
  saveNutritional() {
    this.nutritionalUpdated.emit(this.nutritional);
  }
}
