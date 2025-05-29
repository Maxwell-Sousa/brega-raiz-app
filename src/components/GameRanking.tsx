
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuizScore } from "@/entities/QuizScore";
import { Trophy, Medal, Clock, Star, User, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface GameRankingProps {
  selectedGameType: string;
}

const gameTypeNames = {
  quiz: "Quiz História",
  letras: "Complete a Letra", 
  emojis: "Desafio dos Emojis"
};

export default function GameRanking({ selectedGameType }: GameRankingProps) {
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScores = async () => {
      setLoading(true);
      try {
        const data = await QuizScore.getTopScores(selectedGameType, 10);
        setScores(data);
      } catch (error) {
        console.error("Erro ao carregar ranking:", error);
      } finally {
        setLoading(false);
      }
    };

    loadScores();
  }, [selectedGameType]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-orange-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">#{position}</span>;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return "border-yellow-500/30 bg-yellow-900/10";
      case 2:
        return "border-gray-400/30 bg-gray-900/10";
      case 3:
        return "border-orange-600/30 bg-orange-900/10";
      default:
        return "border-gray-700/30 bg-gray-900/5";
    }
  };

  if (loading) {
    return (
      <Card className="bg-black/40 border-gray-800 backdrop-blur-xl">
        <CardContent className="p-6 text-center">
          <div className="text-white">Carregando ranking...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/40 border-gray-800 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Ranking - {gameTypeNames[selectedGameType] || selectedGameType}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {scores.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <p>Nenhuma pontuação registrada ainda.</p>
            <p className="text-sm">Seja o primeiro a jogar!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {scores.map((score, index) => (
              <motion.div
                key={score.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${getPositionColor(index + 1)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getPositionIcon(index + 1)}
                    <div>
                      <p className="font-medium text-white">{score.player_name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Star className="w-3 h-3" />
                        <span>{score.score}</span>
                        <span>/</span>
                        <span>{score.total_questions}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(score.completion_time)}</span>
                    </div>
                    <Badge variant="outline" className="border-green-600 text-green-400">
                      {Math.floor((score.score / score.total_questions) * 100)}%
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
