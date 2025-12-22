import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const TorwPage = () => {
  const collections = [
    {
      title: 'Vinter Kollektion 2024',
      images: [
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1470',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1420',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1470',
      ],
    },
    {
      title: 'Efterår Kollektion 2024',
      images: [
        'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1471',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470',
        'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1470',
      ],
    },
    {
      title: 'Sommer Kollektion 2024',
      images: [
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1473',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1488',
        'https://images.unsplash.com/photo-1558769132-cb1aea1c8b6c?q=80&w=1374',
      ],
    },
  ];

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className='relative h-[60vh] flex items-center justify-center'>
          <div className='absolute inset-0'>
            <img
              src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470'
              alt='TØRW'
              className='object-cover w-full h-full'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-background/80 to-background'></div>
          </div>
          <div className='relative z-10 text-center px-4'>
            <h1 className='font-serif text-5xl md:text-7xl font-bold mb-4 text-primary'>
              TØRW
            </h1>
            <p className='font-sans text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto'>
              Tøjbutik og Unika
            </p>
            <p className='font-sans text-lg text-muted-foreground mt-4'>
              Kvalitet • Stil • Tidløst Design
            </p>
          </div>
        </section>

        {/* Collections */}
        {collections.map((collection, idx) => (
          <section
            key={idx}
            className={`py-16 md:py-24 ${idx % 2 === 1 ? 'bg-card' : ''}`}
          >
            <div className='container mx-auto px-4'>
              <h2 className='font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-foreground'>
                {collection.title}
              </h2>
              <div className='grid md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                {collection.images.map((image, imgIdx) => (
                  <div
                    key={imgIdx}
                    className='relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg group'
                  >
                    <img
                      src={image}
                      alt={`${collection.title} ${imgIdx + 1}`}
                      className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-700'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Info Section */}
        <section className='py-16 md:py-24'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center'>
              <h2 className='font-serif text-3xl md:text-4xl font-bold mb-6 text-foreground'>
                Besøg Vores Butik
              </h2>
              <p className='font-sans text-lg text-muted-foreground leading-relaxed mb-8'>
                TØRW er vores tøjbutik, hvor du finder udvalgte brands og unika
                pieces. Vi fokuserer på kvalitet, stil og tidløst design.
                Butikken rummer også et galleri med skiftende udstillinger af
                lokale kunstnere og håndværkere.
              </p>
              <div className='inline-block px-8 py-4 bg-primary/10 border border-primary rounded-lg'>
                <p className='font-sans text-foreground font-medium text-lg'>
                  Åben efter aftale • Kontakt os for besøg
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TorwPage;
