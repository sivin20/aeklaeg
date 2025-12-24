import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Users, Utensils, Armchair, Beer, Phone, Bath } from 'lucide-react'; // Added Bath icon

const EventSpaceSection = () => {
  const capacities = [
    { label: 'Personer', count: 60, icon: Users },
    { label: 'Spiseborde', count: 7, icon: Utensils },
    { label: 'Stole', count: 80, icon: Armchair },
    { label: 'Ølhaner', count: 3, icon: Beer },
    { label: 'Badeværelse', count: 1, icon: Bath },
  ];

  const images = {
    full_room: '/img/full_room.png',
    taps: '/img/taps.png',
    table: '/img/table.png',
    outside_logo: '/img/outside_logo.png',
  };

  return (
    <section className='py-12 md:py-24 bg-background' id='event-space'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {/* --- ROW 1 --- */}
          <div className='col-span-2 lg:row-span-1 bg-card border border-border/50 rounded-2xl p-8 flex flex-col justify-center items-center text-center h-[250px] lg:h-[300px]'>
            <h2 className='font-typewriter text-3xl lg:text-4xl italic leading-tight text-card-foreground'>
              Dit event,
              <br />
              Vores lokaler
            </h2>
            <div className='pt-2 text-primary'>
              <p>
                <i>Vi skaber rammerne for din fest</i>
              </p>
            </div>
          </div>

          <div className='col-span-1 lg:row-span-1 relative h-[200px] lg:h-[300px] rounded-2xl overflow-hidden group'>
            <img
              src={images.full_room}
              alt='Event Couple'
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
            />
          </div>

          <div className='col-span-1 lg:row-span-1 relative h-[200px] lg:h-[300px] rounded-2xl overflow-hidden group'>
            <img
              src={images.taps}
              alt='City View'
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
            />
          </div>

          {/* --- ROW 2 --- */}

          {/* 4. CAPACITIES & BOOKING CARD (Updated) */}
          <div className='col-span-2 lg:row-span-2 bg-card border border-border/50 rounded-2xl p-6 md:p-10 flex flex-col justify-between h-auto min-h-[500px]'>
            {/* Top Section: Capacities with Icons */}
            <div>
              <h3 className='font-sans text-xs font-bold tracking-[0.2em] uppercase mb-8 text-muted-foreground'>
                Faciliteter & Plads
              </h3>
              <ul className='grid grid-cols-2 gap-6'>
                {capacities.map((item, idx) => (
                  <li key={idx} className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2 text-primary'>
                      <item.icon className='w-5 h-5' />
                      <span className='font-serif text-2xl font-bold'>
                        {item.count}
                      </span>
                    </div>
                    <span className='text-sm text-muted-foreground uppercase tracking-wide'>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Section: "Call Else" Box */}
            <div className='mt-8 bg-muted/30 rounded-xl p-6 border border-border/50'>
              <h4 className='font-typewriter text-xl mb-2 text-card-foreground'>
                Book bord eller lokale
              </h4>
              <p className='text-muted-foreground text-sm mb-6 leading-relaxed'>
                Uanset om du vil booke hele lokalet til fest, eller blot
                reservere et bord til aftenen, så giv Else et kald.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'>
                <a href='tel:+4512345678' className='w-full sm:w-auto'>
                  <Button className='w-full gap-2'>
                    <Phone className='w-4 h-4' />
                    Ring til Else
                  </Button>
                </a>
                <div className='flex flex-col'>
                  <span className='text-xs text-muted-foreground uppercase tracking-wider'>
                    Telefon
                  </span>
                  <span className='font-serif text-lg'>+45 12 34 56 78</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. ROOM IMAGE */}
          <div className='col-span-1 lg:row-span-2 relative h-[300px] lg:h-auto min-h-[250px] lg:min-h-[500px] rounded-2xl overflow-hidden group'>
            <img
              src={images.table}
              alt='Interior Room'
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
            />
          </div>

          {/* 6. FOOD IMAGE */}
          <div className='col-span-1 lg:row-span-2 relative h-[300px] lg:h-auto min-h-[250px] lg:min-h-[500px] rounded-2xl overflow-hidden group'>
            <img
              src={images.outside_logo}
              alt='Catering'
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSpaceSection;
