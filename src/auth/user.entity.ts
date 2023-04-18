import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

// defining the User entity with the id (auto-generated Primary Key), username and password
@Entity()
@Unique(['username']) // unique column must be defined at the database level
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}
