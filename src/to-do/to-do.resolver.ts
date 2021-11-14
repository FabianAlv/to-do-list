import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateToDoInput } from './dto/input/create-to-do.input';
import { UpdateToDoInput } from './dto/input/update-to-do.input';
import { ToDo } from './models/to-do';
import { ToDoService } from './to-do.service';

@Resolver(() => ToDo)
export class ToDoResolver {
  constructor(private readonly toDoService: ToDoService) { }

  @Mutation(() => ToDo)
  createToDo(@Args('createToDoInput') createToDoInput: CreateToDoInput) {
    return this.toDoService.create(createToDoInput);
  }

  @Query(() => ToDo, { name: 'toDo' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.toDoService.findOne(id);
  }

  @Mutation(() => ToDo)
  updateToDo(@Args('updateToDoInput') updateToDoInput: UpdateToDoInput) {
    return this.toDoService.update(updateToDoInput.id, updateToDoInput);
  }

  @Mutation(() => ToDo)
  removeToDo(@Args('id', { type: () => String }) id: string) {
    return this.toDoService.remove(id);
  }
}
