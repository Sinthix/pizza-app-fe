import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient } from '../../models/ingredient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css']
})
export class IngredientFormComponent implements OnInit {
  ingredientForm!: FormGroup;
  isEdit: boolean = false;
  @Input() ingredient: Ingredient | null = null;

  constructor(
    private fb: FormBuilder,
    private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.ingredientForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(/^[a-zA-Z0-9 ]+$/)
        ]
      ],
      costPrice: [
        '',
        [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]
      ],
      randomizationPercentage: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)]
      ],
      image: ['', Validators.required]
    });

    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEdit = true;
        this.ingredientService.getIngredient(id).subscribe((ingredient) => {
          this.ingredientForm.patchValue(ingredient);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.ingredientForm.invalid) {
      return;
    }

    const ingredientData: Ingredient = this.ingredientForm.value;
    const ingredientId = this.ingredientForm.get('id')?.value;

    if (this.isEdit) {
      this.ingredientService.updateIngredient(ingredientId, ingredientData).subscribe(
        (response) => {
          this.snackBar.open('Ingredient updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/management']);
        },
        (error) => {
          this.snackBar.open('Failed to update ingredient. Please try again.', 'Close', { duration: 3000 });
        }
      );
    } else {
      this.ingredientService.addIngredient(ingredientData).subscribe(
        (response) => {
          this.snackBar.open('Ingredient added successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/management']);
        },
        (error) => {
          this.snackBar.open('Failed to add ingredient. Please try again.', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
