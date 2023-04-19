import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt/dist';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { DbErrorCodes } from './helpers/auth.constants';
import { getAccessToken, getSaltAndHashPassword } from './helpers/auth.methods';
import { JwtPayload } from './helpers/auth.interfaces';

@Injectable()
export class AuthService {
  // Injection of the User repository into the service
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}
  
  /**
   * @description
   * this service method takes the users sign up credentials as input parameter,
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

  /**
   * @description
   * this service method takes the user's sign in credentials as input parameter
   * and the checks the authenticity of the credentials
   * if auth check is successful, an access token is generated for the user
   * @param {AuthCredentialsDto} authCredentialsDto user's signup credentials
   * @returns the jwt access token
   */
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    try {
      const user = await this.userRepository.findOneBy({ username });

      if (!user || !await user.validatePassword(password)) throw new UnauthorizedException('Invalid credentials');

      const accessToken: string = await getAccessToken(username, this.jwtService);

      return { accessToken };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
