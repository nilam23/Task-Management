import * as bcrypt from 'bcrypt';
import { JwtPayload } from './auth.interfaces';
import { JwtService } from '@nestjs/jwt/dist';

/**
 * @description
 * this helper method takes a user's plaintext password and returns the hash value of the same along with the salt used
 * @param {string} password user's plaintext password
 * @returns the hash value of the plaintext password along with the salt used
 */
export const getSaltAndHashPassword = async (password: string): Promise<{ salt: string, hashPassword: string}> => {
  const salt: string = await bcrypt.genSalt();

  const hashPassword: string = await bcrypt.hash(password, salt);

  return { salt, hashPassword };
}

/**
 * @description
 * this helper method creates a jwt token using username of the user as the payload
 * @param {string} username the username of the user to be used as the payload
 * @param {JwtService} jwtService the jwt service to sign a token using a payload
 * @returns the jwt access token generated
 */
export const getAccessToken = async (username: string, jwtService: JwtService): Promise<string> => {
  const payload: JwtPayload = { username };

  const accessToken: string = await jwtService.sign(payload);

  return accessToken;
}