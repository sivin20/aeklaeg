import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Utensils,
  ArrowLeft,
  ExternalLink,
  Volume2, // Added Volume Icon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '@/contexts/EventsContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'; // Added Dialog imports

const EventsPage = () => {
  const { id: eventUid } = useParams();
  const { getEventById, isLoading } = useEvents();
  const [isVideoOpen, setIsVideoOpen] = useState(false); // Added State for Video Modal

  const event = eventUid ? getEventById(eventUid) : undefined;

  // --- Helper Functions ---

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

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('da-DK', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background text-foreground'>
        <p className='animate-pulse'>Indlæser event...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background text-foreground'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-4'>Event blev ikke fundet</h2>
          <Link to='/kaedekassen'>
            <Button variant='outline'>Gå tilbage til oversigten</Button>
          </Link>
        </div>
      </div>
    );
  }

  // --- Data Extraction ---
  const mainTicket = event.ticket_types?.find(
    (tt: any) => tt.type === 'PayTicketType' && !!tt.price,
  );

  const addonTickets = event.ticket_types?.filter(
    (tt: any) => tt.type === 'AddonTicketType' && !!tt.price,
  );

  const hasFood = addonTickets && addonTickets.length > 0;

  // --- YouTube Logic (Same as EventCard) ---
  const youtubeItem = event.gallery_items?.data?.find(
    (item: any) => item.type === 'youtube',
  );

  const videoId = youtubeItem?.original_url
    ? youtubeItem.original_url.match(/\/vi\/([^\/]+)\//)?.[1]
    : null;

  return (
    <div className='min-h-screen bg-background text-foreground flex flex-col'>
      <Navigation />

      {/* --- Video Modal --- */}
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

      <main className='pt-10 flex-grow'>
        <section className='pb-16 md:pb-24'>
          <div className='container mx-auto px-4 max-w-6xl'>
            {/* Back Button */}
            <div className='mb-8'>
              <Link
                to='/kaedekassen'
                className='inline-flex items-center text-muted-foreground hover:text-primary transition-colors'
              >
                <ArrowLeft className='w-4 h-4 mr-2' />
                Tilbage til oversigt
              </Link>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start'>
              {/* LEFT COLUMN: Image + Description */}
              <div className='lg:col-span-7 w-full space-y-8'>
                {/* Image Container */}
                <div className='relative rounded-xl overflow-hidden shadow-2xl bg-card border border-border/10 aspect-[4/3] md:aspect-video lg:aspect-auto lg:h-[400px] group'>
                  <img
                    src={
                      event.gallery_items?.data[0]?.original_url ??
                      '/placeholder.jpg'
                    }
                    alt={event.name}
                    className='w-full h-full object-cover'
                  />

                  {/* Gradient Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none'></div>

                  {/* "Lyt" Button (Only if video exists) */}
                  {videoId && (
                    <div className='absolute top-4 right-4 z-20'>
                      <Button
                        size='sm'
                        variant='secondary'
                        className='bg-black/60 hover:bg-primary hover:text-primary-foreground text-white backdrop-blur-md border border-white/10 shadow-lg h-9 px-4 gap-2 transition-all duration-300'
                        onClick={() => setIsVideoOpen(true)}
                      >
                        <Volume2 className='w-4 h-4' />
                        <span className='text-xs font-semibold uppercase tracking-wider'>
                          Lyt
                        </span>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Description */}
                {event.editorial && (
                  <div className='bg-card/30 rounded-xl p-0 md:p-4'>
                    <h3 className='font-typewriter text-xl font-bold mb-4 text-primary'>
                      Om Eventet
                    </h3>
                    <div
                      className='prose prose-invert prose-lg max-w-full text-gray-300 leading-relaxed'
                      dangerouslySetInnerHTML={{
                        __html: event.editorial.description_html?.replace(
                          /(<br\s*\/?>\s*)+$/,
                          '',
                        ),
                      }}
                    />
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN */}
              <div className='lg:col-span-5 flex flex-col gap-8 h-full'>
                {/* Header Info */}
                <div>
                  <h1 className='text-2xl md:text-4xl font-typewriter font-bold text-foreground mb-4 leading-tight'>
                    {event.name}
                  </h1>

                  {/* Meta Data Icons */}
                  <div className='flex flex-col gap-4 mt-6 border-b border-border/20 pb-8'>
                    <div className='flex items-center text-foreground/90 gap-4'>
                      <div className='bg-primary/10 p-2.5 rounded-lg border border-primary/20'>
                        <Calendar className='w-5 h-5 text-primary' />
                      </div>
                      <div>
                        <p className='text-sm text-muted-foreground font-medium'>
                          Dato
                        </p>
                        <p className='text-lg capitalize font-semibold'>
                          {formatDate(event.starts_at)}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center text-foreground/90 gap-4'>
                      <div className='bg-primary/10 p-2.5 rounded-lg border border-primary/20'>
                        <Clock className='w-5 h-5 text-primary' />
                      </div>
                      <div>
                        <p className='text-sm text-muted-foreground font-medium'>
                          Tidspunkt
                        </p>
                        <p className='text-lg font-semibold'>
                          Kl. {formatTime(event.starts_at)}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center text-foreground/90 gap-4'>
                      <div className='bg-primary/10 p-2.5 rounded-lg border border-primary/20'>
                        <MapPin className='w-5 h-5 text-primary' />
                      </div>
                      <div>
                        <p className='text-sm text-muted-foreground font-medium'>
                          Lokation
                        </p>
                        <p className='text-lg font-semibold'>Kædekassen</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ticket & Price Info Card */}
                <div className='bg-card border border-border/40 rounded-xl p-6 shadow-lg relative overflow-hidden lg:sticky lg:top-24'>
                  {/* Decorative background accent */}
                  <div className='absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 pointer-events-none'></div>

                  <h3 className='font-typewriter text-lg font-semibold mb-6 text-foreground flex items-center gap-2'>
                    <Ticket className='w-5 h-5 text-primary' />
                    Billetter & Tilvalg
                  </h3>

                  <div className='space-y-5'>
                    {/* Standard Ticket */}
                    <div className='flex justify-between items-start'>
                      <div className='flex items-center gap-3'>
                        <div>
                          <p className='font-medium text-foreground text-lg'>
                            Koncertbillet
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            Standard entré
                          </p>
                        </div>
                      </div>
                      <span className='font-bold text-xl text-primary'>
                        {mainTicket
                          ? `${(mainTicket.price / 100).toFixed(0)} DKK`
                          : 'Udsolgt'}
                      </span>
                    </div>

                    {/* Food Add-on */}
                    {hasFood &&
                      addonTickets?.map((addon: any) => (
                        <div
                          key={addon.id}
                          className='flex justify-between items-start pt-4 border-t border-border/30 border-dashed'
                        >
                          <div className='flex items-center gap-3'>
                            <div>
                              <p className='font-medium text-foreground text-lg'>
                                {addon.name || 'Mad & Spisning'}
                              </p>
                              <div className='flex items-center gap-1 text-sm text-muted-foreground mt-0.5'>
                                <Utensils className='w-3 h-3' />
                                <p className='italic'>
                                  Tilkøb (Mad før koncert)
                                </p>
                              </div>
                            </div>
                          </div>
                          <span className='font-bold text-xl text-primary'>
                            {`${(addon.price / 100).toFixed(0)} DKK`}
                          </span>
                        </div>
                      ))}
                  </div>

                  <div className='mt-8 pt-6 border-t border-border/40'>
                    <a
                      href={event.public_url}
                      target='_blank'
                      rel='noreferrer'
                      className='block w-full'
                    >
                      <Button
                        size='lg'
                        className='w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold h-14 shadow-md transition-transform hover:scale-[1.01]'
                      >
                        Gå til bestilling{' '}
                        <ExternalLink className='ml-2 w-5 h-5' />
                      </Button>
                    </a>
                    <p className='text-center text-[10px] uppercase tracking-wider text-muted-foreground mt-3'>
                      Sikkert køb via Billetto
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;
