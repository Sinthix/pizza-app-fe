import { Ingredient } from './ingredient.model';

export interface Pizza {
  id: number;
  name: string;
  sellingPrice: number;
  imageUrl: string;
  ingredients: Ingredient[];
}