
export class QuizScore {
  static async create(scoreData: {
    player_name: string;
    quiz_type: string;
    score: number;
    total_questions: number;
    completion_time: number;
  }) {
    // For now, just console.log the score data
    // This would typically save to a database
    console.log("Saving score:", scoreData);
    
    // Simulate async operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(scoreData);
      }, 100);
    });
  }
}
