const Vaerftet = () => {
  return (
    <section
      id='vaerftet'
      className='py-20 md:py-32 bg-gradient-to-b from-background to-card'
    >
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div>
            <div className='relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl'>
              <img
                src='/img/vaerftet.png'
                alt='Værftet Cocktailbar'
                className='object-cover w-full h-full hover:scale-105 transition-transform duration-700'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-background/60 to-transparent'></div>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-4 mb-6'>
              <h2 className='font-typewriter text-3xl md:text-5xl font-bold text-primary'>
                Værftet
              </h2>
              <img
                src='/logos/vaerftet_primary.svg'
                alt='Værftet'
                className='h-12 md:h-16'
              />
            </div>
            <h3 className='font-serif text-2xl md:text-3xl mb-8 text-secondary'>
              Cocktailbar
            </h3>
            <div className='space-y-6 text-muted-foreground'>
              <p className='font-sans text-lg leading-relaxed'>
                Værftet er vores cocktailbar, hvor vi kombinerer klassiske
                drinks med moderne kreationer. Baren er indrettet i gammel
                værftstil med autentiske detaljer og en varm atmosfære.
              </p>
              <p className='font-sans text-lg leading-relaxed'>
                Her kan du nyde alt fra en klassisk Old Fashioned til vores egne
                specialiteter, alle lavet med omhu og de bedste ingredienser.
              </p>
              <div className='pt-4 space-y-4'>
                <div className='inline-block px-6 py-3 bg-secondary/10 border border-secondary rounded-lg'>
                  <p className='font-sans text-foreground font-medium'>
                    Åben torsdag - lørdag • Reservation anbefales
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vaerftet;
