import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesRepository.save({
      ...createCategoryDto,
      removed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findAll() {
    const categories = await this.categoriesRepository.find({
      where: { removed: false },
    });
    if (!categories) {
      throw new NotFoundException('Categories not found');
    }
    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id, removed: false },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOne({
      where: { id, removed: false },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const result = await this.categoriesRepository.save({
      ...category,
      ...updateCategoryDto,
      updatedAt: new Date(),
    });
    if (!result) {
      throw new NotFoundException('Category not updated');
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.categoriesRepository.update(id, {
      removed: true,
      updatedAt: new Date(),
    });
    if (!result) {
      throw new NotFoundException('Category not removed');
    }
    return { removed: true };
  }
}
