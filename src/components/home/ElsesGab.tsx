const ElsesGab = () => {
  return (
    <section id='elses-gab' className='py-20 md:py-32'>
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div className='order-2 md:order-1'>
            <div className='flex items-center gap-4 mb-6'>
              <h2 className='font-serif text-4xl md:text-6xl font-bold text-primary'>
                Elses Gab
              </h2>
              <img
                src='/logos/elsesgab_outlined-primary.svg'
                alt='Elses Gab'
                className='h-12 md:h-16'
              />
            </div>
            <h3 className='font-serif text-2xl md:text-3xl mb-8 text-secondary'>
              Café og Spisested
            </h3>
            <div className='space-y-6 text-muted-foreground'>
              <p className='font-sans text-lg leading-relaxed'>
                Elses Gab er en hyggelig café, der emmer af hjemlig charme. Her
                bydes gæsterne velkommen af duften af friskbagt brød og
                nybrygget kaffe.
              </p>
              <p className='font-sans text-lg leading-relaxed'>
                På menukortet finder du et udvalg af smørrebrød med et tvist, du
                ikke så ofte ser.Den flade til Gabet, åbne sandwiches på
                hjemmebagt brød, og mad vafler med forskellige toppings. Stuen
                du kommer ind i fra gårdspladsen, eller direkte fra vejen, kan
                på mange måder vække minder om et besøg hos bedstemor. Stuen
                danner rammen omkring den hyggelige frokost, hygge i sofagruppe.
              </p>
              <div className='pt-4'>
                <div className='inline-block px-6 py-3 bg-primary/10 border border-primary rounded-lg'>
                  <p className='font-sans text-foreground font-medium'>
                    Åben dagligt • Se åbningstider på vores sociale medier
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='order-1 md:order-2'>
            <div className='relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl'>
              <img
                src='/img/elsesgab.png'
                alt='Elses Gab Café'
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

export default ElsesGab;
