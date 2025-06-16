
import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class FeedbackService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );
  }

  async createFeedback(feedbackData: {
    sessionId?: string;
    fromUserId: string;
    toUserId?: string;
    rating: number;
    comment?: string;
    type?: string;
  }) {
    const { data, error } = await this.supabase
      .from('feedbacks')
      .insert([{
        session_id: feedbackData.sessionId,
        from_user_id: feedbackData.fromUserId,
        to_user_id: feedbackData.toUserId,
        rating: feedbackData.rating,
        comment: feedbackData.comment || '',
        type: feedbackData.type || 'session',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating feedback:', error);
      throw new Error('Failed to create feedback');
    }

    return data;
  }

  async getFeedbackByUserId(userId: string) {
    const { data, error } = await this.supabase
      .from('feedbacks')
      .select(`
        *,
        from_user:user_profiles!feedbacks_from_user_id_fkey(name, role),
        to_user:user_profiles!feedbacks_to_user_id_fkey(name, role)
      `)
      .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching feedback:', error);
      throw new Error('Failed to fetch feedback');
    }

    return data || [];
  }

  async getAllFeedback() {
    const { data, error } = await this.supabase
      .from('feedbacks')
      .select(`
        *,
        from_user:user_profiles!feedbacks_from_user_id_fkey(name, role),
        to_user:user_profiles!feedbacks_to_user_id_fkey(name, role)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all feedback:', error);
      throw new Error('Failed to fetch feedback');
    }

    return data || [];
  }

  async getFeedbackStats() {
    const { data, error } = await this.supabase
      .from('feedbacks')
      .select('rating');

    if (error) {
      console.error('Error fetching feedback stats:', error);
      throw new Error('Failed to fetch feedback stats');
    }

    const ratings = data || [];
    const totalRatings = ratings.length;
    const averageRating = totalRatings > 0 
      ? ratings.reduce((sum, item) => sum + item.rating, 0) / totalRatings 
      : 0;

    const ratingDistribution = {
      1: ratings.filter(r => r.rating === 1).length,
      2: ratings.filter(r => r.rating === 2).length,
      3: ratings.filter(r => r.rating === 3).length,
      4: ratings.filter(r => r.rating === 4).length,
      5: ratings.filter(r => r.rating === 5).length,
    };

    return {
      totalFeedback: totalRatings,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution
    };
  }
}
