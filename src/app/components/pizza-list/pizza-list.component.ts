import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza.service';
import { Pizza } from 'src/app/models/pizza.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {
  pizzas: Pizza[] = [];
  isLoading = false;

  constructor(
    private pizzaService: PizzaService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadPizzas();
  }

  loadPizzas(): void {
    this.isLoading = true;
    this.spinner.show();
    this.pizzaService.getPizzas().subscribe(
      (data: Pizza[]) => {
        this.pizzas = data;
        this.spinner.hide();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading pizzas:', error);
        this.spinner.hide();
        this.isLoading = false;
      }
    );
  }

  editPizza(id: number): void {
    window.location.href = `/pizzas/edit/${id}`;
  }

  deletePizza(id: number): void {
    if (confirm('Are you sure you want to delete this pizza?')) {
      this.pizzaService.deletePizza(id).subscribe(() => {
        this.pizzas = this.pizzas.filter(p => p.id !== id);
      });
    }
  }
}
