
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import Home from "./pages/Home";
import Historia from "./pages/Historia";
import Jogos from "./pages/Jogos";
import Creditos from "./pages/Creditos";
import QuizGame from "./pages/QuizGame";
import LetraGame from "./pages/LetraGame";
import EmojiGame from "./pages/EmojiGame";
import TimelineGame from "./pages/TimelineGame";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <SidebarInset className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/historia" element={<Historia />} />
                <Route path="/jogos" element={<Jogos />} />
                <Route path="/jogos/quiz" element={<QuizGame />} />
                <Route path="/jogos/letra" element={<LetraGame />} />
                <Route path="/jogos/emoji" element={<EmojiGame />} />
                <Route path="/jogos/timeline" element={<TimelineGame />} />
                <Route path="/creditos" element={<Creditos />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
