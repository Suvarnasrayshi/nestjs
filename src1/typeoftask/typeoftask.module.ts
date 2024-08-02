import { Module } from '@nestjs/common';
import { TypeoftaskController } from './typeoftask.controller';
import { TypeoftaskService } from './typeoftask.service';
import { Typeoftask } from './entity/typeoftask.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TypeoftaskController],
  providers: [TypeoftaskService],
  imports:[TypeOrmModule.forFeature([Typeoftask])],
})
export class TypeoftaskModule {}
