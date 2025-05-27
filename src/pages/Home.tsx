
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Gamepad2, Users, Music, Heart, Star, Sparkles, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const features = [
    {
      title: "História do Brega",
      description: "Descubra a rica história do gênero musical que conquistou o Brasil",
      icon: BookOpen,
      url: createPageUrl("Historia"),
      color: "from-red-800 to-red-600"
    },
    {
      title: "Jogos Interativos",
      description: "Teste seus conhecimentos com quiz, complete a letra e muito mais",
      icon: Gamepad2,
      url: createPageUrl("Jogos"),
      color: "from-yellow-600 to-yellow-500"
    },
    {
      title: "Créditos",
      description: "Conheça a equipe e as fontes que tornaram este projeto possível",
      icon: Users,
      url: createPageUrl("Creditos"),
      color: "from-red-600 to-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 py-12"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-red-800 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl">
                <Music className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
            </div>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 bg-clip-text text-transparent">
              Só Há Brega
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Mergulhe na cultura musical brasileira e descubra a beleza, a história e as curiosidades do gênero que conquistou corações
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center gap-2 text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm">Música Brasileira</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">Cultura Popular</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full">
              <PlayCircle className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Interativo</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
              className="group"
            >
              <Link to={feature.url}>
                <Card className="h-full bg-black/40 border-gray-800 hover:border-red-800/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-900/20 backdrop-blur-xl">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 hover:border-red-600 hover:bg-red-600/10 hover:text-red-400 transition-all duration-300"
                    >
                      Explorar
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-center bg-gradient-to-r from-red-900/20 to-yellow-900/20 rounded-3xl p-12 border border-red-800/30 backdrop-blur-xl"
        >
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-light text-gray-200 mb-6 italic leading-relaxed">
              "O brega é a expressão mais pura do sentimento brasileiro, onde cada verso carrega a alma do povo"
            </blockquote>
            <div className="flex justify-center items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-yellow-600 rounded-full flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-yellow-400">Equipe Só Há Brega</p>
                <p className="text-sm text-gray-400">Apaixonados pela música brasileira</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
