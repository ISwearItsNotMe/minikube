import { Category } from 'src/categories/entities/category.entity';
import { Recipe } from 'src/recipes/entities/recipe.entity';
import { Unit } from 'src/units/entities/unit.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, nullable: false, length: 50 })
  public name: string;

  @ManyToOne(() => Unit, (unit) => unit.ingredients)
  @JoinColumn()
  public unit: Unit;

  @ManyToOne(() => Category, (category) => category.ingredients)
  @JoinColumn()
  public category: Category;

  @ManyToMany(() => Recipe, (recipe) => recipe.ingredients)
  public recipes: Recipe[];

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt?: Date = new Date();

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updatedAt?: Date = new Date();

  @Column({ nullable: true, default: false })
  public removed?: boolean;
}
