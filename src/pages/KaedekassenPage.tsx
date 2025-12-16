import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEvents } from '@/contexts/EventsContext';
import { Link } from 'react-router-dom';

const KaedekassenPage = () => {
  const { upcomingEvents, previousEvents, isLoading } = useEvents();

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navigation />
      <main className='pt-20'>
        {/* Hero Section */}
        <section className='relative h-[50vh] flex items-center justify-center'>
          <div className='absolute inset-0'>
            <img
              src='https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1470'
              alt='Events'
              className='object-cover w-full h-full'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-background/90 to-background'></div>
          </div>
          <div className='relative z-10 text-center px-4'>
            <h1 className='font-serif text-5xl md:text-7xl font-bold mb-4 text-primary'>
              Kædekassen
            </h1>
            <p className='font-sans text-xl text-muted-foreground'>
              Oplevelser, Musik & Kunst
            </p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className='py-16 md:py-24'>
          <div className='container mx-auto px-4'>
            <h2 className='font-serif text-3xl md:text-5xl font-bold text-center mb-16 text-foreground'>
              Kommende Events
            </h2>
            {isLoading ? (
              <p className='text-center'>Indlæser events...</p>
            ) : (
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12'>
                {upcomingEvents.slice(0, 6).map((ev) => (
                  <div
                    key={ev.id}
                    className='group relative rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500'
                  >
                    <Link to={`/kaedekassen/${ev.id}`}>
                      <div className='aspect-[3/4] relative overflow-hidden'>
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
                            {new Date(ev.starts_at).toLocaleDateString('da-DK', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}{' '}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Previous Events */}
        <section className='py-16 md:py-24 bg-card'>
          <div className='container mx-auto px-4'>
            <h2 className='font-serif text-4xl text-center mb-12'>
              Musikere gennem tiden
            </h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
              {previousEvents.map((ev) => (
                <div
                  key={ev.id}
                  className='flex flex-col items-center text-center'
                >
                  <div className='w-full max-w-xs aspect-square overflow-hidden rounded-lg'>
                    <img
                      src={
                        ev.gallery_items?.data[0]?.original_url ??
                        '/placeholder.jpg'
                      }
                      alt={ev.name}
                      className='object-cover w-full h-full transition-transform duration-500 hover:scale-105'
                    />
                  </div>
                  <h3 className='mt-4 font-serif text-lg font-bold text-primary'>
                    {ev.name}
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    {new Date(ev.starts_at).toLocaleDateString('da-DK')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default KaedekassenPage;
