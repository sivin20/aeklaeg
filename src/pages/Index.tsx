import Navigation from '@/components/Navigation';
import Hero from '@/components/home/Hero.tsx';
import KaedekassenSection from '@/components/home/KaedekassenSection.tsx';
import Story from '@/components/home/Story.tsx';
import ElsesGab from '@/components/home/ElsesGab.tsx';
import Vaerftet from '@/components/home/Vaerftet.tsx';
import TORW from '@/components/home/TORW.tsx';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navigation />
      <main>
        <Hero />
        <KaedekassenSection />
        {/*<Story />*/}
        <ElsesGab />
        <Vaerftet />
        <TORW />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
