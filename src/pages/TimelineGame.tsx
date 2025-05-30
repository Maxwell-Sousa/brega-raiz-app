import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuizScore } from "@/entities/QuizScore";
import { TimelineEvent } from "@/entities/TimelineEvent";
import { ArrowLeft, Calendar, Star, CheckCircle, XCircle, Trophy, RotateCcw, GripVertical, Award, HelpCircle, Instagram } from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { shareToInstagramStory } from "@/utils/shareUtils";

// Fallback events in case database is empty
const fallbackEvents = [
  { id: "1", year: 1973, event: "Evaldo Braga morre precocemente", explanation: "O 'Ídolo Negro' deixou legado marcante no brega." },
  { id: "2", year: 1975, event: "Amado Batista lança seu primeiro disco", explanation: "Início da carreira de um dos maiores nomes do brega romântico." },
  { id: "3", year: 1985, event: "Reginaldo Rossi lança 'A Raposa e as Uvas'", explanation: "Música que se torna um dos maiores sucessos do cantor." }
];

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export default function TimelineGamePage() {
  const [timelineEvents, setTimelineEvents] = useState<any[]>([]);
  const [orderedEvents, setOrderedEvents] = useState<any[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrectOrder, setIsCorrectOrder] = useState(false);
  const [score, setScore] = useState(0);
  const [finalScoreToSave, setFinalScoreToSave] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [hintUsed, setHintUsed] = useState(false);
  const [hintText, setHintText] = useState("");
  const [loading, setLoading] = useState(true);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const loadTimelineEvents = async () => {
      try {
        const data = await TimelineEvent.getAll();
        if (data && data.length > 0) {
          // Convert database format to game format and shuffle
          let events = data.map(event => ({
            id: event.id,
            year: event.year,
            event: event.event_title,
            explanation: event.description
          }));
          
          // Embaralhar os eventos
          events = shuffleArray([...events]);
          
          setTimelineEvents(events);
          setOrderedEvents(shuffleArray([...events]));
        } else {
          console.log('No timeline events found in database, using fallback events');
          const shuffledFallback = shuffleArray([...fallbackEvents]);
          setTimelineEvents(shuffledFallback);
          setOrderedEvents(shuffleArray([...shuffledFallback]));
        }
      } catch (error) {
        console.error('Error loading timeline events:', error);
        const shuffledFallback = shuffleArray([...fallbackEvents]);
        setTimelineEvents(shuffledFallback);
        setOrderedEvents(shuffleArray([...shuffledFallback]));
      } finally {
        setLoading(false);
      }
    };

    loadTimelineEvents();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameFinished) {
        setTimeElapsed(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [gameFinished]);
  
  const checkOrder = () => {
    const sortedByUserIds = orderedEvents.map(e => e.id);
    const correctOrder = [...timelineEvents].sort((a, b) => a.year - b.year);
    const correctOrderIds = correctOrder.map(e => e.id);
    
    let correctCount = 0;
    for (let i = 0; i < sortedByUserIds.length; i++) {
      if (sortedByUserIds[i] === correctOrderIds[i]) {
        correctCount++;
      }
    }
    const allCorrect = correctCount === timelineEvents.length;
    setIsCorrectOrder(allCorrect);
    setScore(correctCount);
    
    const finalScore = hintUsed ? Math.floor(correctCount / 2) : correctCount;
    setFinalScoreToSave(finalScore);

    setShowResult(true);
    if (allCorrect) {
        setGameFinished(true); 
    }
  };

  const useHint = () => {
    if (hintUsed || showResult) return;

    const correctOrderFull = [...timelineEvents].sort((a, b) => a.year - b.year);
    
    let incorrectItems = [];
    for (let i = 0; i < orderedEvents.length; i++) {
        if (orderedEvents[i].id !== correctOrderFull[i].id) {
            incorrectItems.push(orderedEvents[i]);
        }
    }

    if (incorrectItems.length > 0) {
        const randomIncorrectItem = incorrectItems[Math.floor(Math.random() * incorrectItems.length)];
        const originalItemData = timelineEvents.find(e => e.id === randomIncorrectItem.id);
        setHintText(`Dica: O evento "${originalItemData.event.substring(0,25)}${originalItemData.event.length > 25 ? '...' : ''}" aconteceu em ${originalItemData.year}.`);
        setHintUsed(true);
    } else {
        setHintText("Todos os itens parecem estar na ordem correta!");
        setHintUsed(true);
    }
  };

  const handleNextAttempt = () => {
    setShowResult(false);
    setHintText("");
    if (isCorrectOrder) { 
        setGameFinished(true);
    }
  };

  const saveScore = async () => {
    if (playerName.trim() && !scoreSaved) {
      try {
        await QuizScore.create({
          player_name: playerName,
          quiz_type: "timeline",
          score: finalScoreToSave,
          total_questions: timelineEvents.length,
          completion_time: timeElapsed
        });
        setScoreSaved(true);
      } catch (error) {
        console.error("Erro ao salvar pontuação:", error);
      }
    }
  };

  const restartQuiz = () => {
    setOrderedEvents(shuffleArray([...timelineEvents]));
    setShowResult(false);
    setIsCorrectOrder(false);
    setScore(0);
    setFinalScoreToSave(0);
    setTimeElapsed(0);
    setGameFinished(false);
    setPlayerName("");
    setHintUsed(false);
    setHintText("");
  };
  
  const getScoreMessage = () => {
    const hintMessage = hintUsed ? " (Dica usada)" : "";
    if (isCorrectOrder && score === timelineEvents.length) return `Você é um mestre da história do brega!${hintMessage} 🗓️✨`;
    if (score >= timelineEvents.length * 0.7) return `Impressionante! Sua linha do tempo está quase perfeita!${hintMessage} 🤓`;
    if (score >= timelineEvents.length * 0.4) return `Bom trabalho! Alguns eventos no lugar certo!${hintMessage} 👍`;
    return `A história do brega tem seus segredos! Tente de novo!${hintMessage} 🧐`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6 flex items-center justify-center">
        <div className="text-white">Carregando eventos da linha do tempo...</div>
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
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-white">Jogo Finalizado!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-400">{finalScoreToSave} / {timelineEvents.length}</div>
                  <div className="text-sm text-gray-400">Pontos Finais</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{isCorrectOrder ? '100%' : `${Math.floor((score / timelineEvents.length) * 100)}%`}</div>
                  <div className="text-sm text-gray-400">Itens Corretos</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-pink-400">{Math.floor(timeElapsed/60)}:{(timeElapsed%60).toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-400">Tempo</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-900/20 to-red-900/20 p-6 rounded-xl border border-red-800/30">
                <p className="text-xl text-white font-medium">{getScoreMessage()}</p>
                {hintUsed && <p className="text-sm text-purple-300">(Você usou uma dica, sua pontuação foi ajustada)</p>}
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
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    {scoreSaved ? "Pontuação Salva!" : "Salvar Pontuação"}
                  </Button>
                  <Button onClick={restartQuiz} variant="outline" className="flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Jogar Novamente
                  </Button>
                </div>
                <Button
                  onClick={handleInstagramShare}
                  disabled={!playerName.trim() || isSharing}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  {isSharing ? "Gerando imagem..." : "Compartilhar no Instagram"}
                </Button>
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
              className="border-blue-600 text-blue-400 hover:bg-blue-600/10 text-xs px-2 py-1"
            >
              <HelpCircle className="w-3 h-3 mr-1" /> Dica
            </Button>
            <Badge variant="outline" className="border-pink-600 text-pink-400">
              <Calendar className="w-4 h-4 mr-1" />
              {Math.floor(timeElapsed/60)}:{(timeElapsed%60).toString().padStart(2, '0')}
            </Badge>
             <Badge variant="outline" className="border-red-600 text-red-400">
              <Star className="w-4 h-4 mr-1" />
              {score}/{timelineEvents.length} Corretos
            </Badge>
          </div>
        </motion.div>

         {hintText && !showResult && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg text-center text-blue-300"
            >
              {hintText}
            </motion.div>
        )}

        <Card className="bg-black/40 border-gray-800 backdrop-blur-xl mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl text-white">Linha do Tempo Interativa</CardTitle>
            <p className="text-gray-400">Arraste e solte os eventos na ordem cronológica correta.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Reorder.Group axis="y" values={orderedEvents} onReorder={setOrderedEvents} className="space-y-3">
              {orderedEvents.map((item, index) => {
                const originalEvent = timelineEvents.find(e => e.id === item.id);
                const correctOrderFull = [...timelineEvents].sort((a, b) => a.year - b.year);
                const isCorrectPosition = showResult && originalEvent.id === correctOrderFull[index].id;

                return (
                  <Reorder.Item 
                    key={originalEvent.id} 
                    value={item}
                    className={`p-4 border rounded-lg cursor-grab active:cursor-grabbing flex items-center transition-colors duration-300
                                ${showResult ? (isCorrectPosition ? 'bg-green-800/50 border-green-600' : 'bg-red-800/50 border-red-600') 
                                            : 'bg-gray-800/70 border-gray-700'}`}
                    whileDrag={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
                  >
                    <GripVertical className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
                    <div className="flex-1">
                      {showResult && (
                        <p className={`text-lg font-medium ${isCorrectPosition ? 'text-green-300' : 'text-red-300'}`}>{originalEvent.year}</p>
                      )}
                      <p className="text-white">{originalEvent.event}</p>
                    </div>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
            {!showResult && (
              <Button 
                onClick={checkOrder}
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-pink-600 hover:scale-105"
              >
                Verificar Ordem
              </Button>
            )}
          </CardContent>
        </Card>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card className={`bg-gradient-to-r ${isCorrectOrder ? 'from-green-900/30 to-emerald-900/30 border-green-700' : 'from-red-900/30 to-pink-900/30 border-red-700'} backdrop-blur-xl`}>
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    {isCorrectOrder ? <CheckCircle className="w-8 h-8 text-green-400 mr-2" /> : <XCircle className="w-8 h-8 text-red-400 mr-2" />}
                    <h3 className={`text-xl font-semibold ${isCorrectOrder ? 'text-green-300' : 'text-red-300'}`}>
                      {isCorrectOrder ? "Ordem Perfeita!" : "Quase lá!"}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-3">
                    {isCorrectOrder ? "Você organizou todos os eventos corretamente!" : `Você acertou ${score} de ${timelineEvents.length} eventos na ordem correta.`}
                  </p>
                  {!isCorrectOrder && (
                    <p className="text-gray-400 text-sm mb-4">Continue tentando para aperfeiçoar sua linha do tempo! Os anos corretos estão agora visíveis para referência.</p>
                  )}
                   {hintUsed && (
                    <p className="text-xs text-purple-400 mt-2">(Dica utilizada, pontuação ajustada se necessário no final)</p>
                  )}
                  <Button 
                    onClick={handleNextAttempt}
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105"
                  >
                    {isCorrectOrder ? "Ver Pontuação Final" : "Continuar / Ver Resultado"}
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
