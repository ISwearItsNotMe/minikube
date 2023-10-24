import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeIngredient } from './entities/recipe_ingredient.entity';
import { IngredientsService } from 'src/ingredients/ingredients.service';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    @InjectRepository(RecipeIngredient)
    private recipeIngredientsRepository: Repository<RecipeIngredient>,

    private ingredientsService: IngredientsService,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return this.recipesRepository.save({
      ...createRecipeDto,
      removed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findAll() {
    const recipes = await this.recipesRepository.find({
      where: { removed: false },
    });
    if (!recipes) {
      throw new NotFoundException('Recipes not found');
    }
    return recipes;
  }

  async findOne(id: number) {
    const recipe = await this.recipesRepository.findOne({
      where: { id, removed: false },
    });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.recipesRepository.findOne({
      where: { id, removed: false },
    });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    const result = await this.recipesRepository.save({
      ...recipe,
      ...updateRecipeDto,
      updatedAt: new Date(),
    });
    if (!result) {
      throw new NotFoundException('Recipe not updated');
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.recipesRepository.update(id, {
      removed: true,
      updatedAt: new Date(),
    });
    if (!result) {
      throw new NotFoundException('Recipe not removed');
    }
    return { removed: true };
  }

  async findAllIngredientForRecipe(id: number) {
    return this.recipeIngredientsRepository
      .createQueryBuilder('ri')
      .select('ri.ingredientId')
      .where('ri.recipeId = :id', { id: id })
      .getMany();
  }

  async setIngredientForRecipe(
    recipeId: number,
    ingredientIds: number[],
  ): Promise<RecipeIngredient[]> {
    await this.findOne(recipeId);
    if (!Array.isArray(ingredientIds)) {
      throw new Error('ingredientIds must be an array');
    }
    const ingredients = await this.ingredientsService.findByIds(ingredientIds);
    if (ingredients.length !== ingredientIds.length) {
      const missingIngredientIds = ingredientIds.filter(
        (id) => !ingredients.find((ingredient) => ingredient.id === id),
      );
      throw new NotFoundException(
        `Ingredients with IDs ${missingIngredientIds.join(', ')} not found`,
      );
    }

    await this.recipeIngredientsRepository
      .createQueryBuilder()
      .delete()
      .from(RecipeIngredient)
      .where('recipeId = :recipeId', { recipeId: recipeId })
      .execute();

    const recipeIngredientRecords = ingredientIds.map((ingredientId) => {
      const recipeIngredientRecord = new RecipeIngredient();
      recipeIngredientRecord.recipeId = recipeId;
      recipeIngredientRecord.ingredientId = ingredientId;
      return recipeIngredientRecord;
    });

    return this.recipeIngredientsRepository.save(recipeIngredientRecords);
  }
}
