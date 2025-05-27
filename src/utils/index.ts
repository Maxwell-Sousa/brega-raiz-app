
export const createPageUrl = (pageName: string): string => {
  const routes: Record<string, string> = {
    Home: "/",
    Historia: "/historia",
    Jogos: "/jogos",
    Creditos: "/creditos"
  };
  
  return routes[pageName] || "/";
};
