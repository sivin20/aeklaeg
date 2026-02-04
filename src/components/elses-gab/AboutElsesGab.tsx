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
            <h2 className='font-typewriter text-3xl md:text-5xl font-bold mb-8 text-primary uppercase tracking-wide'>
              Om Elses Gab
            </h2>

            <div className='space-y-6 font-sans text-lg text-muted-foreground leading-relaxed'>
              <p>
                Elses Gab er mere end blot en café; det er en hyggelig tidslomme
                midt i Nordby, der emmer af hjemlig charme og uformelt samvær.
                Fra det øjeblik du træder ind, bydes du velkommen af den trygge
                duft af friskbagt brød og nybrygget kaffe, der straks får
                skuldrene til at sænke sig.
              </p>
              <p>
                Vores stue er indrettet med bløde sofagrupper og detaljer, der
                vækker minder om et besøg hos bedstemor. Det er her, rammen
                sættes om den gode frokost, uanset om du er til vores klassiske
                smørrebrød med et moderne tvist, de åbne sandwiches på
                hjemmebagt brød eller vores populære madvafler
              </p>
              <p>
                Hos os er der ingen fine fornemmelser – kun ærlig mad, lavet fra
                bunden, serveret i rammer hvor man har lyst til at blive
                hængende lidt længere.
              </p>
            </div>

            <div className='mt-10'>
              <a href='#menu'>
                <button className='bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-bold py-3 px-8 rounded-md uppercase tracking-wider text-sm md:text-base shadow-sm'>
                  Se Menuen
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
                src='/img/vaerftet.png'
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
