
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Brain, Music, Star, Clock, Puzzle, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Jogos = () => {
  const gameStats = [
    { number: "4", label: "Jogos Disponíveis", color: "text-purple-400" },
    { number: "100+", label: "Questões", color: "text-green-400" },
    { number: "50+", label: "Músicas", color: "text-yellow-400" },
    { number: "∞", label: "Diversão", color: "text-red-400" },
  ];

  const gameCategories = [
    { id: "todos", label: "Todos os Jogos", active: true },
    { id: "conhecimento", label: "Conhecimento" },
    { id: "musica", label: "Música" },
    { id: "puzzle", label: "Puzzle" },
    { id: "estrategia", label: "Estratégia" },
  ];

  const games = [
    {
      id: "quiz",
      title: "Quiz História do Brega",
      description: "Teste seus conhecimentos sobre a história, artistas e curiosidades do brega brasileiro",
      duration: "5-10 min",
      difficulty: "Médio",
      icon: Brain,
      color: "from-blue-600 to-purple-600",
      route: "/jogos/quiz",
      features: ["Múltipla escolha", "Feedback imediato", "Pontuação", "Conquistas"]
    },
    {
      id: "letra",
      title: "Complete a Letra",
      description: "Complete os trechos das músicas mais famosas do brega e mostre que você é um verdadeiro conhecedor",
      duration: "3-7 min",
      difficulty: "Fácil",
      icon: Music,
      color: "from-green-600 to-emerald-600",
      route: "/jogos/letra",
      features: ["Correção automática", "Dicas disponíveis", "Letras clássicas", "Compartilhamento"]
    },
    {
      id: "emoji",
      title: "Desafio dos Emojis",
      description: "Adivinhe as músicas de brega através de sequências de emojis divertidos e criativos",
      duration: "4-8 min",
      difficulty: "Médio",
      icon: Star,
      color: "from-orange-600 to-yellow-600",
      route: "/jogos/emoji",
      features: ["Emojis únicos", "Níveis progressivos", "Sistema de dicas", "Conquistas"]
    },
    {
      id: "timeline",
      title: "Linha do Tempo",
      description: "Organize eventos, lançamentos e marcos do brega em ordem cronológica",
      duration: "7-12 min",
      difficulty: "Difícil",
      icon: Clock,
      color: "from-red-600 to-pink-600",
      route: "/jogos/timeline",
      features: ["Arrastar e soltar", "Informações extras", "Medalhas especiais", "Eventos históricos"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-600";
      case "Médio": return "bg-yellow-600";
      case "Difícil": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <Puzzle className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Jogos Interativos
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Aprenda sobre o brega de forma divertida e desafiadora
        </p>
      </div>

      {/* Game Categories */}
      <div className="max-w-4xl mx-auto mb-12">
        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800 border border-gray-700">
            {gameCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Game Stats */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {gameStats.map((stat, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 text-center">
              <CardContent className="p-6">
                <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.number}
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="grid md:grid-cols-2 gap-8">
          {games.map((game) => (
            <Card key={game.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group overflow-hidden">
              <CardContent className="p-0">
                <div className={`h-20 bg-gradient-to-r ${game.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <game.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {game.title}
                    </h3>
                    <Badge className={`${getDifficultyColor(game.difficulty)} text-white text-xs`}>
                      {game.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {game.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{game.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Puzzle className="w-4 h-4" />
                      <span>Interativo</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Características:</h4>
                    <div className="flex flex-wrap gap-2">
                      {game.features.map((feature, index) => (
                        <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          • {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link to={game.route}>
                    <Button className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90 text-white font-semibold py-3`}>
                      <Trophy className="w-4 h-4 mr-2" />
                      Jogar Agora
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Coming Soon */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-r from-yellow-900/20 via-orange-900/20 to-red-900/20 border-yellow-700/30">
          <CardContent className="p-8 text-center">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Mais jogos em breve!</h2>
            <p className="text-gray-300 mb-6">
              Estamos trabalhando em novos desafios e funcionalidades para tornar sua experiência ainda mais divertida e educativa.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Jogos;
