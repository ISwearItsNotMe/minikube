import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientsRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    return this.ingredientsRepository.save({
      ...createIngredientDto,
      removed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findAll() {
    const ingredients = await this.ingredientsRepository.find({
      where: { removed: false },
    });
    if (!ingredients) {
      throw new NotFoundException('Ingredients not found');
    }
    return ingredients;
  }

  async findOne(id: number) {
    const ingredient = await this.ingredientsRepository.findOne({
      where: { id, removed: false },
      relations: ['unit'],
    });
    if (!ingredient) {
      throw new NotFoundException('Ingredient not found');
    }
    const modifiedIngredient = {
      ...ingredient,
      unit: ingredient.unit ? ingredient.unit.name : null,
      category: ingredient.category ? ingredient.category.name : null,
    };
    return modifiedIngredient;
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.ingredientsRepository.findOne({
      where: { id, removed: false },
    });
    if (!ingredient) {
      throw new NotFoundException('Ingredient not found');
    }
    const result = await this.ingredientsRepository.save({
      ...ingredient,
      ...updateIngredientDto,
      updatedAt: new Date(),
    });
    if (!result) {
      throw new NotFoundException('Ingredient not updated');
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.ingredientsRepository.update(id, {
      removed: true,
      updatedAt: new Date(),
    });
    if (!result) {
      throw new NotFoundException('Ingredient not removed');
    }
    return { removed: true };
  }
}
