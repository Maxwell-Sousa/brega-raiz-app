import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Music, User, MapPin, PlayCircle, ExternalLink, Heart, Sparkles, Mic2, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HistoriaContent } from "@/entities/HistoriaContent";

// Define proper types for era data
interface EraData {
  title: string;
  period: string;
  description: string;
  content: string;
  artists: string[];
  landmarks: string[];
}

// Fallback data in case database is empty
const fallbackEras: Record<string, EraData> = {
  origem: {
    title: "Origens (1960s)",
    period: "Final dos anos 1960",
    description: "O nascimento de uma expressão musical que mudaria para sempre a cultura brasileira",
    content: `O brega nasceu no Brasil no final da década de 1960, em um período de intensa transformação social, política e cultural. Durante a Ditadura Militar, a industrialização acelerada e o êxodo rural, surgiu esta expressão musical das camadas populares.

O termo "brega" inicialmente era uma gíria pejorativa, associada a locais populares de baixa renda como cabarés e boates. Ironicamente, foi justamente nestes espaços que nasceu um dos gêneros mais autênticos da música brasileira.

Caracterizado por letras simples e diretas sobre amor, traição, dor e saudade, o brega trazia melodias marcantes e sentimentais, com forte influência da música romântica latino-americana e do bolero.`,
    artists: ["Nelson Ned", "Reginaldo Rossi", "Waldick Soriano"],
    landmarks: [
      "Surgimento nos cabarés e boates populares",
      "Primeira geração de artistas bregas",
      "Influência do bolero e música romântica latina"
    ]
  }
};

