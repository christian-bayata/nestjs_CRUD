import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userservice: UsersService) {}
  @Get()
  getUsers() {
    return 'hello';
  }

  @Post()
  async createUser(@Body('id') id: string, @Body('firstName') firstName: string, @Body('lastName') lastName: string, @Body('email') email: string, @Body('phone') phone: string, @Body('age') age: number) {
    const getUser = await this.userservice.createUser(id, firstName, lastName, email, phone, age);
    return { user: getUser };
  }

  @Get('all-users')
  async getAllUsers() {
    const allUsers = await this.userservice.getUsers();
    return { users: allUsers };
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    const getUser = await this.userservice.getUser(userId);
    if (!getUser) return 'This user does not exist';
    return { user: getUser };
  }

  @Put(':userId')
  async updateUser(@Param('userId') userId: string, @Body('firstName') firstName: string, @Body('lastName') lastName: string, @Body('email') email: string, @Body('phone') phone: string, @Body('age') age: number) {
    if (!userId) return 'This user does not exist';
    const updatedUser = await this.userservice.updateUser(userId, firstName, lastName, email, phone, age);
    return { user: updatedUser };
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string, @Body('firstName') firstName: string, @Body('lastName') lastName: string, @Body('email') email: string, @Body('phone') phone: string, @Body('age') age: number) {}
}
