import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// defining the TypeORM configs
export const typeOrmConfigs = (): TypeOrmModuleOptions => {
  const host = process.env.DB_HOST;
  const port = parseInt(process.env.DB_PORT);
  const username = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;

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
