import { Unit } from 'src/units/entities/unit.entity';
import { Ingredient } from '../entities/ingredient.entity';
import { Category } from 'src/categories/entities/category.entity';

export class IngredientDto {
  id: number;
  name: string;
  unit: Unit;
  category: Category;
  createdAt?: Date;
  updatedAt?: Date;
  removed?: boolean;

  constructor(value: Ingredient) {
    this.id = value.id ?? 0;
    this.name = value.name ?? '';
    this.unit = value.unit ?? new Unit();
    this.category = value.category ?? new Category();
    this.createdAt = value.createdAt ?? new Date();
    this.updatedAt = value.updatedAt ?? new Date();
    this.removed = value.removed ?? false;
  }
}
