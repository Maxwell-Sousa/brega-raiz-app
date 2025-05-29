import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QuizScore } from "@/entities/QuizScore";
import { ArrowLeft, Music, Star, CheckCircle, XCircle, Trophy, RotateCcw, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const phrases = [
  {
    incomplete: "Na cama vazia eu __________",
    completeWord: "choro sozinho",
    explanation: "Imagem típica do sofrimento amoroso brega.",
    hint: "A primeira palavra tem 5 letras e a segunda 7."
  },
  {
    incomplete: "Meu coração não __________ de te amar",
    completeWord: "cansa",
    explanation: "Expressão do amor incondicional, recorrente no brega.",
    hint: "A palavra tem 5 letras e rima com 'descansa'."
  },
  {
    incomplete: "Quem ama __________",
    completeWord: "sofre",
    explanation: "Síntese do sentimento brega: amor e dor inseparáveis.",
    hint: "A palavra tem 5 letras e descreve um sentimento de dor."
  },
  {
    incomplete: "Você jogou fora o amor que eu __________",
    completeWord: "te dei",
    explanation: "Tema clássico: desprezo e ingratidão amorosa.",
    hint: "Duas palavras curtas, a segunda é o passado do verbo 'dar'."
  },
  {
    incomplete: "Não vá embora, eu não __________ viver sem você",
    completeWord: "consigo",
    explanation: "Pedido dramático para evitar o fim do amor.",
    hint: "A palavra tem 7 letras e significa 'ser capaz'."
  },
  {
    incomplete: "Volta pra mim, eu te __________",
    completeWord: "perdoo",
    explanation: "Tema de reconciliação típico nas letras bregas.",
    hint: "A palavra tem 6 letras e significa 'desculpar'."
  },
  {
    incomplete: "Fiquei sozinho, perdido e __________",
    completeWord: "sem direção",
    explanation: "Sensação comum nas músicas de abandono amoroso.",
    hint: "Duas palavras, a primeira é uma preposição e a segunda tem 7 letras."
  },
  {
    incomplete: "Traíste meu amor, me deixou __________",
    completeWord: "sofrendo",
    explanation: "Ressentimento e dor são temas centrais no brega.",
    hint: "Gerúndio do verbo 'sofrer', tem 8 letras."
  },
  {
    incomplete: "O que eu mais temia __________",
    completeWord: "aconteceu",
    explanation: "Clímax dramático de letras típicas.",
    hint: "Passado do verbo 'acontecer', tem 9 letras."
  },
  {
    incomplete: "Por que você me deixou __________?",
    completeWord: "assim",
    explanation: "Pergunta típica do amante abandonado, marca do brega.",
    hint: "Palavra de 5 letras, um advérbio de modo."
  }
];

export default function CompleteLetraPage() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [hintUsedThisPhrase, setHintUsedThisPhrase] = useState(false);
  const [showHintText, setShowHintText] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);

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

  const useHint = () => {
    setHintUsedThisPhrase(true);
    setShowHintText(true);
  };

  const checkAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === phrases[currentPhrase].completeWord.toLowerCase();
    setIsCorrect(correct);
    if (correct) {
      setScore(score + (hintUsedThisPhrase ? 0.5 : 1)); // Pontuação reduzida se dica usada
    }
    setShowResult(true);
  };

  const handleNextPhrase = () => {
    if (currentPhrase < phrases.length - 1) {
      setCurrentPhrase(currentPhrase + 1);
      setUserAnswer("");
      setShowResult(false);
      setIsCorrect(false);
      setHintUsedThisPhrase(false); // Reseta
      setShowHintText(false);      // Reseta
    } else {
      setGameFinished(true);
    }
  };

  const saveScore = async () => {
    if (playerName.trim() && !scoreSaved) {
      try {
        await QuizScore.create({
          player_name: playerName,
          quiz_type: "letras",
          score: score,
          total_questions: phrases.length,
          completion_time: timeElapsed
        });
        setScoreSaved(true);
      } catch (error) {
        console.error("Erro ao salvar pontuação:", error);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentPhrase(0);
    setUserAnswer("");
    setShowResult(false);
    setIsCorrect(false);
    setScore(0);
    setTimeElapsed(0);
    setGameFinished(false);
    setPlayerName("");
    setHintUsedThisPhrase(false);
    setShowHintText(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / phrases.length) * 100;
    if (percentage >= 80) return "Você é um poeta do brega! 🎤";
    if (percentage >= 60) return "Mandou bem nas letras! Continue assim! ✨";
    if (percentage >= 40) return "Quase lá! Precisa ouvir mais brega! 🎧";
    return "Ops! Parece que o brega ainda é um mistério! 🤔";
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
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-white">Jogo Finalizado!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                  <div className="text-sm text-gray-400">Pontos</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-400">{Math.floor((score / phrases.length) * 100)}%</div>
                  <div className="text-sm text-gray-400">Precisão</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-pink-400">{Math.floor(timeElapsed/60)}:{(timeElapsed%60).toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-400">Tempo</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-6 rounded-xl border border-emerald-800/30">
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
                    disabled={!playerName.trim() || scoreSaved}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    {scoreSaved ? "Pontuação Salva!" : "Salvar Pontuação"}
                  </Button>
                  <Button onClick={restartQuiz} variant="outline" className="flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Jogar Novamente
                  </Button>
                </div>
                <Link to={createPageUrl("Jogos")} className="flex-1">
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
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={useHint}
              disabled={hintUsedThisPhrase || showResult}
              className="border-purple-600 text-purple-400 hover:bg-purple-600/10"
            >
              <Lightbulb className="w-4 h-4 mr-1" /> Dica (-0.5 pts)
            </Button>
            <Badge variant="outline" className="border-purple-600 text-purple-400">
              <Music className="w-4 h-4 mr-1" />
              {Math.floor(timeElapsed/60)}:{(timeElapsed%60).toString().padStart(2, '0')}
            </Badge>
            <Badge variant="outline" className="border-green-600 text-green-400">
              <Star className="w-4 h-4 mr-1" />
              {score.toFixed(1)}/{phrases.length} {/* Mostrar score com decimal */}
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
              className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentPhrase + 1) / phrases.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-center text-gray-400 mt-2">
            Frase {currentPhrase + 1} de {phrases.length}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhrase}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-black/40 border-gray-800 backdrop-blur-xl mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-white text-center leading-relaxed">
                  "{phrases[currentPhrase].incomplete}"
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Input
                  type="text"
                  placeholder="Complete a letra..."
                  value={userAnswer}
                  onChange={handleInputChange}
                  disabled={showResult}
                  className="text-center text-lg p-4 bg-gray-900/50 border-gray-700 text-white placeholder-gray-500"
                />
                {!showResult && (
                  <Button
                    onClick={checkAnswer}
                    disabled={!userAnswer.trim()}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-105"
                  >
                    Verificar Resposta
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {(showResult || showHintText) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card className={` backdrop-blur-xl ${showResult ? (isCorrect ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-700' : 'bg-gradient-to-r from-red-900/30 to-pink-900/30 border-red-700') : 'bg-blue-900/20 border-blue-700/30'}`}>
                <CardContent className="p-6 text-center">
                  {showResult && (
                    <>
                      <div className="flex items-center justify-center mb-2">
                        {isCorrect ? <CheckCircle className="w-8 h-8 text-green-400 mr-2" /> : <XCircle className="w-8 h-8 text-red-400 mr-2" />}
                        <h3 className={`text-xl font-semibold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                          {isCorrect ? "Resposta Correta!" : "Resposta Incorreta!"}
                        </h3>
                      </div>
                      {!isCorrect && (
                        <p className="text-gray-300 mb-2">
                          A resposta correta é: <strong className="text-yellow-400">{phrases[currentPhrase].completeWord}</strong>
                        </p>
                      )}
                      <p className="text-gray-400 text-sm flex items-start justify-center gap-1">
                        <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                        {phrases[currentPhrase].explanation}
                      </p>
                       {hintUsedThisPhrase && (
                        <p className="text-xs text-purple-400 mt-2">(Dica utilizada nesta frase)</p>
                      )}
                      <Button
                        onClick={handleNextPhrase}
                        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105"
                      >
                        {currentPhrase < phrases.length - 1 ? "Próxima Frase" : "Ver Resultado Final"}
                      </Button>
                    </>
                  )}
                  {showHintText && !showResult && (
                     <>
                      <h3 className="text-lg font-semibold text-purple-300 mb-2">Dica:</h3>
                      <p className="text-gray-300">{phrases[currentPhrase].hint}</p>
                     </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
