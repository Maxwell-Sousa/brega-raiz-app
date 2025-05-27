
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";

const EmojiGame = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [hints, setHints] = useState(2);

  const challenges = [
    {
      emojis: "💔🍷🎵",
      answer: "garçom",
      hint: "Uma música famosa sobre sofrimento e bebida",
      artist: "Reginaldo Rossi"
    },
    {
      emojis: "🐕‍🦺❌🙏",
      answer: "eu não sou cachorro não",
      hint: "Uma das mais famosas do Waldick Soriano",
      artist: "Waldick Soriano"
    },
    {
      emojis: "👸🎭💃",
      answer: "xirley",
      hint: "Um nome feminino que virou hit",
      artist: "Gaby Amarantos"
    }
  ];

  const handleSubmit = () => {
    setShowResult(true);
    
    if (userAnswer.toLowerCase().trim() === challenges[currentChallenge].answer.toLowerCase()) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentChallenge < challenges.length - 1) {
        nextChallenge();
      } else {
        setGameFinished(true);
      }
    }, 3000);
  };

  const nextChallenge = () => {
    setCurrentChallenge(currentChallenge + 1);
    setUserAnswer("");
    setShowResult(false);
  };

  const resetGame = () => {
    setCurrentChallenge(0);
    setScore(0);
    setUserAnswer("");
    setShowResult(false);
    setGameFinished(false);
    setHints(2);
  };

  const useHint = () => {
    if (hints > 0) {
      setHints(hints - 1);
      // Show hint logic could be implemented here
    }
  };

  const isCorrect = userAnswer.toLowerCase().trim() === challenges[currentChallenge].answer.toLowerCase();

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/jogos">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-6">🎉</div>
              
              <h1 className="text-3xl font-bold mb-4">Desafio Concluído!</h1>
              
              <div className="mb-6">
                <div className="text-5xl font-bold text-orange-400 mb-2">
                  {score}/{challenges.length}
                </div>
                <p className="text-gray-400">Emojis decifrados</p>
              </div>
              
              <p className="text-xl text-gray-300 mb-8">
                {score === challenges.length 
                  ? "Você é um expert em emojis e brega! 🏆" 
                  : "Continue praticando para dominar os emojis! 🎯"}
              </p>
              
              <div className="space-y-4">
                <Button onClick={resetGame} className="w-full bg-orange-600 hover:bg-orange-700">
                  Jogar Novamente
                </Button>
                <Link to="/jogos">
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                    Voltar aos Jogos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/jogos">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-900/50 rounded-full">
              <span className="text-purple-300">Dica 1</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-900/50 rounded-full">
              <span className="text-purple-300">Dica 2</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-900/50 rounded-full">
              <span className="text-red-300">0:01</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-900/50 rounded-full">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-yellow-300">0 Pontos</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Desafio {currentChallenge + 1} de {challenges.length}</span>
          </div>
          <Progress 
            value={((currentChallenge + 1) / challenges.length) * 100} 
            className="h-2 bg-gray-700"
          />
        </div>

        {/* Game */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-8xl mb-6">{challenges[currentChallenge].emojis}</div>
              <h2 className="text-2xl font-bold mb-4">Adivinhe a música ou conceito brega!</h2>
            </div>
            
            <div className="space-y-6">
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Sua resposta..."
                className="text-lg p-4 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                disabled={showResult}
              />
              
              {!showResult && (
                <div className="space-y-4">
                  <Button 
                    onClick={handleSubmit}
                    disabled={!userAnswer.trim()}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3"
                  >
                    Verificar
                  </Button>
                  
                  {hints > 0 && (
                    <Button 
                      onClick={useHint}
                      variant="outline"
                      className="w-full border-purple-600 text-purple-300 hover:bg-purple-900/30"
                    >
                      Usar Dica ({hints} restantes)
                    </Button>
                  )}
                </div>
              )}
              
              {showResult && (
                <div className={`p-6 rounded-lg ${isCorrect ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                  <div className="text-center">
                    <h3 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {isCorrect ? 'Acertou! 🎉' : 'Quase lá! 🎯'}
                    </h3>
                    <p className="text-gray-300 mb-2">
                      Resposta: <strong>{challenges[currentChallenge].answer}</strong>
                    </p>
                    <p className="text-gray-400 text-sm">
                      Artista: {challenges[currentChallenge].artist}
                    </p>
                    <p className="text-gray-400 text-sm italic mt-2">
                      {challenges[currentChallenge].hint}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmojiGame;
