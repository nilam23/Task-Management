import { Body, Controller, Logger, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  // adding logger
  private logger = new Logger();

  constructor(
    private authService: AuthService,
  ) {}

  /**
   * @description
   * the controller method to sign up a new user
   * @param {AuthCredentialsDto} authCredentialsDto user's signup credentials
   * @returns
   */
  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<void> {
    this.logger.verbose(`A new user is signing up`);

    return this.authService.signUp(authCredentialsDto);
  }

  /**
   * @description
   * the controller method to sign in an existing user
   * @param {AuthCredentialsDto} authCredentialsDto user's signin credentials
   * @returns the access token generated
   */
  @Post('/signin')
  async singIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    this.logger.verbose(`A user is trying to sign in`);

    return this.authService.signIn(authCredentialsDto);
  }
}
