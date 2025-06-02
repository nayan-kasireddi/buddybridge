import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':uid/role')
  async setRole(@Param('uid') uid: string, @Body('role') role: string) {
    await this.userService.assignRole(uid, role);
    return { message: `Role '${role}' assigned to user '${uid}'` };
  }

  @Get(':uid/role')
  async getRole(@Param('uid') uid: string) {
    const role = await this.userService.getRole(uid);
    return { uid, role };
  }
}

