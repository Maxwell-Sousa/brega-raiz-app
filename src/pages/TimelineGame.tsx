
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const TimelineGame = () => {
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);

  const events = [
    "Evaldo Braga morre precocemente",
    "Banda Calypso alcança sucesso nacional", 
    "Amado Batista lança seu primeiro disco",
    "Brega funk vira febre nacional",
    "Brega reconhecido como patrimônio cultural de Recife",
    "Falcão lança 'Bonito, Lindo e Jóiado'",
    "Tecnobrega invade playlists digitais",
    "Explosão das festas de aparelhagem no Pará"
  ];

  const resetGame = () => {
    setGameFinished(false);
    setScore(0);
  };

  const finishGame = () => {
    setGameFinished(true);
    setScore(Math.floor(Math.random() * 8)); // Simulate score
  };

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
              <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">Timeline Organizada!</h1>
              
              <div className="mb-6">
                <div className="text-5xl font-bold text-red-400 mb-2">
                  {score}/10
                </div>
                <p className="text-gray-400">Eventos corretos</p>
              </div>
              
              <p className="text-xl text-gray-300 mb-8">
                {score >= 7 
                  ? "Excelente conhecimento da cronologia do brega! ⏰" 
                  : "Continue estudando a história do brega! 📚"}
              </p>
              
              <div className="space-y-4">
                <Button onClick={resetGame} className="w-full bg-red-600 hover:bg-red-700">
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
      <div className="max-w-4xl mx-auto">
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
              <span className="text-purple-300">Dica (Reduz Pontos)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-900/50 rounded-full">
              <Clock className="w-4 h-4 text-red-300" />
              <span className="text-red-300">0:02</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-900/50 rounded-full">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-yellow-300">0/10 Corretos</span>
            </div>
          </div>
        </div>

        {/* Game Instructions */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Linha do Tempo Interativa</h1>
            <p className="text-gray-300 text-center">
              Arraste e solte os eventos na ordem cronológica correta.
            </p>
          </CardContent>
        </Card>

        {/* Timeline Game */}
        <div className="space-y-4 mb-8">
          {events.map((event, index) => (
            <Card 
              key={index} 
              className="bg-gray-700/50 border-gray-600 hover:bg-gray-700/70 transition-all cursor-move"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center text-sm">
                    ⋮⋮
                  </div>
                  <p className="text-white">{event}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button onClick={finishGame} className="bg-red-600 hover:bg-red-700 px-8">
            Verificar Ordem
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8">
            Embaralhar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimelineGame;
