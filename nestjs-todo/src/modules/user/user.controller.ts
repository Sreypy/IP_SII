import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // GET all users
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // GET one user by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  // CREATE user
  @Post()
  create(@Body() body: createUserDto) {
    return this.userService.create(body);
  }

  // UPDATE user by ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.userService.update(Number(id), body);
  }

  // DELETE user by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(Number(id));
  }
}