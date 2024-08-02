import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TypeoftaskService } from './typeoftask.service';
import { CreateTypeoftaskDto } from './dto/typeoftask..create.dto';


@Controller('typeoftask')
export class TypeoftaskController {
  constructor(private typeoftaskService: TypeoftaskService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/:taskId')
  async createTypeoftask(
    @Body() createTypeoftaskDto: CreateTypeoftaskDto,
    @Request() req: any,
    @Param('taskId') taskId: number
  ) {
    const userId = req.user.id; 
    console.log("hello",createTypeoftaskDto,taskId)
    return this.typeoftaskService.createTypeoftask(createTypeoftaskDto, taskId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:typeoftaskId')
  async getTypeoftaskById(@Param('typeoftaskId') typeoftaskId: number) {
    return this.typeoftaskService.getTypeoftaskById(typeoftaskId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/task/:taskId')
  async getTypeoftasksByTaskId(@Param('taskId') taskId: number) {
    return this.typeoftaskService.getTypeoftasksByTaskId(taskId);
  }


}
