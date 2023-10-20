import { Unit } from 'src/units/entities/unit.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Ingredient {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, nullable: false, length: 50 })
  public name: string;

  @Column({ nullable: false, length: 50 })
  public unit: Unit;

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
