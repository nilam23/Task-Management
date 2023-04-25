import { createParamDecorator } from '@nestjs/common';
import { User } from '../user.entity';

// decorator to fetch the user from incoming req
export const GetUser = createParamDecorator((data, req): User => {
  return req.args[0].user;
});
