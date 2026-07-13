
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "@/contexts/TranslationContext";
import EnhancedChatBot from "@/components/EnhancedChatBot";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import YuvaRojgar from "./pages/YuvaRojgar";
import SwasthyaMitra from "./pages/SwasthyaMitra";
import KanoonSathi from "./pages/KanoonSathi";
import SamasyaReport from "./pages/SamasyaReport";
import ModuleLauncher from "./pages/ModuleLauncher";
import PathShaalaPlus from "./pages/PathShaalaPlus";
import KrishiBandhu from "./pages/KrishiBandhu";
import AbleAccessMap from "./pages/AbleAccessMap";
import NariShakti from "./pages/NariShakti";
import ResQNet from "./pages/ResQNet";
import FinJan from "./pages/FinJan";
import UdyamSetu from "./pages/UdyamSetu";
import DivyangSahayak from "./pages/DivyangSahayak";
import ShramikKalyan from "./pages/ShramikKalyan";
import VidyaSetu from "./pages/VidyaSetu";
import NyayaMitra from "./pages/NyayaMitra";
import ArogyaDoot from "./pages/ArogyaDoot";
import UrjaVikas from "./pages/UrjaVikas";
import Pariwahan from "./pages/Pariwahan";
import NotFound from "./pages/NotFound";
import SchemeDetailPage from "./pages/SchemeDetailPage";
import ExploreSchemes from "./pages/ExploreSchemes";

import { GlobalErrorBoundary } from "@/components/GlobalErrorBoundary";
import { SchemeSyncWrapper } from "@/components/SchemeSyncWrapper";

const queryClient = new QueryClient();

const App = () => (
  <GlobalErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <SchemeSyncWrapper>
        <TranslationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<ExploreSchemes />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/modules" element={<ModuleLauncher />} />
            <Route path="/yuva-rojgar" element={<YuvaRojgar />} />
            <Route path="/swasthya-mitra" element={<SwasthyaMitra />} />
            <Route path="/kanoon-sathi" element={<KanoonSathi />} />
            <Route path="/samasya-report" element={<SamasyaReport />} />
            <Route path="/pathshaala-plus" element={<PathShaalaPlus />} />
            <Route path="/krishi-bandhu" element={<KrishiBandhu />} />
            <Route path="/able-access-map" element={<AbleAccessMap />} />
            <Route path="/nari-shakti" element={<NariShakti />} />
            <Route path="/resq-net" element={<ResQNet />} />
            <Route path="/fin-jan" element={<FinJan />} />
            <Route path="/udyam-setu" element={<UdyamSetu />} />
            <Route path="/divyang-sahayak" element={<DivyangSahayak />} />
            <Route path="/shramik-kalyan" element={<ShramikKalyan />} />
            <Route path="/vidya-setu" element={<VidyaSetu />} />
            <Route path="/nyaya-mitra" element={<NyayaMitra />} />
            <Route path="/arogya-doot" element={<ArogyaDoot />} />
            <Route path="/urja-vikas" element={<UrjaVikas />} />
            <Route path="/pariwahan" element={<Pariwahan />} />
            <Route path="/scheme/:schemeId" element={<SchemeDetailPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Enhanced AI Chatbot - Available on all pages */}
          <EnhancedChatBot />
        </BrowserRouter>
          </TooltipProvider>
        </TranslationProvider>
      </SchemeSyncWrapper>
    </QueryClientProvider>
  </GlobalErrorBoundary>
);

export default App;
