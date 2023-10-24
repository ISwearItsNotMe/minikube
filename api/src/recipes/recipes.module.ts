import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { Recipe } from './entities/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { RecipeIngredient } from './entities/recipe_ingredient.entity';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeIngredient, Ingredient])],
  controllers: [RecipesController],
  providers: [RecipesService, IngredientsService],
  exports: [RecipesService],
})
export class RecipesModule {}
