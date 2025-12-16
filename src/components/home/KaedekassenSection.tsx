import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useEvents } from '@/contexts/EventsContext';
import { Link } from 'react-router-dom';
import EventCard from '@/components/EventCard.tsx';

const KaedekassenSection = () => {
  const { upcomingEvents, isLoading } = useEvents();
  const finalEvents = upcomingEvents.slice(0, 3);

  if (isLoading) return <p className='text-center py-20'>Loading events...</p>;

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

        {/* The Grid is now much simpler */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12'>
          {finalEvents.map((ev) => (
            <EventCard key={ev.id} event={ev} basePath='/kaedekassen' />
          ))}
        </div>

        <div className='text-center'>
          <Link to='/kaedekassen'>
            <Button
              size='lg'
              className='bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-lg px-8'
            >
              Se alle events
              <ArrowRight className='w-5 h-5' />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KaedekassenSection;
