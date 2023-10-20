import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { UnitDto } from './dto/unit.dto';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  async create(@Body() createUnitDto: CreateUnitDto): Promise<UnitDto> {
    const unit = await this.unitsService.create(createUnitDto);
    return new UnitDto(unit);
  }

  @Get()
  async findAll() {
    return await this.unitsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const unit = await this.unitsService.findOne(+id);
    return unit;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    return await this.unitsService.update(+id, updateUnitDto);
  }

  @Put('/delete/:id')
  async remove(@Param('id') id: string) {
    return await this.unitsService.remove(+id);
  }
}
