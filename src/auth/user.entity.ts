import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// defining the User entity with the id (auto-generated Primary Key), username and password
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
