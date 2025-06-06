import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../articles/entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
       type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'passwordcamilojpg',
      database: 'articles_db',
      entities: [Article],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class DatabaseModule {}