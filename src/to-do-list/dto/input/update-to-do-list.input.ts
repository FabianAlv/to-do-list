import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateToDoListInput } from './create-to-do-list.input';


@InputType()
export class UpdateToDoListInput extends PartialType(CreateToDoListInput) {
  @Field(() => String)
  id: string;
}