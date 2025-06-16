import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class ProfileService {
  private supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || ''
  );

  async upsertProfile(profile: any) {
    const { 
      uid, 
      email, 
      role, 
      name, 
      age, 
      location, 
      language, 
      interests, 
      availability, 
      profileCompleted, 
      createdAt, 
      updatedAt 
    } = profile;

    const profileData = {
      uid,
      email,
      role,
      name,
      age,
      location,
      language,
      interests: interests || [], // Store as array directly
      availability,
      profileCompleted: profileCompleted !== undefined ? profileCompleted : true,
      createdAt: createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const { error } = await this.supabase
      .from('user_profiles')
      .upsert(profileData, { onConflict: 'uid' });

    if (error) {
      throw new Error('Failed to save profile: ' + error.message);
    }
    return { message: 'Profile saved successfully' };
  }

  async getProfile(uid: string) {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('*')
      .eq('uid', uid)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No profile found
        return null;
      }
      throw new Error('Failed to fetch profile: ' + error.message);
    }

    // Convert back to frontend format
    const profile = {
      ...data,
      interests: Array.isArray(data.interests) ? data.interests : [],
      profileCompleted: data.profileCompleted !== undefined ? data.profileCompleted : true
    };

    return profile;
  }
}