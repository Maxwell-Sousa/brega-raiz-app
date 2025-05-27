
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Github, Music, Palette, Database, Book } from "lucide-react";

const Creditos = () => {
  const teamMembers = [
    {
      title: "Equipe de Desenvolvimento",
      subtitle: "Criação e Programação",
      description: "Responsável pelo desenvolvimento técnico e design da plataforma",
      icon: Github,
      color: "from-red-600 to-red-700"
    },
    {
      title: "Pesquisadores Musicais",
      subtitle: "Curadoria de Conteúdo",
      description: "Compilação e verificação das informações históricas sobre o brega",
      icon: Music,
      color: "from-orange-600 to-orange-700"
    },
    {
      title: "Designers",
      subtitle: "Experiência Visual",
      description: "Criação da identidade visual e interface do usuário",
      icon: Palette,
      color: "from-yellow-600 to-yellow-700"
    }
  ];

  const sources = [
    {
      title: "Arquivo Nacional",
      description: "Documentos históricos sobre a música popular brasileira",
      type: "Fonte Oficial",
      color: "bg-yellow-600"
    },
    {
      title: "Fundação Biblioteca Nacional",
      description: "Periódicos e publicações sobre cultura musical",
      type: "Biblioteca",
      color: "bg-yellow-600"
    },
    {
      title: "Instituto Memória Musical Brasileira",
      description: "Acervo digital de músicas e biografias de artistas",
      type: "Acervo Digital",
      color: "bg-yellow-600"
    },
    {
      title: "Discografias Oficiais",
      description: "Catálogos oficiais dos principais artistas do brega",
      type: "Discografia",
      color: "bg-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Créditos
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Agradecimentos especiais a todos que tornaram este projeto possível
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-8 text-center">
            <Heart className="w-12 h-12 text-red-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-6">Nossa Missão</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              O projeto "Só Há Brega" nasceu da paixão pela música brasileira e do desejo de valorizar um gênero que representa a alma do povo brasileiro. Nosso objetivo é educar, entreter e preservar a rica história do brega através de uma experiência digital única e envolvente.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-8">Nossa Equipe</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${member.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <member.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.title}</h3>
                <Badge className="mb-4 bg-gray-700 text-gray-300">{member.subtitle}</Badge>
                <p className="text-gray-400 text-sm">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sources Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-8">Fontes e Referências</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {sources.map((source, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{source.title}</h3>
                  <Badge className={`${source.color} text-white text-xs`}>
                    {source.type}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm">{source.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special Thanks */}
        <Card className="bg-gradient-to-r from-red-900/20 via-orange-900/20 to-yellow-900/20 border-orange-700/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Agradecimentos Especiais</h2>
            <p className="text-gray-300 mb-6">
              Aos artistas, pesquisadores, historiadores e fãs do brega que mantêm viva essa expressão cultural tão importante para o Brasil. Sem vocês, este projeto não seria possível.
            </p>
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="text-gray-400">Feito com amor pela música brasileira</span>
              <Heart className="w-5 h-5 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Creditos;
