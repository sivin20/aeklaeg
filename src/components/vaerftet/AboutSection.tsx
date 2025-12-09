import React from 'react';

const AboutSection = () => {
  return (
    <section
      className='py-16 md:py-24 bg-background text-foreground overflow-hidden'
      id='about'
    >
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
          {/* LEFT COLUMN: Text Content */}
          <div className='order-2 lg:order-1'>
            <h2 className='font-serif text-4xl md:text-6xl font-bold mb-8 text-primary uppercase tracking-wide'>
              Om Værftet
            </h2>

            <div className='space-y-6 font-sans text-lg text-muted-foreground leading-relaxed'>
              <p>
                Værftet er det sted du ikke vidste du manglede. Du træder ind i
                en bar, hvor stemningen og musikken er meget anderledes end
                mange andre steder. Der er meget for ganen, og går du på udkig,
                er der en masse finurligheder for øjnene og sjælen. Vi serverer
                den gode lokalt bryggede specialøl, nøje udvalgte drinks, vine,
                kaffe og saft.
              </p>

              <p>
                Her kan du udfordre i mange slags spil, eller bare sidde og
                slappe af i samtale og nyde musikken og den hyggelige stemning.
              </p>
            </div>

            <div className='mt-10'>
              <a href='#bar-card'>
                <button className='bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-bold py-3 px-8 rounded-md uppercase tracking-wider text-sm md:text-base shadow-sm'>
                  Se Barkort
                </button>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Framed Image */}
          <div className='order-1 lg:order-2 flex justify-center'>
            <div className='relative w-full max-w-md md:max-w-lg aspect-square group'>
              {/* Decorative "Offset" Frame (Uses your primary color) */}
              <div className='absolute inset-0 border-2 border-primary/30 rounded-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 ease-out'></div>

              {/* Solid Background Frame */}
              <div className='absolute inset-0 bg-card rounded-2xl shadow-xl'></div>

              {/* Main Image */}
              <img
                src='https://images.unsplash.com/photo-1572116469696-9a58ba6c2c16?q=80&w=1000'
                alt='Stemning hos Værftet'
                className='absolute inset-0 w-full h-full object-cover rounded-2xl shadow-sm z-10'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
