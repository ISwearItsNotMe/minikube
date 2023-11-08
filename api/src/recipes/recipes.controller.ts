import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeDto } from './dto/recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    const recipeId = await this.recipesService.create(createRecipeDto);
    console.log(recipeId)
    return recipeId;
  }

  @Get()
  async findAll() {
    return await this.recipesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const recipe = await this.recipesService.findOne(+id);
    return recipe;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return await this.recipesService.update(+id, updateRecipeDto);
  }

  @Put('/delete/:id')
  async remove(@Param('id') id: string) {
    return await this.recipesService.remove(+id);
  }

  @Get('/ingredients/:id')
  async getIngredientsForRecipe(@Param('id') id: string) {
    return await this.recipesService.findAllIngredientForRecipe(+id);
  }

  @Post('/ingredients/:id')
  async addIngredientToRecipe(
    @Param('id') id: string,
    @Body('ingredientIds') ingredientIds: number[],
    @Body('quantities') quantities: number[],
  ) {
    return await this.recipesService.setIngredientForRecipe(
      +id,
      ingredientIds,
      quantities,
    );
  }
}
