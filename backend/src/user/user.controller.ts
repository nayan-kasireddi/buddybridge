import { Controller, Post, Get, Param, Body, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

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

  @Get()
  async getAllUsers() {
    const users = await this.userService.findAllUsers();
    return users;
  }

  @Get('profiles')
  async getAllUserProfiles() {
    return this.userService.getAllUserProfiles();
  }

  // ✅ NEW: Save profile form data to Supabase
  @Post()
  @UseGuards(FirebaseAuthGuard)
  async createProfile(@Body() body: any, @Req() req: any) {
    const { role, name, location } = body;
    const uid = req.user.uid;

    return this.userService.createOrUpdateUserProfile(uid, role, name, location);
  }
}
