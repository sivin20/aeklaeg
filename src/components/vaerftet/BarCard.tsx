import React from 'react';
import { Beer, Coffee, Droplets } from 'lucide-react';

const BarCard = () => {
  const cocktails = [
    // From Image 1
    {
      name: 'Værftets Aviation',
      description:
        'The forgotten cocktail! 3 cl Aviation American Gin, 1 cl Marashino, 1 cl Crème de Violette, 1 cl lime/citronsaft.',
      price: '110,-',
    },
    {
      name: 'Værftets British Gentleman',
      description:
        "6 cl Hendrick's Gin, 3 cl Solbær Rom likør, 8 cl Fever Tree tonic, is, røres.",
      price: '110,-',
    },
    {
      name: 'Værftets Foxy Lady',
      description:
        '4 cl Bombay Sapphire Gin, 2 cl Cointreau, 1 cl sugar cane mixer, 1 cl citronsaft, 1 cl æggehvide.',
      price: '110,-',
    },
    {
      name: 'Værftets Gimlet',
      description:
        "6 cl Hendrick's Gin, 4 cl Lime Mixer, limehjul, is, røres godt.",
      price: '85,-',
    },
    {
      name: 'Værftets Negroni',
      description:
        "3 cl Hendrick's Gin, 3 cl Campari, 3 cl Martini Rosso, ½ appelsinhjul, is.",
      price: '85,-',
    },
    {
      name: 'Værftets Ginn Hass',
      description:
        "3 cl Hendrick's Gin, 3 cl Mango Mixer, 1cl Lime Mixer, lemonsoda, limehjul, is.",
      price: '70,-',
    },
    {
      name: 'Værftets Rhubarb Collins',
      description:
        '3 cl Bombay Sapphire Gin, 3 cl Rhubarb Mixer, 1cl Sugar Cane mixer, lemonsoda, lidt danskvand, limehjul, is.',
      price: '70,-',
    },
    {
      name: 'Værftets Gin & Tonic',
      description: "3 cl Hendrick's Gin, Fever Tree tonic, limehjul, is.",
      price: '70,-',
    },
    {
      name: 'Værftets Gin & Lemon',
      description: "3 cl Hendrick's Gin, lemon sodavand, limehjul, is.",
      price: '70,-',
    },
    {
      name: 'Værftets Whiskey Why So Sour',
      description:
        '5 cl Bourbon, 2 cl Sugar Cane, 3 cl Citronsaft, 3 cl Egg White, 2 dråber Angustura, is, appelsinskive.',
      price: '85,-',
    },
    {
      name: "Værftets Man O' War",
      description:
        '5 cl Wild Turkey Kentucky Straight Bourbon, 2 cl Cointrea, 2 cl Martini Rosso, 1 cl sugar cane mixer, 1 cl citronsaft.',
      price: '110,-',
    },
    {
      name: "Jack Daniel's & Cola",
      description: "3 cl Jack Daniel's Old No.7, Hancock Cola, is.",
      price: '70,-',
    },
    // From Image 2
    {
      name: 'Værftets Irish Coffee with a twist',
      description:
        'En lungo stærk kaffe med 2 cl Sugar Cane, 1 cl Kahlua likør. Flødeskum med lidt revet muskatnød. 3 cl Tullamore Whisky.',
      price: '85,-',
    },
    {
      name: 'Værftets Screaming Bird',
      description:
        '4 cl Cucullo Rom, 2 cl Campari, 2 cl sugar cane mixer, 2 cl limesaft, toppes op med ananas sodavand.',
      price: '110,-',
    },
    {
      name: 'Værftets American Idiot',
      description:
        '4 cl Kraken Rum, 1 cl kokos sirup, 1 cl citronsaft, top op med citronvand, limehjul, is.',
      price: '85,-',
    },
    {
      name: "Værftets Dark'N'Horny",
      description:
        '3 cl Kraken Rum, Ginger Beer, et skvæt Angustura, lime, is.',
      price: '70,-',
    },
    {
      name: 'Værftets Cuba Libré',
      description: '3 cl Havana Club 7 Anos Rum, Hancock Cola, lime, is.',
      price: '70,-',
    },
    {
      name: 'Værftets Porn Star m. prosecco shot',
      description:
        '2 cl Passoa likør, 1 cl Sugar Cane, 6 cl Absolut Vaniljevodka, 3 cl citronsaft. Serveres med sidevogn: prosecco i shotsglas.',
      price: '125,-',
    },
    {
      name: 'Værftets Blodrøde Marie',
      description:
        '6 cl Absolut Vodka, 9 cl Tomato Juice, 1 cl citronsaft, Worcestershire sauce, Tabasco, salt & peber.',
      price: '110,-',
    },
    {
      name: 'Værftets Cosmopolitanerinde',
      description:
        '3 cl Absolut Vodka, 2 cl Cointreau, 4 cl Rhubarb Mixer, 2 cl Lime Mixer, is.',
      price: '85,-',
    },
    {
      name: 'Værftets Big Lebowski',
      description:
        '3 cl Absolut Vodka, 3 cl Kahlua, 2 cl mælk, hældes over is.',
      price: '85,-',
    },
    {
      name: 'Værftets Limoncello Mule',
      description:
        '3 cl Absolut Vodka, 3 cl Limoncello, 2 cl limesaft, ginger beer, limehjul.',
      price: '85,-',
    },
    {
      name: 'Værftets Dead Putin',
      description:
        '3 cl Absolut Vodka, 3 cl Lime Mixer, ginger beer, lime, is.',
      price: '70,-',
    },
    {
      name: 'Værftets Espresso Martini',
      description: '3 cl Absolut Vodka, 4 cl kahlua, lille espresso kaffe, is.',
      price: '70,-',
    },
    {
      name: 'Værftets Aperol Spritz',
      description:
        '6 cl Aperol, ca. 12 cl Prosecco, 3 cl danskvand, ½ appelsinhjul, is.',
      price: '85,-',
    },
    {
      name: 'Værftets Limoncello Spritz',
      description:
        '9 cl Limoncello, 6 cl Prosecco, 3 cl danskvand, lidt citronsaft, limehjul, is.',
      price: '85,-',
    },
  ];

  return (
    <section className='py-20 md:py-24 bg-background' id='bar-card'>
      <div className='container mx-auto px-4 max-w-5xl space-y-12'>
        {/* === CARD 1: COCKTAILS === */}
        <div className='bg-card border border-border/50 p-8 md:p-12 rounded-sm shadow-sm relative overflow-hidden'>
          <div className='text-center mb-12'>
            <h2 className='font-typewriter text-3xl md:text-4xl text-primary mb-4'>
              Cocktailkort
            </h2>
            <div className='h-1 w-24 bg-primary/30 mx-auto rounded-full' />
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8'>
            {cocktails.map((cocktail, index) => (
              <div key={index} className='group'>
                <div className='flex justify-between items-baseline mb-1'>
                  <h3 className='font-serif text-xl text-foreground group-hover:text-primary transition-colors pr-4 relative z-10 bg-card'>
                    {cocktail.name}
                  </h3>
                  <div className='flex-grow border-b border-dotted border-muted-foreground/40 mx-2 self-center relative -top-1'></div>
                  <span className='font-serif text-xl text-primary font-semibold pl-4 relative z-10 bg-card'>
                    {cocktail.price}
                  </span>
                </div>
                <p className='font-sans text-sm text-muted-foreground leading-relaxed'>
                  {cocktail.description}
                </p>
              </div>
            ))}
          </div>

          <div className='text-center mt-16 pt-8 border-t border-border/50'>
            <p className='font-serif text-lg text-muted-foreground italic'>
              "Drik med omtanke og nydelse. Velbekomme!"
            </p>
          </div>

          <div className='absolute top-0 left-0 w-full h-full bg-primary/5 -z-10 pointer-events-none mix-blend-multiply' />
        </div>

        {/* === CARD 2: BEER & NON-ALCOHOLIC === */}
        <div className='bg-card border border-border/50 rounded-sm shadow-sm relative overflow-hidden grid grid-cols-1 md:grid-cols-2'>
          {/* LEFT SIDE: IMAGE SPLASH WITH TEXT OVERLAY */}
          <div className='relative h-96 md:h-full min-h-[400px] group'>
            {/* REPLACE THIS SRC WITH YOUR ACTUAL IMAGE PATH */}
            <img
              src='/img/vaerftet_oel.jpg'
              alt='Værftet Beer'
              className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
            />
            {/* Gradient overlay for text readability */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent' />

            {/* Text Content Overlay */}
            <div className='absolute bottom-0 left-0 p-8 md:p-12 text-white z-10'>
              <div className='flex items-center gap-3 mb-4 opacity-90'>
                <Beer className='w-6 h-6 text-primary' />
                <span className='text-sm font-bold tracking-widest uppercase'>
                  Signatur Øl
                </span>
              </div>
              <h3 className='font-typewriter text-xl md:text-2xl font-bold mb-4 leading-tight'>
                Værftet x Fanø Bryghus
              </h3>
              <p className='font-serif text-xl italic text-white/90 mb-6'>
                "100% Velvære"
              </p>
              <div className='text-sm text-white/70 space-y-1 leading-relaxed max-w-xs'>
                <p>
                  Vores egen unikke{' '}
                  <span className='text-primary font-medium'>Märzen</span>.
                </p>
                <p className='uppercase tracking-widest text-xs pt-2'>
                  6.7% Alkohol • 55.4460 N 8.4055 E
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: SELECTION LIST */}
          <div className='p-8 md:p-12 flex flex-col justify-center'>
            <div className='text-left mb-8'>
              <h2 className='font-typewriter text-2xl md:text-3xl text-primary mb-4'>
                Øl & Vand
              </h2>
              <div className='h-1 w-16 bg-primary/30 rounded-full' />
            </div>

            <div className='space-y-10'>
              {/* Fanø Bryghus List */}
              <div>
                <h3 className='font-serif text-3xl text-foreground mb-3 flex items-center gap-2'>
                  Fanø Bryghus
                  <img
                    src='/logos/fanoe_bryghus-primary.svg'
                    alt='Fanø Bryghus Logo'
                    className='w-20'
                  />
                </h3>
                <p className='text-muted-foreground leading-relaxed text-sm'>
                  Vi er stolte af at præsentere et stort udvalg af lokale
                  specialøl fra Fanø Bryghus. Spørg i baren for at høre om
                  dagens udvalg af sæsonens favoritter.
                </p>
              </div>

              {/* Non-Alcoholic Options */}
              <div className='pt-8 border-t border-border/30'>
                <h3 className='font-serif text-xl text-foreground mb-3 flex items-center gap-2'>
                  <Droplets className='w-5 h-5 text-primary' />
                  Alkoholfrie Alternativer
                </h3>
                <ul className='space-y-3 text-sm text-muted-foreground'>
                  <li className='flex items-center gap-3 group'>
                    <span className='w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors' />
                    Alkoholfri Øl (Specialudvalg)
                  </li>
                  <li className='flex items-center gap-3 group'>
                    <span className='w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors' />
                    Stort udvalg af sodavand
                  </li>
                  <li className='flex items-center gap-3 group'>
                    <span className='w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors' />
                    <span className='flex items-center gap-1'>
                      Kaffe & Varme drikke{' '}
                      <Coffee className='w-3.5 h-3.5 ml-1 opacity-70' />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Subtle background decoration for the right side */}
          <div className='absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -z-10 pointer-events-none mix-blend-multiply hidden md:block' />
        </div>
      </div>
    </section>
  );
};

export default BarCard;
