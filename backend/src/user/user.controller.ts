import { Body, Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    const user = await this.userService.findUserById(id);
    return user;
  }
  @Get(':id/profil')
  async getUserProfileById(@Param('id') id: number) {
    const userProfile = await this.userService.findUserProfileById(id);
    return userProfile;
  }
  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.userService.findUserByUsername(username);
    return user;
  }
  @Get()
  async allUsers(): Promise<User[]> {
    return this.userService.allUsers();
  }
  @Post(':id/profile')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto ) {
    return this.userService.createUserProfile(id, createUserProfileDto)
  }
}