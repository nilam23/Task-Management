import { Body, Controller, Post, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
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
    return this.authService.signUp(authCredentialsDto);
  }

  /**
   * @description
   * the controller method to sign in an existing user
   * @param {AuthCredentialsDto} authCredentialsDto user's signin credentials
   * @returns
   */
  @Post('/signin')
  async singIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<void> {
    const username = await this.authService.validateUserPassword(authCredentialsDto);
    
    if (!username) throw new UnauthorizedException('Invalid credentials');
  }
}
