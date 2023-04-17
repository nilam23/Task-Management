import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { TasksModule } from './tasks/tasks.module';
import { typeOrmConfigs } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfigs()),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
