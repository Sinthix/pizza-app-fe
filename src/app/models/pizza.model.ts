import { Ingredient } from './ingredient.model';

export interface Pizza {
  id: number;
  name: string;
  sellingPrice: number;
  image?: string;
  ingredients: Ingredient[];
}