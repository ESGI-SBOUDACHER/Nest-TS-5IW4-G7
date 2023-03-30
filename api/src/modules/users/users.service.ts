import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async createUser(params: {
    email: User['email'];
    password: User['password'];
    firstname: User['firstname'];
    lastname: User['lastname'];
  }) {
    const { email, password, firstname, lastname } = params;

    const user = await this.repository.createUser({
      data: {
        email,
        password,
        firstname,
        lastname,
      },
    });

    return user;
  }

  async getUsers() {
    const users = await this.repository.getUsers({});

    return users;
  }

  async getUser(params: { where: { email: User['email'] } }) {
    const { where } = params;
    const user = await this.repository.getUser({ where });
    return user;
  }
}
