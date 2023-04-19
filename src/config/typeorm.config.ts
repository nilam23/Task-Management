import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// defining the TypeORM configs
export const typeOrmConfigs = (): TypeOrmModuleOptions => {
  const host: string = process.env.DB_HOST;
  const port: number = parseInt(process.env.DB_PORT);
  const username: string = process.env.DB_USER;
  const password: string = process.env.DB_PASSWORD;
  const database: string = process.env.DB_NAME;

  const dbConfigs: TypeOrmModuleOptions = {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    entities: [__dirname + '/../**/*.entity.{js, ts}'],
    synchronize: true,
  }

  return dbConfigs;
}
