import { IsNotEmpty } from 'class-validator';

export class CreateUnitDto {
  @IsNotEmpty()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
