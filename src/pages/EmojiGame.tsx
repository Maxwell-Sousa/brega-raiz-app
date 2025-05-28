import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QuizScore } from "@/entities/QuizScore";
import { ArrowLeft, Smile, Star, CheckCircle, XCircle, Trophy, RotateCcw, HelpCircle, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const emojiChallenges = [
  { emojis: "💔🍷🎶", answer: "Garçom", artist: "Reginaldo Rossi", explanation: "Coração partido, bebida e música — símbolos clássicos dessa canção icônica.", hint1: "Artista: Reginaldo Rossi", hint2: "Começa com 'G' e tem 6 letras." },
  { emojis: "📞💔😭", answer: "Alô", artist: "Bruno & Marrone", explanation: "O telefonema e a dor do abandono são típicos nesse sucesso romântico.", hint1: "Artista: Bruno & Marrone", hint2: "Palavra curta, saudação ao telefone." },
  { emojis: "💃🎹🔊", answer: "Tecnobrega", artist: "Gênero", explanation: "Dança, teclado e som alto — marcas das festas de aparelhagem.", hint1: "Gênero musical do Pará.", hint2: "Mistura 'Tecno' com um estilo popular." },
  { emojis: "🌹💋🎙️", answer: "Estética brega", artist: "Conceito", explanation: "Rosa, beijo e microfone — a performance dramática e romântica do brega.", hint1: "Relacionado à aparência e ao visual.", hint2: "Duas palavras, a segunda é o nome do gênero." },
  { emojis: "💑➡️💔😭", answer: "Meu Ex-Amor", artist: "Amado Batista", explanation: "A passagem do amor ao sofrimento — típica narrativa brega.", hint1: "Artista: Amado Batista", hint2: "Título com três palavras, sobre um relacionamento passado." },
  { emojis: "🎤🎭✨", answer: "Show brega", artist: "Performance", explanation: "Cenas teatrais, brilho e emoções fortes caracterizam as apresentações.", hint1: "Evento ao vivo com música.", hint2: "A segunda palavra é o nome do gênero." },
  { emojis: "🕺🪩🔊", answer: "Festa de aparelhagem", artist: "Evento", explanation: "Dança, iluminação e som potente — essência do tecnobrega no Pará.", hint1: "Evento típico do tecnobrega.", hint2: "Nome composto, envolve equipamentos de som." },
  { emojis: "🎧🎛️💿", answer: "DJ de tecnobrega", artist: "Profissão", explanation: "A figura do DJ como responsável pela batida e remix no tecnobrega.", hint1: "Quem comanda o som nas festas.", hint2: "Profissional + gênero musical." },
  { emojis: "👠🌹💎", answer: "Musa brega", artist: "Arquétipo", explanation: "Símbolos clássicos da mulher idealizada no brega — sensualidade e glamour.", hint1: "Figura feminina inspiradora.", hint2: "A segunda palavra é o nome do gênero." },
  { emojis: "💍💔🥃", answer: "Fio de Cabelo", artist: "Chitãozinho & Xororó", explanation: "Casamento, traição e dor — tema também muito associado ao brega romântico.", hint1: "Artista: Chitãozinho & Xororó", hint2: "Título com três palavras, algo pequeno encontrado." }
];

export default function DesafioEmojisPage() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [showHintText, setShowHintText] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameFinished) {
        setTimeElapsed(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [gameFinished]);

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const checkAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === emojiChallenges[currentChallenge].answer.toLowerCase();
    setIsCorrect(correct);
    if (correct) {
      setScore(score + (hintUsed ? 1 : 2)); 
    }
    setShowResult(true);
  };

  const useHint = () => {
    if (showResult) return;
    
    if (!hintUsed) {
      setHintLevel(1);
      setShowHintText(emojiChallenges[currentChallenge].hint1);
      setHintUsed(true);
    } else if (hintLevel === 1) {
      setHintLevel(2);
      setShowHintText(emojiChallenges[currentChallenge].hint2);
    }
  };
  
  const handleNextChallenge = () => {
    if (currentChallenge < emojiChallenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setUserAnswer("");
      setShowResult(false);
      setIsCorrect(false);
      setHintUsed(false);
      setHintLevel(0);
      setShowHintText("");
    } else {
      setGameFinished(true);
    }
  };
  
  const saveScore = async () => {
    if (playerName.trim()) {
      try {
        await QuizScore.create({
          player_name: playerName,
          quiz_type: "emojis",
          score: score,
          total_questions: emojiChallenges.length * 2,
          completion_time: timeElapsed
        });
      } catch (error) {
        console.error("Erro ao salvar pontuação:", error);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentChallenge(0);
    setUserAnswer("");
    setShowResult(false);
    setIsCorrect(false);
    setHintUsed(false);
    setHintLevel(0);
    setShowHintText("");
    setScore(0);
    setTimeElapsed(0);
    setGameFinished(false);
    setPlayerName("");
  };

  const getScoreMessage = () => {
    const maxPossibleScore = emojiChallenges.length * 2;
    const percentage = (score / maxPossibleScore) * 100;
    if (percentage >= 80) return "Você decifra emojis como ninguém! 🏆";
    if (percentage >= 60) return "Ótima intuição com os emojis! 😉";
    if (percentage >= 40) return "Alguns emojis foram um desafio, hein? 🤔";
    return "Os emojis do brega te pegaram! 😂";
  };

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="bg-black/40 border-gray-800 backdrop-blur-xl">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-white">Desafio Finalizado!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
             <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{score}</div>
                  <div className="text-sm text-gray-400">Pontos</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{Math.floor((score / (emojiChallenges.length * 2)) * 100)}%</div>
                  <div className="text-sm text-gray-400">Precisão</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-pink-400">{Math.floor(timeElapsed/60)}:{(timeElapsed%60).toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-400">Tempo</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 p-6 rounded-xl border border-yellow-800/30">
                <p className="text-xl text-white font-medium">{getScoreMessage()}</p>
              </div>

              <div className="space-y-4">
                 <input
                  type="text"
                  placeholder="Digite seu nome para salvar"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400"
                />
                <div className="flex gap-3">
                  <Button 
                    onClick={saveScore}
                    disabled={!playerName.trim()}
                    className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Salvar Pontuação
                  </Button>
                  <Button onClick={restartQuiz} variant="outline" className="flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Jogar Novamente
                  </Button>
                </div>
                <Link to={createPageUrl("Jogos")}>
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar aos Jogos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link to={createPageUrl("Jogos")}>
            <Button variant="outline" className="border-gray-700">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={useHint}
              disabled={hintLevel >= 2 || showResult}
              className="border-blue-600 text-blue-400 hover:bg-blue-600/10 text-xs px-2 py-1" 
            >
              <HelpCircle className="w-3 h-3 mr-1" /> Dica
            </Button>
            <Badge variant="outline" className="border-pink-600 text-pink-400">
              <Smile className="w-4 h-4 mr-1" />
              {Math.floor(timeElapsed/60)}:{(timeElapsed%60).toString().padStart(2, '0')}
            </Badge>
            <Badge variant="outline" className="border-yellow-600 text-yellow-400">
              <Star className="w-4 h-4 mr-1" />
              {score} Pontos
            </Badge>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          className="mb-8"
        >
          <div className="bg-gray-800 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-yellow-600 to-orange-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentChallenge + 1) / emojiChallenges.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-center text-gray-400 mt-2">
            Desafio {currentChallenge + 1} de {emojiChallenges.length}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentChallenge}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-black/40 border-gray-800 backdrop-blur-xl mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-5xl md:text-6xl text-white py-6">
                  {emojiChallenges[currentChallenge].emojis}
                </CardTitle>
                <p className="text-gray-400">Adivinhe a música ou conceito brega!</p>
                 {showHintText && !showResult && (
                  <div className="mt-2 p-3 bg-blue-900/20 border border-blue-700 rounded-lg text-center">
                    <p className="text-blue-300 text-sm">
                      <Lightbulb className="inline w-4 h-4 mr-1 text-yellow-400" /> 
                      {showHintText} (Usar dica reduzirá sua pontuação)
                    </p>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <Input
                  type="text"
                  placeholder="Sua resposta..."
                  value={userAnswer}
                  onChange={handleInputChange}
                  disabled={showResult}
                  className="text-center text-lg p-4 bg-gray-900/50 border-gray-700 text-white placeholder-gray-500"
                />
                {!showResult && (
                    <Button 
                      onClick={checkAnswer}
                      disabled={!userAnswer.trim()}
                      className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:scale-105"
                    >
                      Verificar
                    </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card className={`bg-gradient-to-r ${isCorrect ? 'from-green-900/30 to-emerald-900/30 border-green-700' : 'from-red-900/30 to-pink-900/30 border-red-700'} backdrop-blur-xl`}>
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    {isCorrect ? <CheckCircle className="w-8 h-8 text-green-400 mr-2" /> : <XCircle className="w-8 h-8 text-red-400 mr-2" />}
                    <h3 className={`text-xl font-semibold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                      {isCorrect ? "Correto!" : "Incorreto!"}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-2">
                    A resposta é: <strong className="text-yellow-400">{emojiChallenges[currentChallenge].answer}</strong> ({emojiChallenges[currentChallenge].artist})
                  </p>
                  <p className="text-gray-400 text-sm flex items-start justify-center gap-1">
                     <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                    {emojiChallenges[currentChallenge].explanation}
                  </p>
                  {hintUsed && (
                     <p className="text-xs text-purple-400 mt-2">(Você usou uma dica neste desafio)</p>
                  )}
                  <Button 
                    onClick={handleNextChallenge}
                    className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105"
                  >
                    {currentChallenge < emojiChallenges.length - 1 ? "Próximo Desafio" : "Ver Resultado Final"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
