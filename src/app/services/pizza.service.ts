import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from '../models/pizza.model';
import { Ingredient } from '../models/ingredient.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = 'http://localhost/pizza-app-backend/routes/api.php/pizzas';

  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((pizzas) =>
        pizzas.map((pizza) => ({
          id: +pizza.id, // Convert string to number
          name: pizza.name,
          sellingPrice: +pizza.selling_price, // Convert string to number
          image: pizza.image_url,
          ingredients: pizza.ingredients || [], // Default to empty array if missing
        }))
      )
    );
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
