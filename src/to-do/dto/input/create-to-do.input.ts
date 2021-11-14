import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateToDoInput {
  @Field(() => String)
  toDo: string;

  @Field(() => String)
  toDoListId: string;

  @Field(() => Boolean)
  completed: boolean;
}