
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EcommerceProvider } from "./contexts/EcommerceContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Index from "./pages/Index";
import BuyPage from "./pages/BuyPage";
import SellPage from "./pages/SellPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <EcommerceProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/buy" element={<BuyPage />} />
                  <Route path="/sell" element={<SellPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </EcommerceProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
