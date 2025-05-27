
import { Home, BookOpen, Gamepad2, Users, Music } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Início",
    url: "/",
    icon: Home,
  },
  {
    title: "História do Brega",
    url: "/historia",
    icon: BookOpen,
  },
  {
    title: "Jogos",
    url: "/jogos",
    icon: Gamepad2,
  },
  {
    title: "Créditos",
    url: "/creditos",
    icon: Users,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar side="left" className="border-r border-gray-700">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-red-800 to-orange-600 rounded-xl flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-orange-400">Só Há Brega</h2>
            <p className="text-sm text-gray-400">Cultura Musical Brasileira</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={location.pathname === item.url ? "bg-orange-500/20 text-orange-400" : "text-gray-300 hover:text-white hover:bg-gray-800"}
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-black text-xs">★</span>
            </div>
            <span className="text-sm font-medium text-white">Destaque</span>
          </div>
          <p className="text-xs text-gray-400">
            Explore a rica história do brega brasileiro através de jogos interativos e conteúdo educativo.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
