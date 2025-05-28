
import { supabase } from "@/integrations/supabase/client";

export class QuizQuestion {
  static async getAll() {
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching quiz questions from Supabase:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch quiz questions:', error);
      return [];
    }
  }

  static async getById(id: string) {
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching quiz question by id:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Failed to fetch quiz question by id:', error);
      return null;
    }
  }

  static async create(questionData: {
    question: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: number;
    explanation: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .insert([questionData])
        .select()
        .single();

      if (error) {
        console.error('Error creating quiz question:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Failed to create quiz question:', error);
      throw error;
    }
  }
}
