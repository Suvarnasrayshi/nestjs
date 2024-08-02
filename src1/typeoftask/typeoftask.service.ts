import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Typeoftask } from './entity/typeoftask.entity';
import { Repository } from 'typeorm';
import { CreateTypeoftaskDto } from './dto/typeoftask..create.dto';

@Injectable()
export class TypeoftaskService {
  constructor(
    @InjectRepository(Typeoftask)
    private typeoftaskRepository: Repository<Typeoftask>,
  ) {}

  async createTypeoftask(CreateTypeoftaskDto: CreateTypeoftaskDto, taskId: number) {
    const { typeoftask } = CreateTypeoftaskDto;
    console.log("type",taskId)
    const typeoftaskCreate = this.typeoftaskRepository.create({
      typeoftask,
      taskid: taskId,
    });
    return this.typeoftaskRepository.save(typeoftaskCreate);
  }

  async getTypeoftaskById(typeoftaskId: number) {
    const typeoftask = await this.typeoftaskRepository.findOne({ where: { typeoftaskid: typeoftaskId } });
    if (!typeoftask) {
      throw new NotFoundException(`TypeOfTask with ID ${typeoftaskId} not found`);
    }
    return typeoftask;
  }

  async getTypeoftasksByTaskId(taskId: number) {
    return this.typeoftaskRepository.find({ where: { taskid: taskId } });
  }
}
