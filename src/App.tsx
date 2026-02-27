import { Toaster } from "@/components/ui/toaster";
import { Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VSL from "./pages/VSL";
import NotFound from "./pages/NotFound";
import { useUTMTracking } from "@/hooks/useUTMTracking";

const queryClient = new QueryClient();

const AppContent = () => {
  // Ativa rastreamento de UTMs globalmente
  useUTMTracking();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/vsl" element={<VSL />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
