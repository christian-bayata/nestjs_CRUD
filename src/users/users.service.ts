import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async createUser(id: string, firstName: string, lastName: string, email: string, phone: string, age: number) {
    const userId = uuidv4();
    const createNewUser = new User(userId, firstName, lastName, email, phone, age);
    await this.users.push(createNewUser);
    return this.users;
  }

  async getUsers() {
    return [...this.users];
  }

  async getUser(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async updateUser(id: string, firstName: string, lastName: string, email: string, phone: string, age: number) {
    const findId = await this.users.find((user) => user.id === id);
    const newUserParams = { id, firstName, lastName, email, phone, age };
    const newUser = new User(id, newUserParams.firstName, newUserParams.lastName, newUserParams.email, newUserParams.phone, newUserParams.age);
    return newUser;
  }
}
