import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { BillettoEvent } from '@/types/billetto.ts';
import { getEventById } from '@/services/billetto.service.ts';
import { useParams } from 'react-router-dom';

const EventsPage = () => {
  const [event, setEvent] = useState<BillettoEvent>();
  const [loading, setLoading] = useState(true);
  const { id: eventUid } = useParams();

  useEffect(() => {
    async function loadEvent() {
      try {
        const event = await getEventById(eventUid);
        console.log('Event fetched in page:', event);
        setEvent(event);
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [eventUid]);

  if (loading) {
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
          {/* Changed max-w-xl to max-w-5xl to allow space for side-by-side view */}
          <div className='container mx-auto px-4 max-w-5xl'>
            {/* GRID LAYOUT:
              grid-cols-1 = Mobile (Stacked)
              md:grid-cols-2 = PC (Side by Side)
            */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start'>
              {/* Left Column (Image) */}
              <div className='w-full'>
                <img
                  src={
                    event.gallery_items?.data[0]?.original_url ??
                    '/placeholder.jpg'
                  }
                  alt={event.name}
                  // Added rounded-xl and shadow for better visuals
                  className='w-full h-auto  rounded-xl shadow-md '
                />
              </div>

              {/* Right Column (Content) */}
              <div className='flex flex-col gap-4'>
                <h3 className='text-3xl font-bold'>{event.name}</h3>

                {/* Added the Calendar icon since you imported it */}
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

                <div
                  className='prose max-w-full text-white'
                  dangerouslySetInnerHTML={{
                    __html: event.editorial.description_html?.replace(
                      /(<br\s*\/?>\s*)+$/,
                      '',
                    ),
                  }}
                />

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
