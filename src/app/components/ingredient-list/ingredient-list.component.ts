import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient } from '../../models/ingredient.model';
import { MatDialog } from '@angular/material/dialog';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private ingredientService: IngredientService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadIngredients();
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

  openAddIngredientDialog(): void {
    const dialogRef = this.dialog.open(IngredientFormComponent, {
      width: '400px',
      data: null  
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIngredients(); 
      }
    });
  }

  openEditIngredientDialog(ingredient: Ingredient): void {
    const dialogRef = this.dialog.open(IngredientFormComponent, {
      width: '400px',
      data: ingredient 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIngredients(); 
      }
    });
  }

  deleteIngredient(id: string): void {
    if (confirm('Are you sure you want to delete this ingredient?')) {
      this.ingredientService.deleteIngredient(id).subscribe(
        () => {
          this.loadIngredients(); 
        },
        (error) => {
          this.errorMessage = 'Error deleting ingredient. Please try again later.';
        }
      );
    }
  }
}
