import { Unit } from "../entities/unit.entity";

export class UnitDto {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  removed?: boolean;

  constructor(value: Unit) {
    this.id = value.id ?? 0;
    this.name = value.name ?? '';
    this.createdAt = value.createdAt ?? new Date();
    this.updatedAt = value.updatedAt ?? new Date();
    this.removed = value.removed ?? false;
  }
}
