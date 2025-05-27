
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuizScore } from "@/entities/QuizScore";
import { ArrowLeft, Clock, Star, CheckCircle, XCircle, Trophy, RotateCcw, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function QuizHistoriaPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [hintUsedThisQuestion, setHintUsedThisQuestion] = useState(false);
  const [showHintText, setShowHintText] = useState(false);

  const questions = [
    {
      question: "Em que década surgiu o gênero brega no Brasil?",
      options: ["1950", "1960", "1970", "1980"],
      correct: 1,
      explanation: "O brega surgiu na década de 1960, emergindo das periferias urbanas como expressão da classe trabalhadora.",
      hint: "Foi uma década de grandes transformações culturais no Brasil e no mundo."
    },
    {
      question: "Quem é conhecido como o 'Rei do Brega'?",
      options: ["Waldick Soriano", "Reginaldo Rossi", "Falcão", "Amado Batista"],
      correct: 1,
      explanation: "Reginaldo Rossi é amplamente reconhecido como o 'Rei do Brega', autor de clássicos como 'Garçom'.",
      hint: "Seu maior sucesso é sobre um pedido a um funcionário de bar."
    },
    {
      question: "Qual música de Waldick Soriano se tornou um clássico?",
      options: ["Garçom", "Eu Não Sou Cachorro, Não", "Rindo à Toa", "A Raposa e as Uvas"],
      correct: 1,
      explanation: "'Eu Não Sou Cachorro, Não' é uma das mais famosas canções de Waldick Soriano, o Príncipe do Brega.",
      hint: "O título da música é uma afirmação de sua dignidade."
    },
    {
      question: "O que caracteriza principalmente as letras do brega?",
      options: ["Temas políticos", "Amores e desilusões", "Crítica social", "Natureza"],
      correct: 1,
      explanation: "As letras do brega são conhecidas por abordar temas românticos, amores não correspondidos e desilusões.",
      hint: "Sentimentos intensos e muitas vezes sofridos são o foco."
    },
    {
      question: "Qual artista é famoso por suas performances extravagantes?",
      options: ["Reginaldo Rossi", "Waldick Soriano", "Falcão", "Nelson Gonçalves"],
      correct: 2,
      explanation: "Falcão, conhecido como 'O Roba a Cena', é famoso por suas performances teatrais e extravagantes.",
      hint: "Ele usa roupas coloridas e um girassol no paletó."
    },
    {
      question: "Quem popularizou a música 'A Raposa e as Uvas'?",
      options: ["Waldick Soriano", "Falcão", "Reginaldo Rossi", "Amado Batista"],
      correct: 2,
      explanation: "Outro clássico de Reginaldo Rossi, 'A Raposa e as Uvas' utiliza uma metáfora romântica.",
      hint: "O artista é o mesmo da pergunta sobre o 'Rei do Brega'."
    },
    {
      question: "O tecnobrega surgiu fortemente em qual estado brasileiro?",
      options: ["São Paulo", "Bahia", "Pernambuco", "Pará"],
      correct: 3,
      explanation: "O Pará, especialmente Belém, foi o berço do tecnobrega, com suas famosas festas de aparelhagem.",
      hint: "Este estado é conhecido por suas grandes festas com equipamentos de som potentes."
    },
    {
      question: "Qual destes artistas também é conhecido pelo brega humorístico?",
      options: ["Amado Batista", "Reginaldo Rossi", "Falcão", "Bartô Galeno"],
      correct: 2,
      explanation: "Falcão é mestre em misturar o brega com humor ácido e irreverente em suas canções e performances.",
      hint: "É o mesmo artista da pergunta sobre performances extravagantes."
    },
    {
      question: "Que instrumento eletrônico é característico no tecnobrega?",
      options: ["Guitarra Elétrica", "Bateria Acústica", "Teclado Sintetizador", "Saxofone"],
      correct: 2,
      explanation: "O teclado sintetizador é uma marca registrada para criar as batidas e os efeitos sonoros no tecnobrega.",
      hint: "Pense em sons modernos e batidas dançantes."
    },
    {
      question: "Qual música de Amado Batista fala de traição amorosa?",
      options: ["Princesa", "Meu Ex-Amor", "Secretária", "Folha Seca"],
      correct: 2,
      explanation: "'Secretária' é um dos grandes sucessos de Amado Batista que aborda o tema do amor e da traição.",
      hint: "O título refere-se a uma profissão."
    },
    {
      question: "O brega é considerado patrimônio cultural de qual cidade?",
      options: ["Rio de Janeiro", "Salvador", "Belém", "Recife"],
      correct: 3,
      explanation: "Em 2019, a cidade de Recife reconheceu oficialmente o brega como patrimônio cultural imaterial.",
      hint: "Esta cidade é famosa pelo frevo e maracatu, mas também valoriza o brega."
    },
    {
      question: "Em que década surgiu o brega funk?",
      options: ["1990", "2000", "2010", "2020"],
      correct: 2,
      explanation: "O brega funk ganhou força e popularidade nacional nos anos 2010, especialmente em Recife.",
      hint: "É uma fusão mais recente que explodiu com a internet."
    },
    {
      question: "Quais são dois dos principais temas do brega?",
      options: ["Amizade e Viagens", "Trabalho e Cotidiano", "Amor e Sofrimento", "Festa e Alegria"],
      correct: 2,
      explanation: "A lírica do brega gira predominantemente em torno de emoções passionais, o amor e a dor da perda.",
      hint: "Sentimentos intensos, muitas vezes dramáticos."
    },
    {
      question: "Qual estilo musical influenciou diretamente o tecnobrega?",
      options: ["Samba", "Rock Progressivo", "Música Eletrônica", "Jazz"],
      correct: 2,
      explanation: "O tecnobrega é uma fusão do brega tradicional com diversos elementos da música eletrônica.",
      hint: "Pense em batidas computadorizadas e sintetizadores."
    },
    {
      question: "Que cantor ficou conhecido como 'Ídolo Negro' do brega?",
      options: ["Luiz Ayrão", "Evaldo Braga", "Benito di Paula", "Agepê"],
      correct: 1,
      explanation: "Evaldo Braga, com sua voz marcante, foi um pioneiro do brega e muito popular nos anos 70, sendo chamado de 'Ídolo Negro'.",
      hint: "Seu sobrenome é comum e ele teve uma carreira curta, mas impactante."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameFinished) {
        setTimeElapsed(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [gameFinished]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const useHint = () => {
    setHintUsedThisQuestion(true);
    setShowHintText(true);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(prevScore => prevScore + (hintUsedThisQuestion ? 0.5 : 1)); // Pontuação reduzida se dica usada
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setHintUsedThisQuestion(false); // Reseta o uso da dica
        setShowHintText(false);      // Reseta a exibição da dica
      } else {
        setGameFinished(true);
      }
    }, 2500); // Aumentado tempo para ler explicação e dica
  };

  const saveScore = async () => {
    if (playerName.trim()) {
      try {
        await QuizScore.create({
          player_name: playerName,
          quiz_type: "historia",
          score: score,
          total_questions: questions.length, // Total de pontos possíveis sem dicas
          completion_time: timeElapsed
        });
        // Adicionar feedback de sucesso ou erro ao usuário, se necessário
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
    setHintUsedThisQuestion(false);
    setShowHintText(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Você é um verdadeiro conhecedor do brega! 🎵";
    if (percentage >= 60) return "Bom conhecimento! Continue estudando o brega! 👏";
    if (percentage >= 40) return "Não foi mal, mas dá pra melhorar! 📚";
    return "Que tal conhecer mais sobre o brega? 💡";
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
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-red-600 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-white">Quiz Finalizado!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{score.toFixed(1)}</div> {/* Mostrar score com decimal */}
                  <div className="text-sm text-gray-400">Pontos</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{Math.floor((score/questions.length)*100)}%</div>
                  <div className="text-sm text-gray-400">Precisão</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{Math.floor(timeElapsed/60)}:{(timeElapsed%60).toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-400">Tempo</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-900/20 to-yellow-900/20 p-6 rounded-xl border border-red-800/30">
                <p className="text-xl text-white font-medium">{getScoreMessage()}</p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Digite seu nome para salvar a pontuação"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400"
                />
                <div className="flex gap-3">
                  <Button 
                    onClick={saveScore}
                    disabled={!playerName.trim()}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
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
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={useHint}
              disabled={hintUsedThisQuestion || showResult}
              className="border-purple-600 text-purple-400 hover:bg-purple-600/10"
            >
              <Lightbulb className="w-4 h-4 mr-1" /> Dica (-0.5 pts)
            </Button>
            <Badge variant="outline" className="border-blue-600 text-blue-400">
              <Clock className="w-4 h-4 mr-1" />
              {Math.floor(timeElapsed/60)}:{(timeElapsed%60).toString().padStart(2, '0')}
            </Badge>
            <Badge variant="outline" className="border-yellow-600 text-yellow-400">
              <Star className="w-4 h-4 mr-1" />
              {score.toFixed(1)}/{questions.length} {/* Mostrar score com decimal */}
            </Badge>
          </div>
        </motion.div>

        {/* Progress Bar */}
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

        {/* Question Card */}
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
                <CardTitle className="text-2xl text-white leading-relaxed">
                  {questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    disabled={showResult}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                      showResult
                        ? index === questions[currentQuestion].correct
                          ? 'bg-green-900/30 border-green-600 text-green-300'
                          : index === selectedAnswer && selectedAnswer !== questions[currentQuestion].correct
                          ? 'bg-red-900/30 border-red-600 text-red-300'
                          : 'bg-gray-800/50 border-gray-700 text-gray-400'
                        : selectedAnswer === index
                        ? 'bg-blue-900/30 border-blue-600 text-blue-300'
                        : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-blue-600 hover:bg-blue-900/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && (
                        <div>
                          {index === questions[currentQuestion].correct && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {index === selectedAnswer && selectedAnswer !== questions[currentQuestion].correct && (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Explanation & Hint */}
        <AnimatePresence>
          {(showResult || showHintText) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className={`mb-8 ${showResult ? (selectedAnswer === questions[currentQuestion].correct ? 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-800/30' : 'bg-gradient-to-r from-red-900/20 to-pink-900/20 border-red-800/30') : 'bg-blue-900/20 border-blue-700/30'} backdrop-blur-xl`}>
                <CardContent className="p-6">
                  {showResult && (
                    <>
                      <h3 className={`text-lg font-semibold mb-2 ${selectedAnswer === questions[currentQuestion].correct ? 'text-green-300' : 'text-red-300'}`}>
                        {selectedAnswer === questions[currentQuestion].correct ? "Correto! 🎉" : "Resposta Incorreta 📚"}
                      </h3>
                      <p className="text-gray-300 mb-2">{questions[currentQuestion].explanation}</p>
                    </>
                  )}
                  {showHintText && !showResult && (
                     <>
                      <h3 className="text-lg font-semibold text-purple-300 mb-2">Dica:</h3>
                      <p className="text-gray-300">{questions[currentQuestion].hint}</p>
                     </>
                  )}
                   {showResult && hintUsedThisQuestion && (
                    <p className="text-xs text-purple-400 mt-2">(Dica utilizada nesta questão)</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Button */}
        {selectedAnswer !== null && !showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Button 
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-all duration-300 px-8 py-3"
            >
              {currentQuestion < questions.length - 1 ? "Próxima Pergunta" : "Finalizar Quiz"}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
