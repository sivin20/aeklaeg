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
          <div className='flex items-center justify-center gap-4 mb-6'>
            <h2 className='font-typewriter text-3xl md:text-5xl font-bold text-primary'>
              Kædekassen
            </h2>
            <img
              src='/logos/kaedekassen_primary.svg'
              alt='Kædekassen'
              className='h-12 md:h-16'
            />
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
              <img
                src='/anchor-text.svg'
                alt='Anchor Right'
                className='w-4 h-4 rotate-[270deg] transition-transform duration-300 group-hover:translate-x-1'
              />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KaedekassenSection;
