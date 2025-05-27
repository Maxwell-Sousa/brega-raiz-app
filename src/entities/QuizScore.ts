
import { supabase } from "@/integrations/supabase/client";

export class QuizScore {
  static async create(scoreData: {
    player_name: string;
    quiz_type: string;
    score: number;
    total_questions: number;
    completion_time: number;
  }) {
    try {
      const { data, error } = await supabase
        .from('quiz_scores')
        .insert([{
          player_name: scoreData.player_name,
          quiz_type: scoreData.quiz_type,
          score: scoreData.score,
          total_questions: scoreData.total_questions,
          completion_time: scoreData.completion_time,
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) {
        console.error('Error saving score to Supabase:', error);
        throw error;
      }

      console.log('Score saved successfully:', data);
      return data[0];
    } catch (error) {
      console.error('Failed to save score:', error);
      throw error;
    }
  }

  static async getTopScores(quizType?: string, limit: number = 10) {
    try {
      let query = supabase
        .from('quiz_scores')
        .select('*')
        .order('score', { ascending: false })
        .order('completion_time', { ascending: true })
        .limit(limit);

      if (quizType) {
        query = query.eq('quiz_type', quizType);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching scores from Supabase:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch scores:', error);
      return [];
    }
  }

  static async getPlayerScores(playerName: string) {
    try {
      const { data, error } = await supabase
        .from('quiz_scores')
        .select('*')
        .eq('player_name', playerName)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching player scores:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch player scores:', error);
      return [];
    }
  }
}