export default function HistoriaPage() {
  const [selectedEra, setSelectedEra] = useState("origem");
  const [eras, setEras] = useState<Record<string, EraData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistoriaContent = async () => {
      try {
        const data = await HistoriaContent.getAll();
        
        if (data && data.length > 0) {
          // Convert array to object with era_key as key
          const erasObject: Record<string, EraData> = {};
          data.forEach((era: any) => {
            erasObject[era.era_key] = {
              title: era.title,
              period: era.period,
              description: era.description,
              content: era.content,
              artists: era.artists || [],
              landmarks: era.landmarks || []
            };
          });
          setEras(erasObject);
        } else {
          // Use fallback data if database is empty
          setEras(fallbackEras);
        }
      } catch (error) {
        console.error('Error loading historia content:', error);
        // Use fallback data on error
        setEras(fallbackEras);
      } finally {
        setLoading(false);
      }
    };

    loadHistoriaContent();
  }, []);

  const famousArtists = [
    {
      name: "Reginaldo Rossi",
      nickname: "Rei do Brega",
      period: "1970s-2000s",
      bio: "Considerado o maior nome do brega brasileiro, eternizou clássicos como 'Garçom' e 'A Raposa e as Uvas'",
      hit: "Garçom",
      significance: "Definiu a estética e a temática clássica do brega romântico"
    },
    {
      name: "Waldick Soriano",
      nickname: "Príncipe do Brega",
      period: "1960s-1980s",
      bio: "Pioneiro do gênero, conhecido por suas letras melancólicas sobre traição e sofrimento",
      hit: "Eu Não Sou Cachorro, Não",
      significance: "Estabeleceu a temática da dor amorosa como marca do brega"
    },
    {
      name: "Gaby Amarantos",
      nickname: "Beyoncé do Pará",
      period: "2000s-presente",
      bio: "Revolucionou o tecnobrega e levou o gênero à projeção nacional e internacional",
      hit: "Xirley",
      significance: "Modernizou o brega e o levou ao mainstream nacional"
    },
    {
      name: "Nelson Ned",
      nickname: "Rouxinol das Américas",
      period: "1960s-1990s",
      bio: "Um dos primeiros artistas rotulados como brega, com sua potente voz romântica",
      hit: "Tudo Passará",
      significance: "Pioneiro na consolidação do brega como gênero musical"
    }
  ];

  const culturalImpact = {
    themes: [
      "Amor e desamor como experiências universais",
      "Traição e ciúmes como dramas cotidianos", 
      "Saudades e nostalgia romântica",
      "Bebedeiras em bares ('Garçom' como hino)",
      "O sofrimento como estética popular"
    ],
    aesthetics: [
      "Figurinos exagerados e brilhantes",
      "Lantejoulas e elementos cênicos",
      "Performances dramáticas e teatrais",
      "Cenários exuberantes nos shows",
      "Gestual expressivo e emocional"
    ],
    resistance: [
      "Representa a cultura popular periférica",
      "Sempre esteve à margem da 'música oficial'",
      "Manteve público fiel através das décadas",
      "Símbolo de orgulho e resistência cultural",
      "Expressão autêntica das camadas populares"
    ]
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6 flex items-center justify-center">
        <div className="text-white">Carregando conteúdo histórico...</div>
      </div>
    );
  }

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
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-red-800 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl">
                <Music className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
              História do Brega
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Uma jornada completa pela trajetória do gênero musical que conquistou o coração brasileiro, 
            da marginalização ao reconhecimento como patrimônio cultural
          </p>
        </motion.div>

        {/* Timeline Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {Object.entries(eras).map(([key, era]) => (
            <Button
              key={key}
              onClick={() => setSelectedEra(key)}
              variant={selectedEra === key ? "default" : "outline"}
              className={`px-4 py-3 text-sm font-medium transition-all duration-300 ${
                selectedEra === key 
                  ? 'bg-gradient-to-r from-red-600 to-yellow-600 text-white shadow-lg' 
                  : 'border-gray-700 hover:border-red-600 hover:bg-red-600/10'
              }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {era.period}
            </Button>
          ))}
        </motion.div>

        {/* Era Content */}
        {eras[selectedEra] && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedEra}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-8 mb-12"
            >
              <Card className="bg-black/40 border-gray-800 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-yellow-400 flex items-center gap-2">
                    <Music className="w-6 h-6" />
                    {eras[selectedEra].title}
                  </CardTitle>
                  <Badge variant="outline" className="w-fit border-red-600 text-red-400">
                    {eras[selectedEra].period}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">
                    {eras[selectedEra].content}
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {/* Artists */}
                <Card className="bg-black/40 border-gray-800 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Artistas Principais
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {eras[selectedEra].artists.map((artist: string, index: number) => (
                        <div key={index} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                          <p className="font-medium text-yellow-400">{artist}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Landmarks */}
                <Card className="bg-black/40 border-gray-800 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Marcos Históricos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {eras[selectedEra].landmarks.map((landmark: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-red-900/20 rounded-lg border border-red-800/30">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                          <p className="text-gray-300 text-sm leading-relaxed">{landmark}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Famous Artists Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent">
              Ícones do Brega
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {famousArtists.map((artist, index) => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="bg-black/40 border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:scale-105 backdrop-blur-xl group h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-600 to-yellow-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Mic2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{artist.name}</h3>
                    <Badge variant="outline" className="border-yellow-600 text-yellow-400 mb-2">
                      {artist.nickname}
                    </Badge>
                    <p className="text-xs text-gray-500 mb-3">{artist.period}</p>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{artist.bio}</p>
                    <div className="flex items-center justify-center gap-2 text-red-400 mb-3">
                      <PlayCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">{artist.hit}</span>
                    </div>
                    <p className="text-xs text-gray-500 italic leading-relaxed">{artist.significance}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cultural Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent">
              Impacto Cultural
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black/40 border-gray-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Temas Recorrentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {culturalImpact.themes.map((theme, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-red-900/20 rounded-lg border border-red-800/30">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                      <p className="text-gray-300 text-sm leading-relaxed">{theme}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Estética Visual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {culturalImpact.aesthetics.map((aesthetic, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/30">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 shrink-0"></div>
                      <p className="text-gray-300 text-sm leading-relaxed">{aesthetic}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-800 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Radio className="w-5 h-5 text-blue-500" />
                  Resistência Cultural
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {culturalImpact.resistance.map((resistance, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                      <p className="text-gray-300 text-sm leading-relaxed">{resistance}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Conclusion Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="text-center bg-gradient-to-r from-red-900/20 to-yellow-900/20 rounded-3xl p-12 border border-red-800/30 backdrop-blur-xl"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">O Brega como Patrimônio Vivo</h2>
            <blockquote className="text-xl md:text-2xl font-light text-gray-200 mb-6 italic leading-relaxed">
              "O brega não é apenas um gênero musical: é uma expressão social, afetiva e cultural das camadas populares brasileiras. 
              Da dor à festa, do cabaré à internet, o brega soube se reinventar e hoje ocupa o lugar que sempre mereceu: 
              o coração da cultura brasileira."
            </blockquote>
            <div className="flex justify-center items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-yellow-600 rounded-full flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-yellow-400">Legado Cultural Brasileiro</p>
                <p className="text-sm text-gray-400">Dos cabarés ao mainstream</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
