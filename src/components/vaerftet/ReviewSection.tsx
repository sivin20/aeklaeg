import { Star, Quote, ArrowUpRight } from 'lucide-react';

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'Susanne Godt',
      text: 'Det er et perfekt sted at blive hængende - hvis jeg boede her, ville det være min lokale pub - nu bruger vi den altid gerne på ferie til at spille backgammon og nyde en eller flere lækre drinks med velsmagende nødder (kys😜) og lytte til god musik.',
      source: 'Google',
      link: 'https://share.google/RW3LsxapkXBrxpqp7',
    },
    {
      id: 2,
      name: 'Volker Bestmann',
      text: 'Super søde mennesker, god, venlig service! Altid et besøg værd på Fanø - god stemning, og der er altid noget nyt at opdage! Øllen smager dobbelt så godt i denne hyggelige hyggeagtige atmosfære.',
      source: 'Google',
      link: 'https://share.google/q9HleQDUafVjEbzgo',
    },
    {
      id: 3,
      name: 'Morten Trier',
      text: 'Det er et fedt sted , med kunst som nabo (God kunst) , men med et herligt maskulint twist. Og så har de god musiksmag, Cigar (udendørs) og Øl mv. 😎 Et besøg værd',
      source: 'Google',
      link: 'https://share.google/T8M8G7e1Ws7ENPjG7',
    },
  ];

  return (
    <section className='py-20 md:py-24 bg-muted/30 border-t border-border'>
      <div className='container mx-auto px-6'>
        {/* Header */}
        <div className='text-center mb-16 space-y-4'>
          <h2 className='font-typewriter text-2xl md:text-4xl text-foreground'>
            Det siger vores gæster
          </h2>
          <div className='flex items-center justify-center gap-2 text-primary'>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className='w-5 h-5 fill-primary text-primary' />
              ))}
            </div>
            <span className='text-sm font-sans text-muted-foreground ml-2'>
              4.9 af 5 stjerner
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {reviews.map((review) => (
            <a
              key={review.id}
              href={review.link}
              target='_blank'
              rel='noopener noreferrer'
              className='group relative bg-background p-8 rounded-sm shadow-sm border border-border/50 flex flex-col h-full hover:border-primary/40 hover:shadow-md transition-all duration-300'
            >
              {/* Decoration Icon */}
              <Quote className='absolute top-6 right-6 h-8 w-8 text-primary/10 rotate-180 group-hover:text-primary/20 transition-colors' />

              {/* Stars */}
              <div className='flex gap-1 mb-6'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='w-4 h-4 fill-primary text-primary' />
                ))}
              </div>

              {/* Text */}
              <p className='font-serif text-lg text-foreground mb-6 flex-grow leading-relaxed italic opacity-90 group-hover:opacity-100 transition-opacity'>
                "{review.text}"
              </p>

              {/* Author Info & Link Indicator */}
              <div className='mt-auto pt-6 border-t border-border/50 flex items-center justify-between'>
                <div>
                  <p className='font-sans text-sm font-bold text-foreground group-hover:text-primary transition-colors'>
                    {review.name}
                  </p>
                  <p className='text-xs text-muted-foreground flex items-center gap-1'>
                    Via {review.source}
                    {/* Small arrow to indicate external link */}
                    <ArrowUpRight className='h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300' />
                  </p>
                </div>

                {/* Initials circle */}
                <div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300'>
                  {review.name.charAt(0)}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* "Read More" Link */}
        <div className='mt-12 text-center'>
          <a
            href='https://www.google.com/maps/place/V%C3%A6rftet/@55.4460353,8.4056002,19z/data=!3m1!5s0x464b276a8bdcf161:0x80e170e01c896451!4m8!3m7!1s0x464b27caee823255:0xc46d00aae13d9e3a!8m2!3d55.4460361!4d8.4058576!9m1!1b1!16s%2Fg%2F11h7zbhp2b?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D' // Updated to a generic Google Maps search link for Æ Klæg
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5'
          >
            Læs alle anmeldelser på Google
            <ArrowUpRight className='h-4 w-4' />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
