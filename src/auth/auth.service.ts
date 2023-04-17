import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  // Injection of the User repository into the service
  constructor(
    @InjectRepository(User) private readonly userService: Repository<User>,
  ) {}
}
