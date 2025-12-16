import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { EventsProvider } from '@/contexts/EventsContext';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import ElsesGabPage from './pages/ElsesGabPage';
import TorwPage from './pages/TorwPage';
import KaedekassenPage from './pages/KaedekassenPage.tsx';
import EventPage from '@/pages/EventPage.tsx';
import VaerftetPage from '@/pages/VaerftetPage.tsx';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <EventsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Index />} />
              <Route path='/elses-gab' element={<ElsesGabPage />} />
              <Route path='/torw' element={<TorwPage />} />
              <Route path='/kaedekassen' element={<KaedekassenPage />} />
              <Route path='/kaedekassen/:id' element={<EventPage />} />
              <Route path='/vaerftet' element={<VaerftetPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </EventsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
