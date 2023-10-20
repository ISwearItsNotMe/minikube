import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, nullable: false, length: 50 })
  public name: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.unit)
  public ingredients: Ingredient[];

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt?: Date;

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updatedAt?: Date;

  @Column({ nullable: true, default: false })
  public removed?: boolean;
}
