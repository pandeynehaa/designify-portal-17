
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DesignEditor from "./pages/DesignEditor";
import SiteSettings from "./pages/SiteSettings";
import Marketplace from "./pages/Marketplace";
import NFTDetail from "./pages/NFTDetail";
import CollectionDetail from "./pages/CollectionDetail";
import ArtistProfile from "./pages/ArtistProfile";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import React from "react";

// Create a client outside of the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/editor" element={<DesignEditor />} />
              <Route path="/site-settings" element={<SiteSettings />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/nft/:id" element={<NFTDetail />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/collection/:collectionName" element={<CollectionDetail />} />
              <Route path="/artist/:artistName" element={<ArtistProfile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
