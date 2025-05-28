
import { supabase } from "@/integrations/supabase/client";

export class TimelineEvent {
  static async getAll() {
    try {
      const { data, error } = await supabase
        .from('timeline_events')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) {
        console.error('Error fetching timeline events from Supabase:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch timeline events:', error);
      return [];
    }
  }

  static async getById(id: string) {
    try {
      const { data, error } = await supabase
        .from('timeline_events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching timeline event by id:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Failed to fetch timeline event by id:', error);
      return null;
    }
  }

  static async create(eventData: {
    year: number;
    event_title: string;
    description: string;
    order_position: number;
  }) {
    try {
      const { data, error } = await supabase
        .from('timeline_events')
        .insert([eventData])
        .select()
        .single();

      if (error) {
        console.error('Error creating timeline event:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Failed to create timeline event:', error);
      throw error;
    }
  }
}
