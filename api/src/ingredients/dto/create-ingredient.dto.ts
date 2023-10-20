import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { Unit } from 'src/units/entities/unit.entity';

export class CreateIngredientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  unit: Unit;

  @IsNotEmpty()
  category: Category;

  constructor(name: string, unit: Unit) {
    this.name = name;
    this.unit = unit;
  }
}
