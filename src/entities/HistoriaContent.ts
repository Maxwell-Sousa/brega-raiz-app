
import { supabase } from "@/integrations/supabase/client";

export class HistoriaContent {
  static async getAll() {
    try {
      const { data, error } = await supabase
        .from('historia_content')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching historia content from Supabase:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch historia content:', error);
      return [];
    }
  }

  static async getByEraKey(eraKey: string) {
    try {
      const { data, error } = await supabase
        .from('historia_content')
        .select('*')
        .eq('era_key', eraKey)
        .single();

      if (error) {
        console.error('Error fetching historia content by era:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Failed to fetch historia content by era:', error);
      return null;
    }
  }
}
