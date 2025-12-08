import React from 'react';
import { Button } from '@/components/ui/button.tsx';

const EventSpaceSection = () => {
  const capacities = [
    { label: 'Theater Style Seating', count: 40 },
    { label: 'Classroom Set Up', count: 36 },
    { label: 'Conference Table', count: 20 },
    { label: 'U Shape Tables', count: 20 },
    { label: 'Standing Reception', count: 75 },
    { label: 'Cocktail Style', count: 165 },
  ];

  const images = {
    couple:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800',
    city: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800',
    room: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800',
    food: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800',
  };

  return (
    <section className='py-12 md:py-24 bg-background'>
      <div className='container mx-auto px-4'>
        {/* GRID CONFIGURATION:
           - Mobile: 2 columns.
           - Desktop: 4 columns.
           - Rows are auto-sized, but we force specific heights using aspect ratios or min-heights
             to create the "Short Top Row" vs "Tall Bottom Row" effect.
        */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {/* --- ROW 1 (The "Short" Row) --- */}

          {/* 1. TITLE CARD (Spans 2 cols, 1 row height) */}
          <div className='col-span-2 lg:row-span-1 bg-card border border-border/50 rounded-2xl p-8 flex flex-col justify-center items-center text-center h-[250px] lg:h-[300px]'>
            <h2 className='font-serif text-4xl lg:text-5xl italic leading-tight text-card-foreground'>
              Dit event,
              <br />
              Vores lokaler
            </h2>
            <div className='pt-2 text-primary'>
              <p>
                <i>Ring og book os til dit næste event</i>
              </p>
            </div>
          </div>

          {/* 2. COUPLE IMAGE (1 col, 1 row height) */}
          <div className='col-span-1 lg:row-span-1 relative h-[200px] lg:h-[300px] rounded-2xl overflow-hidden group'>
            <img
              src={images.couple}
              alt='Event Couple'
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
            />
          </div>

          {/* 3. CITY IMAGE (1 col, 1 row height) */}
          <div className='col-span-1 lg:row-span-1 relative h-[200px] lg:h-[300px] rounded-2xl overflow-hidden group'>
            <img
              src={images.city}
              alt='City View'
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
            />
          </div>

          {/* --- ROW 2 (The "Tall" Row) --- */}

          {/* 4. CAPACITIES CARD (Spans 2 cols, 2 rows height) */}
          {/* This card is taller to accommodate the list comfortably */}
          <div className='col-span-2 lg:row-span-2 bg-card border border-border/50 rounded-2xl p-8 md:p-12 flex flex-col justify-center h-auto min-h-[500px]'>
            <h3 className='font-sans text-xl tracking-widest uppercase mb-8 text-muted-foreground'>
              Capacities
            </h3>
            <ul className='space-y-4 font-sans text-lg md:text-xl text-card-foreground'>
              {capacities.map((item, idx) => (
                <li
                  key={idx}
                  className='flex items-center gap-2 border-b border-border/30 last:border-0 pb-2 last:pb-0'
                >
                  <span className='font-serif'>{item.label}</span>
                  <span className='text-muted-foreground'>–</span>
                  <span className='font-bold text-primary'>{item.count}</span>
                </li>
              ))}
            </ul>
            <div className='mt-4'>
              <Button>Ring +45 2020 3030</Button>
            </div>
          </div>

          {/* 5. ROOM IMAGE (1 col, 2 rows height) */}
          <div className='col-span-1 lg:row-span-2 relative h-[300px] lg:h-auto min-h-[250px] lg:min-h-[500px] rounded-2xl overflow-hidden group'>
            <img
              src={images.room}
              alt='Interior Room'
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
            />
          </div>

          {/* 6. FOOD IMAGE (1 col, 2 rows height) */}
          <div className='col-span-1 lg:row-span-2 relative h-[300px] lg:h-auto min-h-[250px] lg:min-h-[500px] rounded-2xl overflow-hidden group'>
            <img
              src={images.food}
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
