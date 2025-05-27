
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Trophy, Star, Gamepad2, Brain, Music, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function JogosPage() {
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const games = [
    {
      id: "quiz-historia",
      title: "Quiz História do Brega",
      description: "Teste seus conhecimentos sobre a história, artistas e curiosidades do brega brasileiro",
      icon: Brain,
      difficulty: "Médio",
      duration: "5-10 min",
      category: "conhecimento",
      color: "from-blue-600 to-purple-600",
      features: ["20 perguntas", "Múltipla escolha", "Feedback detalhado", "Ranking"],
      url: "/jogos/quiz"
    },
    {
      id: "complete-letra",
      title: "Complete a Letra",
      description: "Complete os trechos das músicas mais famosas do brega e mostre que você é um verdadeiro conhecedor",
      icon: Music,
      difficulty: "Fácil",
      duration: "3-7 min",
      category: "musica",
      color: "from-green-600 to-emerald-600",
      features: ["Letras clássicas", "Dicas progressivas", "Pontuação por tempo", "Compartilhamento"],
      url: "/jogos/letra"
    },
    {
      id: "desafio-emojis",
      title: "Desafio dos Emojis",
      description: "Adivinhe as músicas de brega através de sequências de emojis divertidos e criativos",
      icon: Star,
      difficulty: "Médio",
      duration: "4-8 min",
      category: "puzzle",
      color: "from-yellow-600 to-orange-600",
      features: ["Emojis únicos", "Sistema de dicas", "Níveis progressivos", "Conquistas"],
      url: "/jogos/emoji"
    },
    {
      id: "timeline",
      title: "Linha do Tempo",
      description: "Organize eventos, lançamentos e marcos do brega em ordem cronológica",
      icon: Clock,
      difficulty: "Difícil",
      duration: "7-12 min",
      category: "estrategia",
      color: "from-red-600 to-pink-600",
      features: ["Arrastar e soltar", "Eventos históricos", "Informações extras", "Medalhas especiais"],
      url: "/jogos/timeline"
    }
  ];

  const categories = [
    { id: "todos", name: "Todos os Jogos", icon: Gamepad2 },
    { id: "conhecimento", name: "Conhecimento", icon: Brain },
    { id: "musica", name: "Música", icon: Music },
    { id: "puzzle", name: "Puzzle", icon: Star },
    { id: "estrategia", name: "Estratégia", icon: Clock }
  ];

  const filteredGames = selectedCategory === "todos" 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Fácil": return "text-green-400 border-green-400";
      case "Médio": return "text-yellow-400 border-yellow-400";
      case "Difícil": return "text-red-400 border-red-400";
      default: return "text-gray-400 border-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Jogos Interativos
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Aprenda sobre o brega de forma divertida e desafiadora
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`px-4 py-2 transition-all duration-300 ${
                selectedCategory === category.id 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'border-gray-700 hover:border-purple-600 hover:bg-purple-600/10'
              }`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <Card className="bg-black/40 border-gray-800 backdrop-blur-xl text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-400 mb-1">{games.length}</div>
              <div className="text-sm text-gray-400">Jogos Disponíveis</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-gray-800 backdrop-blur-xl text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-400 mb-1">100+</div>
              <div className="text-sm text-gray-400">Questões</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-gray-800 backdrop-blur-xl text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-400 mb-1">50+</div>
              <div className="text-sm text-gray-400">Músicas</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-gray-800 backdrop-blur-xl text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-400 mb-1">∞</div>
              <div className="text-sm text-gray-400">Diversão</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Games Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="group"
            >
              <Card className="h-full bg-black/40 border-gray-800 hover:border-purple-600/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-900/20 backdrop-blur-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${game.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <game.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors duration-300">
                    {game.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-400 leading-relaxed">
                    {game.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      {game.duration}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Zap className="w-4 h-4" />
                      Interativo
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-300">Características:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {game.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to={game.url} className="block">
                    <Button className={`w-full bg-gradient-to-r ${game.color} hover:scale-105 transition-all duration-300 shadow-lg`}>
                      <Play className="w-4 h-4 mr-2" />
                      Jogar Agora
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center bg-gradient-to-r from-gray-900/50 to-black/50 rounded-3xl p-12 border border-gray-800 backdrop-blur-xl"
        >
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h3 className="text-2xl font-bold text-white mb-4">Mais jogos em breve!</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Estamos trabalhando em novos desafios e funcionalidades para tornar sua experiência ainda mais divertida e educativa.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
