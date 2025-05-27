
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const QuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameFinished, setGameFinished] = useState(false);

  const questions = [
    {
      question: "Em que década surgiu o gênero brega no Brasil?",
      options: ["1950", "1960", "1970", "1980"],
      correct: 1,
      explanation: "O brega surgiu no final da década de 1960, durante um período de transformação social no Brasil."
    },
    {
      question: "Qual artista é conhecido como 'Rei do Brega'?",
      options: ["Nelson Ned", "Waldick Soriano", "Reginaldo Rossi", "Falcão"],
      correct: 2,
      explanation: "Reginaldo Rossi é mundialmente conhecido como o 'Rei do Brega' brasileiro."
    },
    {
      question: "Que tipo de sentimento é mais comum nas letras do brega?",
      options: ["Alegria", "Amor e dor", "Revolta", "Esperança"],
      correct: 1,
      explanation: "O brega é conhecido por abordar temas de amor, dor, traição e saudade de forma muito direta."
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, showResult, gameFinished]);

  const handleTimeUp = () => {
    setShowResult(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        nextQuestion();
      } else {
        setGameFinished(true);
      }
    }, 2000);
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        nextQuestion();
      } else {
        setGameFinished(true);
      }
    }, 2000);
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
    setGameFinished(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Você é um expert em brega! 🎵";
    if (percentage >= 60) return "Bom conhecimento sobre o brega! 👏";
    if (percentage >= 40) return "Você sabe algumas coisas sobre brega! 😊";
    return "Que tal estudar mais sobre o brega? 📚";
  };

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/jogos">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>

          {/* Results */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">Quiz Finalizado!</h1>
              
              <div className="mb-6">
                <div className="text-5xl font-bold text-yellow-400 mb-2">
                  {score}/{questions.length}
                </div>
                <p className="text-gray-400">Respostas corretas</p>
              </div>
              
              <p className="text-xl text-gray-300 mb-8">{getScoreMessage()}</p>
              
              <div className="space-y-4">
                <Button onClick={resetGame} className="w-full bg-blue-600 hover:bg-blue-700">
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
              <span className="text-purple-300">Dica (-0.5 pts)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-900/50 rounded-full">
              <Clock className="w-4 h-4 text-blue-300" />
              <span className="text-blue-300">0:01</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-900/50 rounded-full">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-yellow-300">0.0/15</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Pergunta {currentQuestion + 1} de {questions.length}</span>
            <span className="text-sm text-gray-400">{timeLeft}s</span>
          </div>
          <Progress 
            value={((currentQuestion + 1) / questions.length) * 100} 
            className="h-2 bg-gray-700"
          />
        </div>

        {/* Question */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-8 text-center">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-6 text-left justify-start text-lg ${
                    showResult
                      ? index === questions[currentQuestion].correct
                        ? "bg-green-600 hover:bg-green-600"
                        : selectedAnswer === index
                        ? "bg-red-600 hover:bg-red-600"
                        : "bg-gray-700 hover:bg-gray-700"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>
            
            {showResult && (
              <div className="mt-6 p-4 bg-blue-900/30 rounded-lg">
                <p className="text-blue-200">{questions[currentQuestion].explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizGame;
