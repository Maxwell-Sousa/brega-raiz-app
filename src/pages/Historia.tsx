
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Music, User, Sparkles } from "lucide-react";

const Historia = () => {
  const decades = [
    { period: "Final dos anos 1960", active: true },
    { period: "Década de 1970", active: false },
    { period: "Década de 1980", active: false },
    { period: "Década de 1990", active: false },
    { period: "Década de 2000", active: false },
    { period: "Década de 2010", active: false },
    { period: "Década de 2020", active: false },
  ];

  const artists = [
    { name: "Nelson Ned", nickname: "Rouxinol das Américas" },
    { name: "Reginaldo Rossi", nickname: "Rei do Brega" },
    { name: "Waldick Soriano", nickname: "Príncipe do Brega" },
  ];

  const themes = [
    "Amor e desamor como experiências universais",
    "Traição e ciúmes como dramas cotidianos",
    "Saudades e nostalgia romântica",
    "Bebedeiras em bares ('Garçom' como hino)",
    "O sofrimento como estética popular"
  ];

  const visualAesthetics = [
    "Figurinos exagerados e brilhantes",
    "Lantejoulas e elementos cênicos",
    "Performances dramáticas e teatrais",
    "Cenários exuberantes nos shows",
    "Gestual expressivo e emocional"
  ];

  const culturalResistance = [
    "Representa a cultura popular periférica",
    "Sempre esteve à margem da 'música oficial'",
    "Manteve público fiel através das décadas",
    "Símbolo de orgulho e resistência cultural",
    "Expressão autêntica das camadas populares"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-orange-800 text-sm">★</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
          História do Brega
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          Uma jornada completa pela trajetória do gênero musical que conquistou o coração brasileiro, da marginalização ao reconhecimento como patrimônio cultural
        </p>
      </div>

      {/* Timeline */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {decades.map((decade, index) => (
            <Button
              key={index}
              variant={decade.active ? "default" : "outline"}
              className={decade.active 
                ? "bg-red-600 hover:bg-red-700 text-white border-none" 
                : "border-gray-600 text-gray-300 hover:bg-gray-800"
              }
            >
              <Calendar className="w-4 h-4 mr-2" />
              {decade.period}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Origins Section */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Music className="w-8 h-8 text-yellow-400" />
                  <h2 className="text-3xl font-bold text-yellow-400">Origens (1960s)</h2>
                </div>
                
                <div className="space-y-4 text-gray-300">
                  <p>
                    O brega nasceu no Brasil no final da década de 1960, em um período de intensa transformação social, política e cultural. Durante a Ditadura Militar, a industrialização acelerada e o êxodo rural, surgiu esta expressão musical das camadas populares.
                  </p>
                  
                  <p>
                    O termo "brega" inicialmente era uma gíria pejorativa, associada a locais populares de baixa renda como cabarés e boates. Ironicamente, foi justamente nestes espaços que nasceu um dos gêneros mais autênticos da música brasileira.
                  </p>
                  
                  <p>
                    Caracterizado por letras simples e diretas sobre amor, traição, dor e saudade, o brega se conectou profundamente com as experiências cotidianas do povo brasileiro, tornando-se trilha sonora de milhões de vidas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Artists Section */}
          <div>
            <Card className="bg-gray-800/50 border-gray-700 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">Artistas Principais</h3>
                </div>
                
                <div className="space-y-4">
                  {artists.map((artist, index) => (
                    <div key={index} className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-semibold text-yellow-400">{artist.name}</h4>
                      <p className="text-sm text-gray-400">{artist.nickname}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact Sections */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {/* Recurring Themes */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white">♥</span>
                </div>
                <h3 className="text-lg font-bold text-red-400">Temas Recorrentes</h3>
              </div>
              
              <div className="space-y-3">
                {themes.map((theme, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-300">{theme}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Visual Aesthetics */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-yellow-400" />
                <h3 className="text-lg font-bold text-yellow-400">Estética Visual</h3>
              </div>
              
              <div className="space-y-3">
                {visualAesthetics.map((aesthetic, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-300">{aesthetic}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cultural Resistance */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white">🎵</span>
                </div>
                <h3 className="text-lg font-bold text-blue-400">Resistência Cultural</h3>
              </div>
              
              <div className="space-y-3">
                {culturalResistance.map((resistance, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-300">{resistance}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legacy Section */}
        <Card className="bg-gradient-to-r from-red-900/20 via-orange-900/20 to-yellow-900/20 border-orange-700/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6">O Brega como Patrimônio Vivo</h2>
            <p className="text-xl text-gray-300 mb-4 italic">
              "O brega não é apenas um gênero musical: é uma expressão social, afetiva e cultural das camadas populares brasileiras. Da dor à festa, do cabaré à internet, o brega soube se reinventar e hoje ocupa o lugar que sempre mereceu: o coração da cultura brasileira."
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-yellow-400 font-semibold">Legado Cultural Brasileiro</p>
                <p className="text-gray-400 text-sm">Patrimônio musical do povo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Historia;
