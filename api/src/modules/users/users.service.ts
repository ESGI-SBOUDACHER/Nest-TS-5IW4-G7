import { hashPassword } from '@api/common/utils/auth';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Role, User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { UsersDeleteDto, UsersGetDto, UsersUpdateDto } from './users.schema';
@Injectable()
export class UsersService {
  constructor(
    private repository: UsersRepository,
    @Inject(REQUEST) private readonly request: any, // A voir pour request sans le any
  ) {}

  async createUser(params: {
    email: User['email'];
    password: User['password'];
    firstname?: User['firstname'];
    lastname?: User['lastname'];
  }) {
    const { email, password, firstname, lastname } = params;

    const hashedPassword = await hashPassword(password);

    const user = await this.repository.createUser({
      data: {
        email,
        password: hashedPassword,
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

  async getUser(params: UsersGetDto) {
    const { email } = params;
    const user = await this.repository.getUser({ where: { email } });
    return user;
  }

  async updateUser(params: UsersUpdateDto) {
    const { email, ...dataToUpdate } = params;

    const userToUpdate = await this.repository.getUser({ where: { email } });
    const currentUser = this.request.user;

    if (!userToUpdate) {
      return UnauthorizedException;
    }

    // Check if user is role only user and himself and if he is trying to update roles
    if (
      currentUser.roles.includes([Role.USER]) &&
      (currentUser.email !== userToUpdate.email || params.roles)
    ) {
      throw new UnauthorizedException(
        'User is not authorized to update roles or other users than himself',
      );
    }

    // Check if user is admin and trying to update other admins
    if (
      currentUser.roles.includes(Role.ADMIN) &&
      userToUpdate.roles.includes(Role.ADMIN)
    ) {
      throw new UnauthorizedException(
        'User is not authorized to update other admins than himself',
      );
    }

    const user = await this.repository.updateUser({
      where: { email },
      data: dataToUpdate,
    });

    return user;
  }

  async deleteUser(params: UsersDeleteDto) {
    const { id } = params;

    // Check if user admin or user himself
    if (
      this.request.user.roles.includes(Role.USER) &&
      this.request.user.id !== id
    ) {
      throw new UnauthorizedException(
        'User is not authorized to delete this user',
      );
    }

    const user = await this.repository.deleteUser({ where: { id } });

    return user;
  }
}
