import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/tasks/task.entity';

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

  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[];

  /**
   * @description
   * takes the user's plaintext password of the user and compares it to the saved password
   * @param {string} password plaintext password provided by the user during sign in
   * @returns a boolean based on the comparison
   */
  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
