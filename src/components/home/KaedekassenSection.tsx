import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useEvents } from '@/contexts/EventsContext';
import { Link } from 'react-router-dom';

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

        <div className='grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12'>
          {finalEvents.map((ev) => (
            <Link to={`/kaedekassen/${ev.id}`} key={ev.id}>
              <div className='group relative rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500'>
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
                            <a
                              href={ev.public_url}
                              key={ticketType.id}
                              onClick={(e) => e.stopPropagation()}
                            >
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
            </Link>
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
