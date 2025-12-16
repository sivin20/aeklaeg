import React, { createContext, useContext, useEffect, useState } from 'react';
import type { BillettoEvent } from '@/types/billetto';

interface EventsContextType {
  upcomingEvents: BillettoEvent[];
  previousEvents: BillettoEvent[];
  isLoading: boolean;
  error: string | null;
  getEventById: (id: string) => BillettoEvent | undefined;
  refetch: () => Promise<void>;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

async function fetchUpcomingEvents(limit = 20): Promise<BillettoEvent[]> {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  const res = await fetch(
    `/api/billetto?endpoint=organiser/events&state=published&starts_after=${yesterday.toISOString()}&limit=${limit}&expand=data.gallery_items`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch upcoming events');
  }

  const json = await res.json();
  return (json.data ?? [])
    .filter((event: BillettoEvent) => !!event.published_at)
    .sort(
      (a: BillettoEvent, b: BillettoEvent) =>
        new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime(),
    );
}

async function fetchPreviousEvents(limit = 30): Promise<BillettoEvent[]> {
  const res = await fetch(
    `/api/billetto?endpoint=organiser/events&category=music&starts_before=${new Date().toISOString()}&limit=${limit}&expand=data.gallery_items`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch previous events');
  }

  const json = await res.json();
  return (json.data ?? [])
    .filter((event: BillettoEvent) => !!event.published_at)
    .sort(
      (a: BillettoEvent, b: BillettoEvent) =>
        new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime(),
    );
}

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [upcomingEvents, setUpcomingEvents] = useState<BillettoEvent[]>([]);
  const [previousEvents, setPreviousEvents] = useState<BillettoEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllEvents = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [upcoming, previous] = await Promise.all([
        fetchUpcomingEvents(20),
        fetchPreviousEvents(30),
      ]);
      
      setUpcomingEvents(upcoming);
      setPreviousEvents(previous);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const getEventById = (id: string): BillettoEvent | undefined => {
    return (
      upcomingEvents.find((e) => e.id === id) ||
      previousEvents.find((e) => e.id === id)
    );
  };

  return (
    <EventsContext.Provider
      value={{
        upcomingEvents,
        previousEvents,
        isLoading,
        error,
        getEventById,
        refetch: fetchAllEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}
