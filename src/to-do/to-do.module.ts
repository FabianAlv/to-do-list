import { Module } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { ToDoResolver } from './to-do.resolver';
import { ToDo } from './models/to-do';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo])],
  providers: [ToDoService, ToDoResolver]
})
export class ToDoModule { }
