import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

export class CreateRecipeDto {
  name: string;
  description: string;

  constructor(name: string, ingredients: Ingredient[], description: string) {
    this.name = name;
    this.description = description;
  }
}
