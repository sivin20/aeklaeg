import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useEffect, useState } from 'react';
import { BillettoEvent, BillettoTicketType } from '@/types/billetto.ts';
import {
  getUpcomingEvents,
  getTicketTypesForAccount,
} from '@/services/billetto.service.ts';

const KaedekassenSection = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<BillettoEvent[]>([]);
  const [ticketTypes, setTicketTypes] = useState<BillettoTicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [finalEvents, setFinalEvents] = useState<BillettoEvent[]>([]);

  useEffect(() => {
    async function loadTicketTypes() {
      try {
        const ticketTypes = await getTicketTypesForAccount();
        setTicketTypes(ticketTypes);
      } finally {
        setLoading(false);
      }
    }
    loadTicketTypes();
  }, []);

  useEffect(() => {
    setFinalEvents(
      upcomingEvents.map((event) => {
        const eventTicketTypes = ticketTypes.filter(
          (tt) => tt.event === event.id,
        );
        console.log('Event ticket types:', eventTicketTypes);
        return { ...event, ticket_types: eventTicketTypes };
      }),
    );
  }, [upcomingEvents, ticketTypes]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const events = await getUpcomingEvents(3); // Fetch top 3 upcoming events
        console.log('Upcoming events fetched:', events);
        setUpcomingEvents(events);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <section id='events' className='py-20 md:py-32 bg-card'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <div className='flex items-center justify-center gap-3 mb-6'>
            <Calendar className='w-10 h-10 text-primary' />
            <h2 className='font-serif text-4xl md:text-6xl font-bold text-foreground'>
              Kædekassen
            </h2>
          </div>
          <p className='font-sans text-xl text-muted-foreground max-w-2xl mx-auto'>
            Oplev den bedste musik, altid fuldstændigt intimt og tæt på
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12'>
          {finalEvents.map((ev) => (
            <a href={`/kaedekassen/${ev.id}`} key={ev.id}>
              <div
                key={ev.id}
                className='group relative rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500'
              >
                <div className='aspect-[3/4] relative'>
                  <img
                    src={
                      ev.gallery_items?.data[0]?.original_url ??
                      '/placeholder.jpg'
                    }
                    alt={ev.name}
                    className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-700'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent'></div>
                  <div className='absolute bottom-0 left-0 right-0 p-6'>
                    <h3 className='font-serif text-2xl font-bold mb-2 text-primary'>
                      {ev.name}
                    </h3>
                    <div className='flex items-center justify-between gap-3'>
                      <p className='font-sans text-muted-foreground'>
                        {new Date(ev.starts_at).toLocaleDateString('da-DK')}
                      </p>
                      {ev.ticket_types &&
                        ev.ticket_types
                          .filter(
                            (tt) => tt.type === 'PayTicketType' && !!tt.price,
                          )
                          .map((ticketType) => (
                            <a href={ev.public_url} key={ticketType.id}>
                              <Button>
                                <div className='font-sans text-sm'>
                                  {`${(ticketType.price / 100).toFixed(0)} DKK`}
                                </div>
                              </Button>
                            </a>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className='text-center'>
          <a href='/kaedekassen'>
            <Button
              size='lg'
              className='bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-lg px-8'
            >
              Se alle events
              <ArrowRight className='w-5 h-5' />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default KaedekassenSection;
