import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IngredientListComponent } from './components/ingredient-list/ingredient-list.component';
import { IngredientFormComponent } from './components/ingredient-form/ingredient-form.component';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';
import { PizzaFormComponent } from './components/pizza-form/pizza-form.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientListComponent,
    IngredientFormComponent,
    PizzaListComponent,
    PizzaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
