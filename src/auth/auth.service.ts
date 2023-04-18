import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { DbErrorCodes } from './helpers/constants';
import { getSaltAndHashPassword } from './helpers/methods';

@Injectable()
export class AuthService {
  // Injection of the User repository into the service
  constructor(
    @InjectRepository(User) private readonly userService: Repository<User>,
  ) {}
  
  /**
   * @description
   * this service method takes the users credentials as input parameter,
   * hashes the plaintext password of the user with a unique salt
   * and then saves the user in the database
   * @param {AuthCredentialsDto} authCredentialsDto user's signup credentials
   * @returns
   */
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    try {
      const { salt, hashPassword } = await getSaltAndHashPassword(password);

      const user = new User();
      user.username = username;
      user.password = hashPassword;
      user.salt = salt;

      await user.save();
    } catch (error) {
      if (error.code === DbErrorCodes.DuplicateKey) { // violation of the unique constraint of the 'username' column
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
