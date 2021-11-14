import { Module } from '@nestjs/common';
import { ToDoListService } from './to-do-list.service';
import { ToDoListResolver } from './to-do-list.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoList } from './models/to-do-list';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoList])],
  providers: [ToDoListService, ToDoListResolver]
})
export class ToDoListModule { }
