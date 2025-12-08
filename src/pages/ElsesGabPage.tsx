import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Instagram } from 'lucide-react';
import OpeningHours from '@/components/elses-gab/OpeningHours';
import MenuSection from '@/components/elses-gab/MenuSection';
import EventSpaceSection from '@/components/EventSpaceSection.tsx';

const ElsesGabPage = () => {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navigation />
      <main className='pt-20'>
        {/* Hero Section */}
        <section className='relative h-[50vh] flex items-center justify-center'>
          <div className='absolute inset-0'>
            <img
              src='https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1547'
              alt='Elses Gab'
              className='object-cover w-full h-full'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-background/80 to-background'></div>
          </div>
          <div className='relative z-10 text-center'>
            <h1 className='font-serif text-5xl md:text-7xl font-bold mb-4 text-primary'>
              Elses Gab
            </h1>
            <p className='font-sans text-xl text-muted-foreground'>
              Kaffe, Kage & Gode Historier
            </p>
          </div>
        </section>

        {/* Menu Section */}
        <MenuSection />

        {/* Event Space Section */}
        <EventSpaceSection />

        {/* Opening Hours */}
        <OpeningHours />

        {/* Instagram Feed */}
        <section className='py-16 md:py-24 bg-background'>
          <div className='container mx-auto px-4'>
            <div className='flex items-center gap-3 mb-12 justify-center'>
              <Instagram className='w-8 h-8 text-primary' />
              <h2 className='font-serif text-3xl md:text-4xl font-bold text-foreground'>
                Følg os på Instagram
              </h2>
            </div>
            <div className='max-w-6xl mx-auto'>
              <div className='text-center mb-8'>
                <a
                  href='https://www.instagram.com/elses_gab/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-sans text-lg'
                >
                  @elses_gab <Instagram className='w-5 h-5' />
                </a>
              </div>

              {/* Instagram Embed Placeholder */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className='aspect-square bg-muted/20 rounded-lg flex items-center justify-center border border-border/20'
                  >
                    <Instagram className='w-12 h-12 text-muted-foreground/30' />
                  </div>
                ))}
              </div>
              <p className='text-center mt-8 text-muted-foreground font-sans'>
                Instagram feed kræver API integration. Besøg vores{' '}
                <a
                  href='https://www.instagram.com/elses_gab/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary hover:underline'
                >
                  Instagram profil
                </a>{' '}
                for at se de nyeste opslag.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ElsesGabPage;
