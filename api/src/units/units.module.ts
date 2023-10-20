import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { Unit } from './entities/unit.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  controllers: [UnitsController],
  providers: [UnitsService]
})
export class UnitsModule {}
