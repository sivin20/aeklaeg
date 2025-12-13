import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const Contact = () => {
  return (
    <section
      id='kontakt'
      className='py-20 md:py-32 bg-gradient-to-b from-background to-card'
    >
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='font-serif text-4xl md:text-6xl font-bold mb-12 text-center text-primary'>
            Kontakt
          </h2>

          <div className='grid md:grid-cols-2 gap-8 mb-12'>
            <div className='bg-card/50 backdrop-blur-sm rounded-lg p-8 border border-border hover:border-primary transition-colors flex justify-between'>
              <div>
                <MapPin className='h-8 w-8 text-primary mb-4' />
                <h3 className='font-serif text-2xl font-bold mb-4 text-foreground'>
                  Adresse
                </h3>
                <p className='font-sans text-muted-foreground'>
                  Havnevej 2<br />
                  6720 Nordby
                  <br />
                  Fanø, Danmark
                </p>
              </div>
              <a
                href='https://www.google.com/maps/dir/?api=1&destination=Havnevej+2%2C+6720+Nordby%2C+Fanø%2C+Danmark'
                target='_blank'
                rel='noopener noreferrer'
                className='self-end mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/80 transition-colors'
              >
                Find vej
              </a>
            </div>

            <div className='bg-card/50 backdrop-blur-sm rounded-lg p-8 border border-border hover:border-primary transition-colors'>
              <Mail className='h-8 w-8 text-primary mb-4' />
              <h3 className='font-serif text-2xl font-bold mb-4 text-foreground'>
                Kontakt os
              </h3>
              <p className='font-sans text-muted-foreground mb-2'>
                info@aeklaeg.dk
              </p>
              <p className='font-sans text-muted-foreground'>
                Tlf: +45 XX XX XX XX
              </p>
            </div>
          </div>

          <div className='bg-card/50 backdrop-blur-sm rounded-lg p-8 border border-border text-center'>
            <h3 className='font-serif text-2xl font-bold mb-6 text-foreground'>
              Følg os
            </h3>
            <div className='flex justify-center gap-6'>
              <a
                href='#'
                className='p-4 bg-primary/10 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors'
                aria-label='Instagram'
              >
                <Instagram className='h-6 w-6' />
              </a>
              <a
                href='#'
                className='p-4 bg-primary/10 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors'
                aria-label='Facebook'
              >
                <Facebook className='h-6 w-6' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
