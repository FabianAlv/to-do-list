import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { join } from 'path';
import { ToDoModule } from './to-do/to-do.module';
import { ToDoListModule } from './to-do-list/to-do-list.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'SuperSecret!23',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ToDoModule,
    ToDoListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
