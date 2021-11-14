import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateToDoListInput {
  @Field(() => String)
  title: string;
}