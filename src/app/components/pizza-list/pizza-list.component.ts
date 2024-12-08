import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../../services/pizza.service';
import { Pizza } from '../../models/pizza.model';
import { MatDialog } from '@angular/material/dialog';
import { PizzaFormComponent } from '../pizza-form/pizza-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationDialogComponent } from 'src/app/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {
  pizzas: Pizza[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private pizzaService: PizzaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPizzas();
  }

  loadPizzas(): void {
    this.isLoading = true;
    this.pizzaService.getPizzas().subscribe(
      (pizzas: Pizza[]) => {
        this.pizzas = pizzas;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        this.errorMessage = 'Error loading pizzas. Please try again later.';
        this.showErrorMessage(this.errorMessage);
      }
    );
  }

  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }

  openPizzaFormDialog(pizza?: Pizza): void {
    const dialogRef = this.dialog.open(PizzaFormComponent, {
      width: '500px',
      data: pizza
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPizzas(); 
      }
    });
  }

  deletePizza(pizzaId: number): void {
    const pizzaIdString = pizzaId.toString();
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: { pizzaId }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.pizzaService.deletePizza(pizzaIdString).subscribe(
          () => {
            this.loadPizzas();
            this.snackBar.open('Pizza deleted successfully!', 'Close', { duration: 3000 });
          },
          (error) => {
            this.showErrorMessage('Error deleting pizza. Please try again later.');
          }
        );
      }
    });
  }
}
