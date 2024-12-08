import { Component, Inject, OnInit } from '@angular/core';
import { PizzaService } from '../../services/pizza.service';
import { Pizza } from '../../models/pizza.model';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientService } from '../../services/ingredient.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.css']
})
export class PizzaFormComponent implements OnInit {
  pizzaForm!: FormGroup;
  ingredients: Ingredient[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private pizzaService: PizzaService,
    private ingredientService: IngredientService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PizzaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pizza | null
  ) {}

  ngOnInit(): void {
    this.loadIngredients();
    this.initializeForm();
  }

   initializeForm(): void {
    if (this.data) {
      this.pizzaForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        sellingPrice: ['', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]{0,2}$')]], // Floating-point validation
        image: ['', Validators.required],
        ingredients: [[]]
      });
    } else {
      this.pizzaForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        sellingPrice: ['', [Validators.required, Validators.min(0)]],
        image: [''],
        ingredients: [[], [Validators.required, Validators.minLength(1)]]
      });
    }
  }

  loadIngredients(): void {
    this.isLoading = true;
    this.ingredientService.getIngredients().subscribe(
      (data: Ingredient[]) => {
        this.ingredients = data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error loading ingredients. Please try again later.';
      }
    );
  }

  onSubmit(): void {
    if (this.pizzaForm.valid) {
      const pizzaData = this.pizzaForm.value;
      if (this.data) {
        this.pizzaService.updatePizza(String(this.data.id), pizzaData).subscribe(
          () => this.dialogRef.close(true),
          (error) => {
            this.errorMessage = 'Error updating pizza. Please try again later.';
          }
        );
      } else {
        this.pizzaService.addPizza(pizzaData).subscribe(
          () => this.dialogRef.close(true),
          (error) => {
            this.errorMessage = 'Error creating pizza. Please try again later.';
          }
        );
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
