import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Unit } from './entities/unit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private ingredientsRepository: Repository<Unit>,
  ) {}

  async create(createUnitDto: CreateUnitDto): Promise<Unit> {
    return this.ingredientsRepository.save({
      ...createUnitDto,
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
      throw new NotFoundException('Units not found');
    }
    return ingredients;
  }

  async findOne(id: number) {
    const unit = await this.ingredientsRepository.findOne({
      where: { id, removed: false },
    });
    if (!unit) {
      throw new NotFoundException('Unit not found');
    }
    return unit;
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    const unit = await this.ingredientsRepository.findOne({
      where: { id, removed: false },
    });
    if (!unit) {
      throw new NotFoundException('Unit not found');
    }
    const result = await this.ingredientsRepository.save({
      ...unit,
      ...updateUnitDto,
      updatedAt: new Date(),
    });
    if (!result) {
      throw new NotFoundException('Unit not updated');
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.ingredientsRepository.update(id, {
      removed: true,
      updatedAt: new Date(),
    });
    if (!result) {
      throw new NotFoundException('Unit not removed');
    }
    return { removed: true };
  }
}
