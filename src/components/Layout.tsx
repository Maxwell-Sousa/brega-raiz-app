
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, BookOpen, Gamepad2, Users, Music, Star, Trophy } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Início",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "História do Brega",
    url: createPageUrl("Historia"),
    icon: BookOpen,
  },
  {
    title: "Jogos",
    url: createPageUrl("Jogos"),
    icon: Gamepad2,
  },
  {
    title: "Créditos",
    url: createPageUrl("Creditos"),
    icon: Users,
  },
];

interface LayoutProps {
  children: React.ReactNode;
  currentPageName?: string;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --background: #0a0a0a;
            --foreground: #ffffff;
            --card: #1a1a1a;
            --card-foreground: #ffffff;
            --popover: #1a1a1a;
            --popover-foreground: #ffffff;
            --primary: #631606;
            --primary-foreground: #ffffff;
            --secondary: #e5bd80;
            --secondary-foreground: #0a0a0a;
            --muted: #262626;
            --muted-foreground: #a3a3a3;
            --accent: #631606;
            --accent-foreground: #ffffff;
            --destructive: #dc2626;
            --destructive-foreground: #ffffff;
            --border: #262626;
            --input: #262626;
            --ring: #631606;
            --radius: 0.75rem;
          }
          
          body {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            color: #ffffff;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          .brega-gradient {
            background: linear-gradient(135deg, #631606 0%, #e5bd80 100%);
          }
          
          .brega-text-gradient {
            background: linear-gradient(135deg, #631606 0%, #e5bd80 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .glass-effect {
            background: rgba(26, 26, 26, 0.8);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(99, 22, 6, 0.2);
          }
          
          .hover-glow:hover {
            box-shadow: 0 0 30px rgba(99, 22, 6, 0.3);
            transform: translateY(-2px);
            transition: all 0.3s ease;
          }
        `}
      </style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Sidebar className="border-r border-gray-800 bg-black backdrop-blur-xl">
          <SidebarHeader className="border-b border-gray-800 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 brega-gradient rounded-xl flex items-center justify-center shadow-lg">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl brega-text-gradient">Só Há Brega</h2>
                <p className="text-xs text-gray-400">Cultura Musical Brasileira</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-red-900/20 hover:text-yellow-300 transition-all duration-300 rounded-xl mb-2 ${
                          location.pathname === item.url ? 'bg-red-900/30 text-yellow-300 shadow-lg' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-8 p-4 glass-effect rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-gray-300">Destaque</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Explore a rica história do brega brasileiro através de jogos interativos e conteúdo educativo.
              </p>
            </div>
          </SidebarContent>

          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-800 to-yellow-600 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-200 text-sm">Brega Player</p>
                <p className="text-xs text-gray-500">Aprendiz do Brega</p>
              </div>
            </div>
          </div>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-black/20 backdrop-blur-xl border-b border-gray-800 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold brega-text-gradient">Só Há Brega</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
