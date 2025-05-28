
import { supabase } from "@/integrations/supabase/client";

export class LyricsComplete {
  static async getAll() {
    try {
      const { data, error } = await supabase
        .from('lyrics_complete')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching lyrics complete from Supabase:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch lyrics complete:', error);
      return [];
    }
  }

  static async getById(id: string) {
    try {
      const { data, error } = await supabase
        .from('lyrics_complete')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching lyrics complete by id:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Failed to fetch lyrics complete by id:', error);
      return null;
    }
  }

  static async create(lyricsData: {
    song_title: string;
    artist: string;
    lyric_with_blank: string;
    correct_answer: string;
    hint?: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('lyrics_complete')
        .insert([lyricsData])
        .select()
        .single();

      if (error) {
        console.error('Error creating lyrics complete:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Failed to create lyrics complete:', error);
      throw error;
    }
  }
}
