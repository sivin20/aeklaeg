import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Ticket, Volume2 } from 'lucide-react';
import { BillettoEvent } from '@/types/billetto';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EventCardProps {
  event: BillettoEvent;
  basePath?: string;
}

const EventCard = ({ event, basePath = '/kaedekassen' }: EventCardProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const navigate = useNavigate();

  // --- Helpers ---
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

  // 1. Data Extraction
  const mainTicket = event.ticket_types?.find(
    (tt: any) => tt.type === 'PayTicketType' && !!tt.price,
  );

  const priceString = mainTicket
    ? `${(mainTicket.price / 100).toFixed(0)} DKK`
    : '';

  const hasFoodOption = event.ticket_types?.some(
    (tt: any) => tt.type === 'AddonTicketType' && !!tt.price,
  );

  // 2. YouTube Logic
  // Find the gallery item that is type 'youtube'
  const youtubeItem = event.gallery_items?.data?.find(
    (item: any) => item.type === 'youtube',
  );

  // Extract Video ID from the thumbnail URL (e.g. https://i.ytimg.com/vi/ID_HERE/maxresdefault.jpg)
  const videoId = youtubeItem?.original_url
    ? youtubeItem.original_url.match(/\/vi\/([^\/]+)\//)?.[1]
    : null;

  return (
    <>
      {/* Video Modal */}
      {videoId && (
        <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
          <DialogContent className='sm:max-w-[800px] bg-black border-border/20 p-0 overflow-hidden'>
            <DialogHeader className='sr-only'>
              <DialogTitle>Video: {event.name}</DialogTitle>
            </DialogHeader>
            <div className='aspect-video w-full'>
              <iframe
                width='100%'
                height='100%'
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={event.name}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Card */}
      <div
        className='block h-full cursor-pointer'
        onClick={() => navigate(`${basePath}/${event.id}`)}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') navigate(`${basePath}/${event.id}`);
        }}
      >
        <div className='group relative rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 bg-background h-full'>
          <div className='aspect-[3/4] relative'>
            {/* Image */}
            <img
              src={
                event.gallery_items?.data[0]?.original_url ?? '/placeholder.jpg'
              }
              alt={event.name}
              className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-700'
            />

            {/* "Lyt" / Sound Button (Only if video exists) */}
            {videoId && (
              <div className='absolute top-3 right-3 z-20'>
                <Button
                  size='sm'
                  variant='secondary'
                  className='bg-black/60 hover:bg-primary hover:text-primary-foreground text-white backdrop-blur-md border border-white/10 shadow-lg h-8 px-3 gap-2 transition-all duration-300'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsVideoOpen(true);
                  }}
                >
                  <Volume2 className='w-3.5 h-3.5' />
                  <span className='text-xs font-semibold uppercase tracking-wider'>
                    Lyt
                  </span>
                </Button>
              </div>
            )}

            {/* Darker gradient at bottom for text readability */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none'></div>

            <div className='absolute bottom-0 left-0 right-0 p-6'>
              <h3 className='font-serif text-2xl font-bold mb-3 text-primary leading-tight'>
                {event.name}
              </h3>

              <div className='flex items-end justify-between gap-3'>
                {/* Text Information (Left) */}
                <div className='flex flex-col gap-1'>
                  <p className='font-sans text-white/80 text-sm font-medium capitalize'>
                    {formatDate(event.starts_at)}
                  </p>

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
                <Link
                  to={event.public_url}
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
