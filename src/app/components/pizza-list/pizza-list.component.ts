import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../../services/pizza.service';
import { Pizza } from '../../models/pizza.model';
import { MatDialog } from '@angular/material/dialog';
import { PizzaFormComponent } from '../pizza-form/pizza-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationDialogComponent } from 'src/app/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {
  pizzas$: Observable<Pizza[]> = this.pizzaService.getPizzas(); 
  isLoading = false;
  errorMessage = '';

  constructor(
    private pizzaService: PizzaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPizzas();
  }

  loadPizzas(): void {
    this.pizzas$ = this.pizzaService.getPizzas();
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
      data: pizza,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPizzas(); // Refresh the list after dialog close
      }
    });
  }

  deletePizza(pizzaId: number): void {
    const pizzaIdString = pizzaId.toString();
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: { pizzaId },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.pizzaService.deletePizza(pizzaIdString).subscribe(
          () => {
            this.loadPizzas();
            this.snackBar.open('Pizza deleted successfully!', 'Close', {
              duration: 3000,
            });
          },
          () => {
            this.showErrorMessage('Error deleting pizza. Please try again later.');
          }
        );
      }
    });
  }
}
