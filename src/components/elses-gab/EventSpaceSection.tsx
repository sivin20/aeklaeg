import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Users,
  Utensils,
  Armchair,
  Beer,
  Phone,
  Bath,
  Edit2,
  Save,
  X,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { database } from '@/lib/firebase';
import { ref, onValue, set } from 'firebase/database';

// --- Interfaces ---
interface EventCounts {
  people: number;
  tables: number;
  chairs: number;
  taps: number;
  bathrooms: number;
}

// Default values if DB is empty
const defaultCounts: EventCounts = {
  people: 30,
  tables: 5,
  chairs: 30,
  taps: 3,
  bathrooms: 1,
};

const EventSpaceSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [counts, setCounts] = useState<EventCounts>(defaultCounts);

  // --- 1. LOAD DATA FROM FIREBASE ---
  useEffect(() => {
    const spaceRef = ref(database, 'zhLGIqf2J0aXtotDOJYqLXodJTC2/eventSpace');

    const unsubscribe = onValue(spaceRef, (snapshot) => {
      const data = snapshot.val();
      if (!isEditing) {
        if (data) {
          setCounts(data);
        } else {
          setCounts(defaultCounts);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [isEditing]);

  // --- 2. HANDLE SAVE ---
  const handleSave = () => {
    const spaceRef = ref(database, 'zhLGIqf2J0aXtotDOJYqLXodJTC2/eventSpace');

    set(spaceRef, counts)
      .then(() => {
        setIsEditing(false);
        toast({ title: 'Succes', description: 'Antal er opdateret.' });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: 'Fejl',
          description: 'Kunne ikke gemme.',
          variant: 'destructive',
        });
      });
  };

  const handleCancel = () => {
    setIsEditing(false); // Reverts to DB data due to useEffect
  };

  const updateCount = (key: keyof EventCounts, value: string) => {
    const numValue = parseInt(value) || 0;
    setCounts((prev) => ({ ...prev, [key]: numValue }));
  };

  // --- CONFIG FOR MAPPING ---
  // We map over this array to render the list, but use 'counts' state for the values
  const capacityConfig = [
    { key: 'people', label: 'Personer', icon: Users },
    { key: 'tables', label: 'Spiseborde', icon: Utensils },
    { key: 'chairs', label: 'Stole', icon: Armchair },
    { key: 'taps', label: 'Ølhaner', icon: Beer },
    { key: 'bathrooms', label: 'Badeværelse', icon: Bath },
  ] as const;

  const images = {
    full_room: '/img/full_room.webp',
    taps: '/img/taps.webp',
    table: '/img/table.webp',
    outside_logo: '/img/outside_logo.webp',
  };

  if (isLoading) {
    return (
      <div className='py-24 flex justify-center'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  return (
    <section className='py-12 md:py-24 bg-background relative' id='event-space'>
      {/* --- EDIT CONTROLS (Sticky) --- */}
      {isEditing && (
        <div className='sticky top-20 z-50 flex gap-2 mb-8 justify-center bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border animate-in fade-in slide-in-from-top-4 max-w-fit mx-auto'>
          <Button onClick={handleSave} size='sm' className='gap-2'>
            <Save className='w-4 h-4' />
            Gem Ændringer
          </Button>
          <Button
            onClick={handleCancel}
            size='sm'
            variant='outline'
            className='gap-2'
          >
            <X className='w-4 h-4' />
            Annuller
          </Button>
        </div>
      )}

      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {/* --- ROW 1 --- */}
          <div className='col-span-2 lg:row-span-1 bg-card border border-border/50 rounded-2xl p-8 flex flex-col justify-center items-center text-center h-[250px] lg:h-[300px] relative group'>
            {/* Edit Trigger */}
            {user && !isEditing && (
              <Button
                variant='ghost'
                size='icon'
                className='absolute top-4 right-4 text-muted-foreground hover:text-primary'
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className='w-4 h-4' />
              </Button>
            )}

            <h2 className='font-typewriter text-3xl lg:text-4xl italic leading-tight text-card-foreground'>
              Plads til
              <br />
              hele selskabet
            </h2>
            <div className='pt-2 text-primary'>
              <p>
                <i>Reservér et bord – vi sørger for hyggen</i>
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
                {capacityConfig.map((item) => (
                  <li key={item.key} className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2 text-primary'>
                      <item.icon className='w-5 h-5 shrink-0' />

                      {isEditing ? (
                        <Input
                          type='number'
                          value={counts[item.key]}
                          onChange={(e) =>
                            updateCount(item.key, e.target.value)
                          }
                          className='w-20 font-serif font-bold h-8'
                        />
                      ) : (
                        <span className='font-serif text-2xl font-bold'>
                          {counts[item.key]}
                        </span>
                      )}
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
                Book et bord
              </h4>
              <p className='text-muted-foreground text-sm mb-6 leading-relaxed'>
                Vil du sikre jer en plads – til to eller til hele selskabet –
                så giv Else et kald og reservér et bord.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'>
                <a href='tel:+4591522127' className='w-full sm:w-auto'>
                  <Button className='w-full gap-2'>
                    <Phone className='w-4 h-4' />
                    Ring til Else
                  </Button>
                </a>
                <div className='flex flex-col'>
                  <span className='text-xs text-muted-foreground uppercase tracking-wider'>
                    Telefon
                  </span>
                  <span className='font-serif text-lg'>+45 91 52 21 27</span>
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
