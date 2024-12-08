import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';
import { PizzaFormComponent } from './components/pizza-form/pizza-form.component';
import { IngredientListComponent } from './components/ingredient-list/ingredient-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/pizzas', pathMatch: 'full' },
  { path: 'pizzas', component: PizzaListComponent },
  { path: 'pizzas/add', component: PizzaFormComponent },
  { path: 'pizzas/edit/:id', component: PizzaFormComponent },
  { path: 'ingredients', component: IngredientListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
