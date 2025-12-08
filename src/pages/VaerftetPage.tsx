import Navigation from '@/components/Navigation.tsx';
import OpeningHours from '@/components/elses-gab/OpeningHours.tsx';
import MenuSection from '@/components/elses-gab/MenuSection.tsx';
import { Instagram } from 'lucide-react';
import Footer from '@/components/Footer.tsx';

const VaerftetPage = () => {
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
              Værftet
            </h1>
            <p className='font-sans text-xl text-muted-foreground'>
              Kaffe, Kage & Gode Historier
            </p>
          </div>
        </section>

        {/* Opening Hours */}
        <OpeningHours />
      </main>
      <Footer />
    </div>
  );
};

export default VaerftetPage;
