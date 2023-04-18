import * as bcrypt from 'bcrypt';

/**
 * this helper method takes a user's plaintext password and returns the hash value of the same along with the salt used
 * @param password user's plaintext password
 * @returns the hash value of the plaintext password along with the salt used
 */
export const getSaltAndHashPassword = async (password: string): Promise<{ salt: string, hashPassword: string}> => {
  const salt: string = await bcrypt.genSalt();

  const hashPassword: string = await bcrypt.hash(password, salt);

  return { salt, hashPassword };
}