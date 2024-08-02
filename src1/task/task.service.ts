import { UpdateTaskDto } from './dto/task.update.dto';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entity/task.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/task.create.dto";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) 
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, userId: number){
    const { name, description,dueDate,status, media } = createTaskDto;
    console.log(createTaskDto)
    const task = this.taskRepository.create({
      name,
      description,
      dueDate,
      status,
      media,
      userid: userId, 
    });
    return this.taskRepository.save(task);
  }

  async updateTask(taskId:number,UpdateTaskDto:UpdateTaskDto){
    const task = await this.taskRepository.findOne({ where: { taskid: taskId } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return this.taskRepository.update(task.taskid,UpdateTaskDto);
  }


  async deleteTask(taskId:number){
    const task=await this.taskRepository.findOne({where:{taskid:taskId}});
    if(!task){
      throw new NotFoundException(`Task with ID ${taskId} not found`)
    }
    return this.taskRepository.delete(taskId)
  }


  async getTaskById(taskId: number){
    const task = await this.taskRepository.findOne({ where: { taskid: taskId } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return task;
  }

  async getTasksByUserId(userId:number){
    return this.taskRepository.find({ where: { userid: userId } });
  }

  async getTasksByStatus(userId:number,status:string){
    
    return this.taskRepository.createQueryBuilder('task')
    .where('task.userid=:userId',{userId})
    .andWhere('task.status=:status',{status})
    .getMany()
  }

  async getTasksByType(userId:number,type:string){
    return this.taskRepository.createQueryBuilder('task')
    .innerJoinAndSelect('task.typeoftask','typeoftask')
    .where('task.userid=:userId',{userId})
    .andWhere('typeoftask.typeoftask=:type',{type})
    .getMany()
  }

  async checkDueTasksToday(userId:number){
    const user = this.taskRepository.findOne({where:{userid:userId}}) 
    if(!user){
      throw new NotFoundException('TASK IS NOT EXISTING')
    }
  }
}