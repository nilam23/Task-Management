import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

// user must signup with a username and a password
// the password must contain-
// 1. at least 1 upper case letter
// 2. at least 1 lower cas letter
// 3. at least 1 number or special character
export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password too weak' }
  )
  password: string;
}