import React, { createContext, useContext, useEffect, useState } from 'react';
import type { BillettoEvent, BillettoTicketType } from '@/types/billetto';

export interface EventWithTickets extends BillettoEvent {
  ticket_types?: BillettoTicketType[];
}

interface EventsContextType {
  upcomingEvents: EventWithTickets[];
  previousEvents: EventWithTickets[];
  isLoading: boolean;
  error: string | null;
  getEventById: (id: string) => EventWithTickets | undefined;
  refetch: () => Promise<void>;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

async function fetchUpcomingEvents(limit = 20): Promise<BillettoEvent[]> {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const res = await fetch(
    `/api/billetto?endpoint=organiser/events&state=published&starts_after=${yesterday.toISOString()}&limit=${limit}&expand=data.gallery_items,data.editorial`,
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

async function fetchTicketTypes(limit = 50): Promise<BillettoTicketType[]> {
  const res = await fetch(
    `/api/billetto?endpoint=organiser/ticket_types&limit=${limit}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch ticket types');
  }

  const json = await res.json();
  return json.data ?? [];
}

function attachTicketTypesToEvents(
  events: BillettoEvent[],
  ticketTypes: BillettoTicketType[],
): EventWithTickets[] {
  return events.map((event) => ({
    ...event,
    ticket_types: ticketTypes.filter((tt) => tt.event === event.id),
  }));
}

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [upcomingEvents, setUpcomingEvents] = useState<EventWithTickets[]>([]);
  const [previousEvents, setPreviousEvents] = useState<EventWithTickets[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllEvents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [upcoming, previous, ticketTypes] = await Promise.all([
        fetchUpcomingEvents(20),
        fetchPreviousEvents(30),
        fetchTicketTypes(50),
      ]);

      setUpcomingEvents(attachTicketTypesToEvents(upcoming, ticketTypes));
      setPreviousEvents(attachTicketTypesToEvents(previous, ticketTypes));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const getEventById = (id: string): EventWithTickets | undefined => {
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
