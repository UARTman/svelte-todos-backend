import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('/api/todos')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getTodos() {
    return {
      todos: await this.prismaService.todo.findMany({}),
    };
  }

  @Post()
  async addTodo(@Body() todo) {
    await this.prismaService.todo.create({
      data: {
        done: todo.done,
        text: todo.text
      }
    })
  }

  @Put(':id')
  async changeTodo(@Param("id") id, @Body() todo) {
    await this.prismaService.todo.update({
      data: {
        done: todo.done,
        text: todo.text
      },
      where: {
        id: parseInt(id)
      }
    })
  }

  @Delete(':id')
  async deleteTodo(@Param("id") id) {
    await this.prismaService.todo.delete({
      where: {
        id: parseInt(id)
      }
    })
  }
}
