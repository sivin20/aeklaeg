import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MapPin, Mail, Instagram, Facebook, ExternalLink } from 'lucide-react';

const KontaktPage = () => {
  const address = 'Havnevej 2, 6720 Nordby, Fanø';
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  // Static map image with sepia styling
  const staticMapUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/8.3933,55.4478,14,0/1200x600@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`;

  return (
    <div className='min-h-screen bg-background text-foreground flex flex-col'>
      <Navigation />

      <main className='flex-1'>
        {/* Hero Map Section */}
        <section className='relative h-[50vh] md:h-[60vh] overflow-hidden'>
          {/* Map Background */}
          <a
            href={mapUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='block w-full h-full group'
          >
            <div className='absolute inset-0 bg-card'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2262.953711590034!2d8.400986692423336!3d55.4460390458953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464b27caee823255%3A0xc46d00aae13d9e3a!2zVsOmcmZ0ZXQ!5e0!3m2!1sda!2sdk!4v1766446224124!5m2!1sda!2sdk'
                width='100%'
                height='100%'
                style={{
                  border: 0,
                  filter: 'grayscale(100%) sepia(30%) contrast(0.9)',
                }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='Æ Klæg location'
                className='transition-all duration-500 group-hover:filter-none'
              ></iframe>
            </div>

            {/* Overlay gradient */}
            <div className='absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none' />

            {/* Click hint */}
            <div className='absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-border flex items-center gap-2 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity'>
              <ExternalLink className='h-4 w-4' />
              Åbn i Google Maps
            </div>
          </a>

          {/* Location Pin */}
          <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10'>
            <div className='bg-primary text-primary-foreground p-4 rounded-full shadow-lg'>
              <MapPin className='h-8 w-8' />
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className='py-20 md:py-32'>
          <div className='container mx-auto px-4'>
            <div className='max-w-4xl mx-auto text-center'>
              <h1 className='font-serif text-5xl md:text-7xl font-bold mb-6 text-primary'>
                Kontakt
              </h1>
              <p className='font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-16'>
                Vi glæder os til at byde dig velkommen i Æ Klæg. Find os ved
                havnen i Nordby på Fanø.
              </p>

              {/* Contact Cards */}
              <div className='grid md:grid-cols-2 gap-8 mb-16'>
                {/* Address Card */}
                <div className='bg-card border border-border rounded-xl p-8 text-left hover:border-primary transition-colors group'>
                  <MapPin className='h-10 w-10 text-primary mb-6 group-hover:scale-110 transition-transform' />
                  <h2 className='font-serif text-2xl font-bold mb-4 text-foreground'>
                    Adresse
                  </h2>
                  <p className='font-sans text-muted-foreground leading-relaxed mb-6'>
                    Havnevej 2<br />
                    6720 Nordby
                    <br />
                    Fanø, Danmark
                  </p>
                  <a
                    href={mapUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors'
                  >
                    Find vej
                    <ExternalLink className='h-4 w-4' />
                  </a>
                </div>

                {/* Email Card */}
                <div className='bg-card border border-border rounded-xl p-8 text-left hover:border-primary transition-colors group'>
                  <Mail className='h-10 w-10 text-primary mb-6 group-hover:scale-110 transition-transform' />
                  <h2 className='font-serif text-2xl font-bold mb-4 text-foreground'>
                    Email
                  </h2>
                  <p className='font-sans text-muted-foreground leading-relaxed mb-6'>
                    Har du spørgsmål eller ønsker at booke?
                    <br />
                    Send os en mail, så vender vi tilbage hurtigst muligt.
                  </p>
                  <a
                    href='mailto:elsesgab@gmail.com'
                    className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors'
                  >
                    elsesgab@gmail.com
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className='bg-card border border-border rounded-xl p-8'>
                <h2 className='font-serif text-2xl font-bold mb-6 text-foreground'>
                  Følg os
                </h2>
                <p className='font-sans text-muted-foreground mb-8'>
                  Hold dig opdateret med events, nyheder og stemningen fra Æ
                  Klæg
                </p>
                <div className='flex justify-center gap-4'>
                  <a
                    href='https://www.instagram.com/elses_gab/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-lg hover:border-primary hover:text-primary transition-colors'
                  >
                    <Instagram className='h-5 w-5' />
                    <span className='font-sans font-medium'>Instagram</span>
                  </a>
                  <a
                    href='https://www.facebook.com/profile.php?id=100043699035975'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-lg hover:border-primary hover:text-primary transition-colors'
                  >
                    <Facebook className='h-5 w-5' />
                    <span className='font-sans font-medium'>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default KontaktPage;
