import { Field, ObjectType } from "@nestjs/graphql";
import { ToDo } from "src/to-do/models/to-do";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ToDoList {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @OneToMany(() => ToDo, toDo => toDo.toDoList)
  @Field(() => [ToDo])
  toDos: ToDo[];
}