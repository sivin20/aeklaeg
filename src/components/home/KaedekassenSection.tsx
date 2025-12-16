import { Calendar, ArrowRight, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useEvents } from '@/contexts/EventsContext';
import { Link } from 'react-router-dom';

const KaedekassenSection = () => {
  const { upcomingEvents, isLoading } = useEvents();
  const finalEvents = upcomingEvents.slice(0, 3);

  if (isLoading) return <p className='text-center py-20'>Loading events...</p>;

  // Helper function to format date specifically as requested: "13. November"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const currentYear = new Date().getFullYear();
    const eventYear = date.getFullYear();

    // Check if we need to show the year
    const showYear = eventYear !== currentYear;

    return date.toLocaleDateString('da-DK', {
      day: 'numeric',
      month: 'long',
      year: showYear ? 'numeric' : undefined,
    });
  };

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

        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12'>
          {finalEvents.map((ev) => {
            // 1. Find the main ticket price (PayTicketType)
            const mainTicket = ev.ticket_types?.find(
              (tt) => tt.type === 'PayTicketType' && !!tt.price,
            );
            const priceString = mainTicket
              ? `${(mainTicket.price / 100).toFixed(0)} DKK`
              : '';

            // 2. Check if there is ANY add-on ticket (Food)
            const hasFoodOption = ev.ticket_types?.some(
              (tt) => tt.type === 'AddonTicketType' && !!tt.price,
            );

            return (
              <Link to={`/kaedekassen/${ev.id}`} key={ev.id}>
                <div className='group relative rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 bg-background'>
                  <div className='aspect-[3/4] relative'>
                    <img
                      src={
                        ev.gallery_items?.data[0]?.original_url ??
                        '/placeholder.jpg'
                      }
                      alt={ev.name}
                      className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-700'
                    />

                    {/* Darker gradient at bottom for text readability */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent'></div>

                    <div className='absolute bottom-0 left-0 right-0 p-6'>
                      <h3 className='font-serif text-2xl font-bold mb-3 text-primary leading-tight'>
                        {ev.name}
                      </h3>

                      <div className='flex items-end justify-between gap-3'>
                        {/* Text Information (Left) */}
                        <div className='flex flex-col gap-1'>
                          {/* Date: White/Gray & Capitalized Month */}
                          <p className='font-sans text-white/80 text-sm font-medium capitalize'>
                            {formatDate(ev.starts_at)}
                          </p>

                          {/* Price: Primary Color (Gold/Yellow) */}
                          {priceString && (
                            <p className='font-sans text-primary text-base font-bold'>
                              {priceString}
                            </p>
                          )}

                          {hasFoodOption && (
                            <p className='font-sans text-white/50 text-xs italic mt-1'>
                              Mad kan tilkøbes
                            </p>
                          )}
                        </div>

                        {/* Button (Right) */}
                        <a
                          href={ev.public_url}
                          target='_blank'
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            size='sm'
                            className='bg-primary text-primary-foreground hover:bg-primary/90'
                          >
                            <div className='font-sans text-sm flex gap-2 items-center font-semibold'>
                              {/* 'hidden' hides it on all screens by default (mobile/md) */}
                              {/* 'lg:inline' makes it visible only on large screens and up */}
                              <span className='sm:inline md:hidden lg:inline'>
                                Find billetter
                              </span>
                              <Ticket className='w-4 h-4' />
                            </div>
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
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
