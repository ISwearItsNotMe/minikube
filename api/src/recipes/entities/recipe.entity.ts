import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  Entity,
  JoinTable,
} from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, nullable: false, length: 50 })
  public name: string;

  @ManyToMany(() => Ingredient)
  public ingredients: Ingredient[];

  @Column({ nullable: false, length: 50 })
  public description: string;

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
