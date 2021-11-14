import { Field, ObjectType } from "@nestjs/graphql";
import { ToDoList } from "src/to-do-list/models/to-do-list";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ToDo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String,)
  toDoListId: string;

  @Column()
  @Field(() => String)
  toDo: string;

  @Column()
  @Field(() => Boolean)
  completed: boolean;

  @ManyToOne(() => ToDoList, toDoList => toDoList.toDos)
  @Field(() => ToDoList)
  toDoList: ToDoList;
}