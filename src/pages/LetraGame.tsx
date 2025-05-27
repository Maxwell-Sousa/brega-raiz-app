
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, Star, Music } from "lucide-react";
import { Link } from "react-router-dom";

const LetraGame = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const songs = [
    {
      title: "Garçom",
      artist: "Reginaldo Rossi",
      lyric: "Na cama vazia eu ___________",
      answer: "choro",
      fullLyric: "Na cama vazia eu choro de saudades dela"
    },
    {
      title: "Eu Não Sou Cachorro, Não",
      artist: "Waldick Soriano",
      lyric: "Eu não sou cachorro, não, para viver ___________",
      answer: "mendigando",
      fullLyric: "Eu não sou cachorro, não, para viver mendigando"
    },
    {
      title: "Xirley",
      artist: "Gaby Amarantos",
      lyric: "Xirley, Xirley, você é ___________",
      answer: "especial",
      fullLyric: "Xirley, Xirley, você é especial"
    }
  ];

  const handleSubmit = () => {
    setShowResult(true);
    
    if (userAnswer.toLowerCase().trim() === songs[currentSong].answer.toLowerCase()) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentSong < songs.length - 1) {
        nextSong();
      } else {
        setGameFinished(true);
      }
    }, 3000);
  };

  const nextSong = () => {
    setCurrentSong(currentSong + 1);
    setUserAnswer("");
    setShowResult(false);
  };

  const resetGame = () => {
    setCurrentSong(0);
    setScore(0);
    setUserAnswer("");
    setShowResult(false);
    setGameFinished(false);
  };

  const isCorrect = userAnswer.toLowerCase().trim() === songs[currentSong].answer.toLowerCase();

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
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Music className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">Parabéns!</h1>
              
              <div className="mb-6">
                <div className="text-5xl font-bold text-green-400 mb-2">
                  {score}/{songs.length}
                </div>
                <p className="text-gray-400">Letras completadas</p>
              </div>
              
              <p className="text-xl text-gray-300 mb-8">
                {score === songs.length 
                  ? "Você conhece muito bem o brega! 🎵" 
                  : "Continue praticando para dominar as letras! 📚"}
              </p>
              
              <div className="space-y-4">
                <Button onClick={resetGame} className="w-full bg-green-600 hover:bg-green-700">
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
            <div className="flex items-center gap-2 px-3 py-1 bg-green-900/50 rounded-full">
              <Music className="w-4 h-4 text-green-300" />
              <span className="text-green-300">0:01</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-900/50 rounded-full">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-yellow-300">0.0/10 Corretos</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Frase {currentSong + 1} de {songs.length}</span>
          </div>
          <Progress 
            value={((currentSong + 1) / songs.length) * 100} 
            className="h-2 bg-gray-700"
          />
        </div>

        {/* Game */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">"{songs[currentSong].lyric}"</h2>
              <p className="text-gray-400">
                {songs[currentSong].title} - {songs[currentSong].artist}
              </p>
            </div>
            
            <div className="space-y-6">
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Complete a letra..."
                className="text-lg p-4 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                disabled={showResult}
              />
              
              {!showResult && (
                <Button 
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim()}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                >
                  Verificar Resposta
                </Button>
              )}
              
              {showResult && (
                <div className={`p-6 rounded-lg ${isCorrect ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                  <div className="text-center">
                    <h3 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {isCorrect ? 'Correto! 🎉' : 'Não foi dessa vez! 😔'}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Resposta correta: <strong>{songs[currentSong].answer}</strong>
                    </p>
                    <p className="text-gray-400 italic">
                      "{songs[currentSong].fullLyric}"
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

export default LetraGame;
