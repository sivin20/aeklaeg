import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';
import { BillettoEvent } from '@/types/billetto'; // Assuming you have this type, otherwise use 'any'

interface EventCardProps {
  event: BillettoEvent; // or 'any' if you don't have the type file
  basePath?: string; // Optional: Defaults to '/kaedekassen'
}

const EventCard = ({ event, basePath = '/kaedekassen' }: EventCardProps) => {
  // Helper function moved inside the component
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const currentYear = new Date().getFullYear();
    const eventYear = date.getFullYear();
    const showYear = eventYear !== currentYear;

    return date.toLocaleDateString('da-DK', {
      day: 'numeric',
      month: 'long',
      year: showYear ? 'numeric' : undefined,
    });
  };

  // 1. Find the main ticket price
  const mainTicket = event.ticket_types?.find(
    (tt: any) => tt.type === 'PayTicketType' && !!tt.price,
  );

  const priceString = mainTicket
    ? `${(mainTicket.price / 100).toFixed(0)} DKK`
    : '';

  // 2. Check for food add-on
  const hasFoodOption = event.ticket_types?.some(
    (tt: any) => tt.type === 'AddonTicketType' && !!tt.price,
  );

  return (
    <Link to={`${basePath}/${event.id}`} key={event.id}>
      <div className='group relative rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 bg-background h-full'>
        <div className='aspect-[3/4] relative'>
          <img
            src={
              event.gallery_items?.data[0]?.original_url ?? '/placeholder.jpg'
            }
            alt={event.name}
            className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-700'
          />

          {/* Darker gradient at bottom for text readability */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent'></div>

          <div className='absolute bottom-0 left-0 right-0 p-6'>
            <h3 className='font-serif text-2xl font-bold mb-3 text-primary leading-tight'>
              {event.name}
            </h3>

            <div className='flex items-end justify-between gap-3'>
              {/* Text Information (Left) */}
              <div className='flex flex-col gap-1'>
                {/* Date: White/Gray & Capitalized Month */}
                <p className='font-sans text-white/80 text-sm font-medium capitalize'>
                  {formatDate(event.starts_at)}
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
                href={event.public_url}
                target='_blank'
                rel='noreferrer'
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  size='sm'
                  className='bg-primary text-primary-foreground hover:bg-primary/90'
                >
                  <div className='font-sans text-sm flex gap-2 items-center font-semibold'>
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
};

export default EventCard;
