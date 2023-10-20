import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { IngredientDto } from './dto/ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  async create(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<IngredientDto> {
    const ingredient = await this.ingredientsService.create(
      createIngredientDto,
    );
    return new IngredientDto(ingredient);
  }

  @Get()
  async findAll() {
    return await this.ingredientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const ingredient = await this.ingredientsService.findOne(+id);
    return ingredient;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return await this.ingredientsService.update(+id, updateIngredientDto);
  }

  @Put('/delete/:id')
  async remove(@Param('id') id: string) {
    return await this.ingredientsService.remove(+id);
  }
}
