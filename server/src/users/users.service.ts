import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(username: string): Promise<any | undefined> {
    const user = await this.userRepository.findOne(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(user: any) {
    const existingUser = await this.userRepository.findOne(user.username);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return this.userRepository.create(user);
  }

  async delete(username: string) {
    const user = await this.userRepository.findOne(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.delete(username);
    return user;
  }

  async findAll() {
    return this.userRepository.findAll();
  }
}
