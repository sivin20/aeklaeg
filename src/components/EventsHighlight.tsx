import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { BillettoEvent } from '@/types/billetto.ts';
import { getUpcomingEvents } from '@/services/billetto.service.ts';

const EventsHighlight = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<BillettoEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const events = await getUpcomingEvents(3); // Fetch top 3 upcoming events
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
              Kommende Events
            </h2>
          </div>
          <p className='font-sans text-xl text-muted-foreground max-w-2xl mx-auto'>
            Oplev musik, kunst og kultur i vores unikke venues
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12'>
          {upcomingEvents.map((ev) => (
            <a href={`events/${ev.id}`}>
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
                    <p className='font-sans text-muted-foreground mb-1'>
                      {new Date(ev.starts_at).toLocaleDateString('da-DK')}
                    </p>
                    {ev.location && (
                      <p className='font-sans text-sm text-muted-foreground'>
                        {ev.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className='text-center'>
          <a href='/events'>
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

export default EventsHighlight;
