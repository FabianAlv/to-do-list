import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateToDoInput } from './dto/input/create-to-do.input';
import { UpdateToDoInput } from './dto/input/update-to-do.input';
import { ToDo } from './models/to-do';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDo) private readonly toDoRepository: Repository<ToDo>,
  ) { }

  async create(createToDoInput: CreateToDoInput): Promise<ToDo> {
    const toDo = this.toDoRepository.create(createToDoInput);
    return await this.toDoRepository.save(toDo);
  }

  async findOne(id: string): Promise<ToDo> {
    const toDo = await this.toDoRepository.findOne(id);
    if (!toDo) {
      throw new NotFoundException(`To-Do #${id} not found`);
    }
    return toDo;
  }

  async update(
    id: string,
    updateToDoInput: UpdateToDoInput,
  ): Promise<ToDo> {
    const toDo = await this.toDoRepository.preload({
      id: id,
      ...updateToDoInput,
    });
    if (!toDo) {
      throw new NotFoundException(`To-Do #${id} not found`);
    }
    return this.toDoRepository.save(toDo);
  }

  async remove(id: string): Promise<ToDo> {
    const toDo = await this.findOne(id);
    await this.toDoRepository.remove(toDo);
    return {
      id: id,
      toDo: '',
      toDoListId: '',
      completed: false,
      toDoList: null,
    };
  }
}
