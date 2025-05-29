import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface ScoreShareCardProps {
  score: number;
  totalQuestions: number;
  timeElapsed: number;
  gameType: string;
  playerName: string;
}

export function ScoreShareCard({ score, totalQuestions, timeElapsed, gameType, playerName }: ScoreShareCardProps) {
  const getGameTitle = () => {
    switch (gameType) {
      case "quiz":
        return "Quiz do Brega";
      case "letras":
        return "Complete a Letra";
      case "emojis":
        return "Desafio dos Emojis";
      case "timeline":
        return "Linha do Tempo";
      default:
        return "Jogo do Brega";
    }
  };

  return (
    <Card className="bg-black/40 border-gray-800 backdrop-blur-xl w-[400px]">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-white">{getGameTitle()}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-900/50 p-3 rounded-lg">
            <div className="text-xl font-bold text-pink-400">{score}</div>
            <div className="text-xs text-gray-400">Pontos</div>
          </div>
          <div className="bg-gray-900/50 p-3 rounded-lg">
            <div className="text-xl font-bold text-purple-400">{Math.floor((score/totalQuestions)*100)}%</div>
            <div className="text-xs text-gray-400">Precisão</div>
          </div>
          <div className="bg-gray-900/50 p-3 rounded-lg">
            <div className="text-xl font-bold text-blue-400">{Math.floor(timeElapsed/60)}:{(timeElapsed%60).toString().padStart(2, '0')}</div>
            <div className="text-xs text-gray-400">Tempo</div>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          Jogado por: {playerName}
        </div>
        <div className="text-xs text-pink-400">
          Jogue também em: sohabrega.com.br
        </div>
      </CardContent>
    </Card>
  );
} 