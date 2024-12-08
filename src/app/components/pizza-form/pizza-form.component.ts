import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PizzaService } from 'src/app/services/pizza.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Pizza } from 'src/app/models/pizza.model';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.css'],
})
export class PizzaFormComponent implements OnInit {
  pizzaForm: FormGroup;
  ingredients: Ingredient[] = [];
  isEditMode = false;
  pizzaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private pizzaService: PizzaService,
    private ingredientService: IngredientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pizzaForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[^{}[\]".!]+$/)],
      ],
      sellingPrice: [0, [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      ingredients: [[]],
    });
  }

  ngOnInit(): void {
    this.loadIngredients();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.pizzaId = +id;
        this.loadPizza();
      }
    });
  }

  loadIngredients(): void {
    this.ingredientService.getIngredients().subscribe((data) => {
      this.ingredients = data;
    });
  }

  loadPizza(): void {
    if (this.pizzaId) {
      this.pizzaService.getPizzaById(this.pizzaId).subscribe((pizza) => {
        this.pizzaForm.patchValue({
          name: pizza.name,
          sellingPrice: pizza.sellingPrice,
          imageUrl: pizza.imageUrl,
          ingredients: pizza.ingredients,
        });
      });
    }
  }

  onSubmit(): void {
    const pizza: Pizza = this.pizzaForm.value;

    if (this.isEditMode && this.pizzaId) {
      this.pizzaService.updatePizza(this.pizzaId, pizza).subscribe(() => {
        this.router.navigate(['/pizzas']);
      });
    } else {
      this.pizzaService.createPizza(pizza).subscribe(() => {
        this.router.navigate(['/pizzas']);
      });
    }
  }

  addIngredient(event: any): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const ingredient = this.ingredients.find((ing) => ing.name === value.trim());
      if (ingredient) {
        const currentIngredients = this.pizzaForm.get('ingredients')?.value;
        this.pizzaForm.get('ingredients')?.setValue([...currentIngredients, ingredient]);
      }
    }

    if (input) {
      input.value = '';
    }
  }

  removeIngredient(ingredient: Ingredient): void {
    const currentIngredients = this.pizzaForm.get('ingredients')?.value.filter(
      (ing: Ingredient) => ing.id !== ingredient.id
    );
    this.pizzaForm.get('ingredients')?.setValue(currentIngredients);
  }
}
