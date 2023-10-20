import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Unit {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, nullable: false, length: 50 })
  public name: string;

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
