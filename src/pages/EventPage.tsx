import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import { useEvents } from '@/contexts/EventsContext';

const EventsPage = () => {
  const { id: eventUid } = useParams();
  const { getEventById, isLoading } = useEvents();
  
  const event = eventUid ? getEventById(eventUid) : undefined;

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p>Indlæser event...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p>Event blev ikke fundet.</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navigation />
      <main className='pt-20'>
        <section className='py-16 md:py-24'>
          <div className='container mx-auto px-4 max-w-5xl'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start'>
              {/* Left Column (Image) */}
              <div className='w-full'>
                <img
                  src={
                    event.gallery_items?.data[0]?.original_url ??
                    '/placeholder.jpg'
                  }
                  alt={event.name}
                  className='w-full h-auto rounded-xl shadow-md'
                />
              </div>

              {/* Right Column (Content) */}
              <div className='flex flex-col gap-4'>
                <h3 className='text-3xl font-bold'>{event.name}</h3>

                <div className='flex items-center text-muted-foreground gap-2'>
                  <Calendar className='w-5 h-5' />
                  <p className='text-lg'>
                    {new Date(event.starts_at).toLocaleDateString('da-DK', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                {event.editorial && (
                  <div
                    className='prose max-w-full text-white'
                    dangerouslySetInnerHTML={{
                      __html: event.editorial.description_html?.replace(
                        /(<br\s*\/?>\s*)+$/,
                        '',
                      ),
                    }}
                  />
                )}

                <div className='pt-4'>
                  <a href={event.public_url} target='_blank' rel='noreferrer'>
                    <Button
                      size='lg'
                      className='bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-lg px-8 w-full md:w-auto'
                    >
                      Køb billetter
                    </Button>
                  </a>
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
