import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  isLoading = false;

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.fetchIngredients();
  }

  fetchIngredients(): void {
    this.isLoading = true;
    this.ingredientService.getIngredients().subscribe({
      next: (data) => { this.ingredients = data; },
      error: (err) => { alert('Error fetching ingredients!'); },
      complete: () => { this.isLoading = false; }
    });
  }

  openAddIngredientForm(): void {
  }

  deleteIngredient(id: number): void {
    this.ingredientService.deleteIngredient(id).subscribe(() => {
      this.fetchIngredients();
    });
  }
}
