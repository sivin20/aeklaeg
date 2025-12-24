const TORW = () => {
  return (
    <section id='torw' className='py-20 md:py-32'>
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div className='order-2 md:order-1'>
            <div className='flex items-center gap-4 mb-6'>
              <h2 className='font-typewriter text-3xl md:text-5xl font-bold text-primary'>
                TØRW
              </h2>
              <img
                src='/logos/torw_primary.svg'
                alt='TØRW'
                className='h-12 md:h-16'
              />
            </div>
            <h3 className='font-serif text-2xl md:text-3xl mb-8 text-secondary'>
              Tøjbutik og Unika
            </h3>
            <div className='space-y-6 text-muted-foreground'>
              <p className='font-sans text-lg leading-relaxed'>
                Træd ind i Tørw, hvor mode møder stil og kvalitet. Vores butik
                på Fanø byder på en unik shoppingoplevelse. TØRW åbnede dørene
                2. juni 2023 og har beliggenhed i Æ’ Klæg, et lille kulturhus
                samt butiksfællesskab, tæt ved færgelejet i Nordby på Fanø.
              </p>
              <p className='font-sans text-lg leading-relaxed'>
                I TØRW er der fokus på kvalitetstøj, klassisk tidløst design og
                nutidens fashion. Vores produkter er inspireret fra 1920 til
                1960 slidstærke arbejdstøj blandet med et maritimt udtryk. Der
                tilbydes også et udvalg af plejeprodukter til manden med og uden
                skæg, håndlavede lædervarer og hatte til al slags vejr. Foruden
                at der ikke gåes på kompromis med kvalitet, sættes der en stor
                ære i god service i et behageligt og afslappende miljø.
              </p>
              <div className='pt-4'>
                <div className='inline-block px-6 py-3 bg-primary/10 border border-primary rounded-lg'>
                  <p className='font-sans text-foreground font-medium'>
                    Åben efter aftale • Kontakt os for besøg
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='order-1 md:order-2'>
            <div className='relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl'>
              <img
                src='/img/torw.png'
                alt='TØRW Tøjbutik'
                className='object-cover w-full h-full hover:scale-105 transition-transform duration-700'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-background/60 to-transparent'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TORW;
