import { Injectable } from '@nestjs/common';
import { FirebaseAuthService } from '../firebase/firebase-auth.service';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);


@Injectable()
export class UserService {
  constructor(private readonly firebaseAuthService: FirebaseAuthService) {}

  async assignRole(uid: string, role: string) {
    const validRoles = ['urban_kid', 'rural_kid', 'mentor', 'admin'];
    if (!validRoles.includes(role)) {
      throw new Error('Invalid role');
    }
    return this.firebaseAuthService.setUserRole(uid, role);
  }

  async getRole(uid: string) {
    return this.firebaseAuthService.getUserRole(uid);
  }

  async findAllUsers() {
    return this.firebaseAuthService.listAllUsers();
  }

  async createOrUpdateUserProfile(uid: string, role: string, name: string, location: string) {
    const { error } = await supabase.from('user_profiles').upsert({
      uid,
      role,
      name,
      location,
    });

    if (error) {
      console.error('Error saving profile to Supabase:', error);
      throw new Error('Failed to save user profile');
    }

    return { message: 'User profile saved successfully' };
  }

  async getAllUserProfiles() {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching user profiles:', error);
      throw new Error('Failed to fetch user profiles');
    }

    return data || [];
  }

}


