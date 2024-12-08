import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';
import { IngredientListComponent } from './components/ingredient-list/ingredient-list.component';
import { PizzaFormComponent } from './components/pizza-form/pizza-form.component';
import { IngredientFormComponent } from './components/ingredient-form/ingredient-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/management', pathMatch: 'full' },
  { path: 'management', component: PizzaListComponent },
  { path: 'ingredients', component: IngredientListComponent },
  { path: 'pizza/add', component: PizzaFormComponent },
  { path: 'ingredient/add', component: IngredientFormComponent },
  { path: 'pizza/edit/:id', component: PizzaFormComponent },
  { path: 'ingredient/edit/:id', component: IngredientFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
