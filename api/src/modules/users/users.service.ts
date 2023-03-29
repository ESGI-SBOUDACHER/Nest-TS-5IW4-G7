import { Injectable } from '@nestjs/common';
import { User } from '../../models/interfaces/user';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  find(id: string): User {
    return this.users.find((user) => {
      console.log('TEST ID COMP', id, user.id);
      return user.id === id;
    });
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  update(id: string, user: User): User {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = user;
    return user;
  }

  delete(id: string): User {
    const index = this.users.findIndex((user) => user.id === id);
    const user = this.users[index];
    this.users.splice(index, 1);
    return user;
  }
}
