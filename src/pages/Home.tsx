
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Gamepad2, Users, Heart, Star, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header */}
      <div className="text-center py-16 px-6">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-orange-800 text-lg">★</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Só Há Brega
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
          Mergulhe na cultura musical brasileira e descubra a beleza, a história e as curiosidades do gênero que conquistou corações
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 bg-red-900/30 rounded-full border border-red-700">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-red-300">Música Brasileira</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-900/30 rounded-full border border-yellow-700">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-300">Cultura Popular</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 rounded-full border border-blue-700">
            <Play className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300">Interativo</span>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">História do Brega</h3>
              <p className="text-gray-400 mb-6">
                Descubra a rica história do gênero musical que conquistou o Brasil
              </p>
              <Link to="/historia">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Explorar
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Jogos Interativos</h3>
              <p className="text-gray-400 mb-6">
                Teste seus conhecimentos com quiz, complete a letra e muito mais
              </p>
              <Link to="/jogos">
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                  Explorar
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Créditos</h3>
              <p className="text-gray-400 mb-6">
                Conheça a equipe e as fontes que tornaram este projeto possível
              </p>
              <Link to="/creditos">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  Explorar
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quote Section */}
        <div className="bg-gradient-to-r from-red-900/20 via-orange-900/20 to-yellow-900/20 rounded-2xl p-8 border border-orange-700/30">
          <blockquote className="text-center">
            <p className="text-2xl italic text-gray-300 mb-4">
              "O brega é a expressão mais pura do sentimento brasileiro, onde cada verso carrega a alma do povo"
            </p>
            <footer className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              </div>
              <div>
                <cite className="text-yellow-400 font-semibold">Equipe Só Há Brega</cite>
                <p className="text-gray-400 text-sm">Apaixonados pela música brasileira</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Home;
