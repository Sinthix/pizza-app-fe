import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from '../models/pizza.model';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  private readonly API_URL = 'http://localhost:8000/api/pizzas'; // Update to match your PHP backend

  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.API_URL);
  }

  getPizzaById(id: number): Observable<Pizza> {
    return this.http.get<Pizza>(`${this.API_URL}/${id}`);
  }

  createPizza(pizza: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.API_URL, pizza);
  }

  updatePizza(pizza: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`${this.API_URL}/${id}`, pizza);
  }

  deletePizza(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  randomizePizza(): Observable<Pizza> {
    return this.http.get<Pizza>(`${this.API_URL}/randomize`);
  }
}
