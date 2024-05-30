import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  //todo users on database
  private readonly users = [
    { userId: 1, username: 'john', password: 'changeme' },
    { userId: 2, username: 'maria', password: 'guess' },
  ];

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async create(user: any) {
    this.users.push(user);
    return user;
  }
}
