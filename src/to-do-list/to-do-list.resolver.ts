import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateToDoListInput } from './dto/input/create-to-do-list.input';
import { UpdateToDoListInput } from './dto/input/update-to-do-list.input';
import { ToDoList } from './models/to-do-list';
import { ToDoListService } from './to-do-list.service';

@Resolver(() => ToDoList)
export class ToDoListResolver {
  constructor(private readonly toDoListService: ToDoListService) { }

  @Mutation(() => ToDoList)
  createToDoList(@Args('createToDoListInput') createToDoListInput: CreateToDoListInput) {
    return this.toDoListService.create(createToDoListInput);
  }

  @Query(() => [ToDoList], { name: 'toDoLists' })
  findAll() {
    return this.toDoListService.findAll();
  }

  @Query(() => ToDoList, { name: 'toDoList' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.toDoListService.findOne(id);
  }

  @Mutation(() => ToDoList)
  updateToDoList(@Args('updateToDoListInput') updateToDoListInput: UpdateToDoListInput) {
    return this.toDoListService.update(updateToDoListInput.id, updateToDoListInput);
  }

  @Mutation(() => ToDoList)
  removeToDoList(@Args('id', { type: () => String }) id: string) {
    return this.toDoListService.remove(id);
  }
}
