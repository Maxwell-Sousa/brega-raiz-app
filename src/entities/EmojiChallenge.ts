
import { supabase } from "@/integrations/supabase/client";

export class EmojiChallenge {
  static async getAll() {
    try {
      const { data, error } = await supabase
        .from('emoji_challenges')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching emoji challenges from Supabase:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch emoji challenges:', error);
      return [];
    }
  }

  static async getById(id: string) {
    try {
      const { data, error } = await supabase
        .from('emoji_challenges')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching emoji challenge by id:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Failed to fetch emoji challenge by id:', error);
      return null;
    }
  }

  static async create(challengeData: {
    emojis: string;
    correct_answer: string;
    artist?: string;
    explanation: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('emoji_challenges')
        .insert([challengeData])
        .select()
        .single();

      if (error) {
        console.error('Error creating emoji challenge:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Failed to create emoji challenge:', error);
      throw error;
    }
  }
}
