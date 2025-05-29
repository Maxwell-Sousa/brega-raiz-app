import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuizScore } from "@/entities/QuizScore";
import { QuizQuestion } from "@/entities/QuizQuestion";
import { ArrowLeft, Clock, Star, CheckCircle, XCircle, Trophy, RotateCcw, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

// Fallback questions in case database is empty
const fallbackQuestions = [
  {
    question: "Qual artista é conhecido como o 'Rei do Brega'?",
    option_a: "Waldick Soriano",
    option_b: "Reginaldo Rossi", 
    option_c: "Nelson Ned",
    option_d: "Amado Batista",
    correct_answer: 1,
    explanation: "Reginaldo Rossi é amplamente reconhecido como o 'Rei do Brega', famoso por sucessos como 'Garçom' e 'A Raposa e as Uvas'."
  },
  {
    question: "Em que década o brega surgiu no Brasil?",
    option_a: "1950",
    option_b: "1960",
    option_c: "1970", 
    option_d: "1980",
    correct_answer: 1,
    explanation: "O brega surgiu no final da década de 1960, inicialmente nos cabarés e boates populares."
  }
];

export default function QuizGamePage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scoreSaved, setScoreSaved] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await QuizQuestion.getAll();
        if (data && data.length > 0) {
          setQuestions(data);
        } else {
          console.log('No questions found in database, using fallback questions');
          setQuestions(fallbackQuestions);
        }
      } catch (error) {
        console.error('Error loading questions:', error);
        setQuestions(fallbackQuestions);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameFinished) {
        setTimeElapsed(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [gameFinished]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;
    const isCorrect = selectedAnswer === questions[currentQuestion].correct_answer;
    if (isCorrect) {
      const points = hintUsed ? 1 : 2;
      setScore(score + points);
    }
    setShowResult(true);
  };

  const useHint = () => {
    if (showResult || hintUsed) return;
    setHintUsed(true);
    setShowHint(true);
  };

  const getHintText = () => {
    const q = questions[currentQuestion];
    const options = [q.option_a, q.option_b, q.option_c, q.option_d];
    const correctOption = options[q.correct_answer];
    return `A resposta correta começa com "${correctOption[0]}" e tem ${correctOption.length} letras.`;
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setHintUsed(false);
      setShowHint(false);
    } else {
      setGameFinished(true);
    }
  };

  const saveScore = async () => {
    if (playerName.trim() && !scoreSaved) {
      try {
        await QuizScore.create({
          player_name: playerName,
          quiz_type: "quiz",
          score: score,
          total_questions: questions.length * 2,
          completion_time: timeElapsed
        });
        setScoreSaved(true);
      } catch (error) {
        console.error("Erro ao salvar pontuação:", error);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeElapsed(0);
    setGameFinished(false);
    setPlayerName("");
    setHintUsed(false);
    setShowHint(false);
  };

  const getScoreMessage = () => {
    const maxPossibleScore = questions.length * 2;
    const percentage = (score / maxPossibleScore) * 100;
    if (percentage >= 80) return "Você é um verdadeiro expert em brega! 🎯";
    if (percentage >= 60) return "Muito bem! Você conhece bastante sobre brega! 👏";
    if (percentage >= 40) return "Bom trabalho! Continue estudando a história do brega! 📚";
    return "Que tal explorar mais sobre a história do brega? 🎵";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6 flex items-center justify-center">
        <div className="text-white">Carregando perguntas...</div>
      </div>
    );
  }

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
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-white">Quiz Finalizado!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{score}</div>
                  <div className="text-sm text-gray-400">Pontos</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">{Math.floor((score / (questions.length * 2)) * 100)}%</div>
                  <div className="text-sm text-gray-400">Precisão</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-pink-400">{Math.floor(timeElapsed/60)}:{(timeElapsed%60).toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-400">Tempo</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-6 rounded-xl border border-blue-800/30">
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
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
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
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={useHint}
              disabled={hintUsed || showResult}
              className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/10"
            >
              <Lightbulb className="w-4 h-4 mr-1" /> Dica
            </Button>
            <Badge variant="outline" className="border-pink-600 text-pink-400">
              <Clock className="w-4 h-4 mr-1" />
              {Math.floor(timeElapsed/60)}:{(timeElapsed%60).toString().padStart(2, '0')}
            </Badge>
            <Badge variant="outline" className="border-blue-600 text-blue-400">
              <Star className="w-4 h-4 mr-1" />
              {score} Pontos
            </Badge>
          </div>
        </motion.div>

        {showHint && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg text-center text-yellow-300"
          >
            <Lightbulb className="inline w-4 h-4 mr-1" /> {getHintText()}
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          className="mb-8"
        >
          <div className="bg-gray-800 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-center text-gray-400 mt-2">
            Pergunta {currentQuestion + 1} de {questions.length}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-black/40 border-gray-800 backdrop-blur-xl mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-white text-center">
                  {questions[currentQuestion]?.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions[currentQuestion] && [
                  questions[currentQuestion].option_a,
                  questions[currentQuestion].option_b,
                  questions[currentQuestion].option_c,
                  questions[currentQuestion].option_d
                ].map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                      selectedAnswer === index
                        ? 'bg-blue-600/20 border-blue-600 text-blue-300'
                        : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50'
                    } ${showResult && index === questions[currentQuestion].correct_answer
                        ? 'bg-green-600/20 border-green-600 text-green-300'
                        : showResult && selectedAnswer === index && index !== questions[currentQuestion].correct_answer
                        ? 'bg-red-600/20 border-red-600 text-red-300'
                        : ''
                    }`}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: showResult ? 1 : 0.98 }}
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium mr-3">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </div>
                  </motion.button>
                ))}
                {!showResult && (
                  <Button 
                    onClick={checkAnswer}
                    disabled={selectedAnswer === null}
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105"
                  >
                    Confirmar Resposta
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
              <Card className={`bg-gradient-to-r ${
                selectedAnswer === questions[currentQuestion].correct_answer
                  ? 'from-green-900/30 to-emerald-900/30 border-green-700'
                  : 'from-red-900/30 to-pink-900/30 border-red-700'
              } backdrop-blur-xl`}>
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    {selectedAnswer === questions[currentQuestion].correct_answer ? (
                      <CheckCircle className="w-8 h-8 text-green-400 mr-2" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-400 mr-2" />
                    )}
                    <h3 className={`text-xl font-semibold ${
                      selectedAnswer === questions[currentQuestion].correct_answer
                        ? 'text-green-300'
                        : 'text-red-300'
                    }`}>
                      {selectedAnswer === questions[currentQuestion].correct_answer ? 'Correto!' : 'Incorreto!'}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    {questions[currentQuestion].explanation}
                  </p>
                  {hintUsed && (
                    <p className="text-xs text-yellow-400 mb-4">(Dica utilizada - pontuação reduzida)</p>
                  )}
                  <Button 
                    onClick={handleNextQuestion}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105"
                  >
                    {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado Final'}
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
