import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateToDoInput } from './create-to-do.input';

@InputType()
export class UpdateToDoInput extends PartialType(CreateToDoInput) {
  @Field(() => String)
  id: string;
}