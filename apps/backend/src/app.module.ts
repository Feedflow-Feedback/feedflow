import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './typeorm/entities/project';
import { ProjectsModule } from './projects/projects.module';
import { Feedback } from './typeorm/entities/feedback';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './typeorm/entities/user';
import { ConfigModule } from '@nestjs/config';
import { FeedbackModule } from './feedback/feedback.module';
import { Comment } from './typeorm/entities/comment';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      //local testing
      // host: 'localhost',
      port: process.env.MYSQL_PORT
        ? parseInt(process.env.MYSQL_PORT, 10)
        : 3306,
      username: process.env.MYSQL_USER,
      //local testing
      //password: 'hmJZKzJ&&rtYwq#ppB65',
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities: [Project, Feedback, User, Comment],
    }),
    TypeOrmModule.forFeature([Project, User, Feedback, Comment]),
    ProjectsModule,
    UsersModule,
    AuthModule,
    FeedbackModule,
    CommentModule,
  ],
})
export class AppModule {}
