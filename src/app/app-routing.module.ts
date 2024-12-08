import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientListComponent } from './components/ingredient-list/ingredient-list.component';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/management', pathMatch: 'full' },
  { path: 'management', children: [
      { path: 'ingredients', component: IngredientListComponent },
      { path: 'pizzas', component: PizzaListComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
