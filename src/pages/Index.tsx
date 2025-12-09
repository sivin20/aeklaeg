import Navigation from '@/components/Navigation';
import Hero from '@/components/home/Hero.tsx';
import EventsHighlight from '@/components/home/EventsHighlight.tsx';
import Story from '@/components/home/Story.tsx';
import ElsesGab from '@/components/home/ElsesGab.tsx';
import Vaerftet from '@/components/home/Vaerftet.tsx';
import TORW from '@/components/home/TORW.tsx';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navigation />
      <main>
        <Hero />
        <EventsHighlight />
        <Story />
        <ElsesGab />
        <Vaerftet />
        <TORW />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
