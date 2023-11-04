import { Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/is-active/:email')
  isActive(@Param('email') email: string) {
    return this.userService.isActive(email);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, data: UserDto) {
    return this.userService.update(id, data);
  }
}
