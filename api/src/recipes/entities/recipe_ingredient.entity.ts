import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Recipe } from './recipe.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

@Entity('recipe_ingredient')
export class RecipeIngredient {
  @PrimaryColumn({ name: 'recipeId' })
  recipeId: number;

  @PrimaryColumn({ name: 'ingredientId' })
  ingredientId: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  @JoinColumn([{ name: 'recipeId', referencedColumnName: 'id' }])
  recipes: Recipe[];

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipes)
  @JoinColumn([{ name: 'ingredientId', referencedColumnName: 'id' }])
  ingredients: Ingredient[];

  quantity: number;
}
