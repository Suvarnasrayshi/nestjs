import { TaskService } from './task.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/task.create.dto';
import { UpdateTaskDto } from './dto/task.update.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Request() req: any) {
    const userId = req.user.id;
    console.log("userId",userId)
    console.log("typeoftask",createTaskDto)

   return this.taskService.createTask(createTaskDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:taskId')
  async updateTask(
    @Param('taskId') taskId: number, 
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(taskId, updateTaskDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:taskId')
  async deleteTask(
    @Param('taskId') taskId:number,
  ){
    return this.taskService.deleteTask(taskId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:taskId')
  async getTaskById(@Param('taskId') taskId: number) {
    return this.taskService.getTaskById(taskId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/user/:userId')
  async getTasksByUserId(@Param('userId') userId: number) {
    return this.taskService.getTasksByUserId(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':type')
  getTasksByType(@Param('type') type: string, @Param('userId') userId: number) {
    return this.taskService.getTasksByType(userId, type);
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('status/to-do/:userId')
  getToDoTasks(@Param('userId') userId: number) {
    return this.taskService.getTasksByStatus(userId, 'to-do');
  }

 @UseGuards(AuthGuard('jwt'))
 @Get('status/in-progress/:userId')
 getInProgress(@Param('userId')userId:number){
  return this.taskService.getTasksByStatus(userId,'in-progress');
 }

 @UseGuards(AuthGuard('jwt'))
 @Get('status/completed/:userId')
 getCompeleted(@Param('userId') userId: number) {
  return this.taskService.getTasksByStatus(userId,'completed');
}

 @UseGuards(AuthGuard('jwt'))
  @Get('due-today/:userId')
  checkDueTasksToday(@Param('userId') userId: number) {
    return this.taskService.checkDueTasksToday(userId);
  }
}