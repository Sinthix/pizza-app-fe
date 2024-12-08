import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from '../models/pizza.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = 'http://localhost:80/api/pizzas';

  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiUrl);
  }

  getPizza(id: string): Observable<Pizza> {
    return this.http.get<Pizza>(`${this.apiUrl}/${id}`);
  }

  addPizza(pizza: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.apiUrl, pizza);
  }

  updatePizza(id: string, pizza: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`${this.apiUrl}/${id}`, pizza);
  }

  deletePizza(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  generateRandomPizza(ingredients: Ingredient[]): Pizza {
    const selectedIngredients: Ingredient[] = [];
    const randomPizza: Pizza = {
      id: 0,  
      name: 'Random Pizza',
      sellingPrice: 0,
      image: 'random-pizza.jpg',  
      ingredients: []
    };

    ingredients.forEach((ingredient) => {
      const chance = Math.random() * 100;
      if (chance <= ingredient.randomisationPercentage) {
        selectedIngredients.push(ingredient);
      }
    });

    if (selectedIngredients.length === 0) {
      selectedIngredients.push(ingredients[0]);
    }

    randomPizza.ingredients = selectedIngredients;

    let totalCost = 0;
    randomPizza.ingredients.forEach((ingredient) => {
      totalCost += ingredient.costPrice;
    });

    randomPizza.sellingPrice = totalCost + totalCost * 0.5;

    return randomPizza;
  }
}
