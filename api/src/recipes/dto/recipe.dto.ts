import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Recipe } from '../entities/recipe.entity';

export class RecipeDto {
  id: number;
  name: string;
  description: string;
  ingredients: Ingredient[];
  createdAt?: Date;
  updatedAt?: Date;
  removed?: boolean;

  constructor(value: Recipe) {
    this.id = value.id ?? 0;
    this.name = value.name ?? '';
    this.description = value.description ?? '';
    this.ingredients = value.ingredients ?? [];
    this.createdAt = value.createdAt ?? new Date();
    this.updatedAt = value.updatedAt ?? new Date();
    this.removed = value.removed ?? false;
  }
}
