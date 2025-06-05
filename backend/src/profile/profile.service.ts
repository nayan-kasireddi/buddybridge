import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class ProfileService {
  private supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || ''
  );

  async upsertProfile(profile: any) {
    const { uid, ...data } = profile;

    const { error } = await this.supabase
      .from('user_profiles')
      .upsert({ uid, ...data }, { onConflict: 'uid' });

    if (error) {
      throw new Error('Failed to save profile: ' + error.message);
    }
    return { message: 'Profile saved successfully' };
  }

  async getProfile(uid: string) {
    // Implementation for getting profile
    // This should query your database for the user profile
    // For now, returning null to indicate profile not found
    return null;
  }
}