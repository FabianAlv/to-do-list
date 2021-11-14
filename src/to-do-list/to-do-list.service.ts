import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateToDoListInput } from './dto/input/create-to-do-list.input';
import { UpdateToDoListInput } from './dto/input/update-to-do-list.input';
import { ToDoList } from './models/to-do-list';

@Injectable()
export class ToDoListService {
  constructor(
    @InjectRepository(ToDoList) private readonly toDoListRepository: Repository<ToDoList>,
  ) { }

  async create(createToDoListInput: CreateToDoListInput): Promise<ToDoList> {
    const toDoList = this.toDoListRepository.create(createToDoListInput);
    return await this.toDoListRepository.save(toDoList);
  }

  async findAll(): Promise<Array<ToDoList>> {
    return await this.toDoListRepository.find({ relations: ['toDos'] });
  }

  async findOne(id: string): Promise<ToDoList> {
    const toDoList = await this.toDoListRepository.findOne(id, { relations: ['toDos'] });
    if (!toDoList) {
      throw new NotFoundException(`To-Do List #${id} not found`);
    }
    return toDoList;
  }

  async update(
    id: string,
    updateToDoListInput: UpdateToDoListInput,
  ): Promise<ToDoList> {
    const toDoList = await this.toDoListRepository.preload({
      id: id,
      ...updateToDoListInput,
    });
    if (!toDoList) {
      throw new NotFoundException(`To-Do List #${id} not found`);
    }
    return this.toDoListRepository.save(toDoList);
  }

  async remove(id: string): Promise<ToDoList> {
    const toDoList = await this.findOne(id);
    await this.toDoListRepository.remove(toDoList);
    return {
      id: id,
      title: '',
      toDos: []
    };
  }
}
