import { Clock, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { database } from '@/lib/firebase';
import { ref, onValue, set } from 'firebase/database';

interface OpeningHourItem {
  day: string;
  hours: string;
}

interface OpeningHoursProps {
  pathPrefix: string;
}

const defaultOpeningHours: OpeningHourItem[] = [
  { day: 'Mandag - Torsdag', hours: '10:00 - 17:00' },
  { day: 'Fredag', hours: '10:00 - 18:00' },
  { day: 'Lørdag', hours: '10:00 - 16:00' },
  { day: 'Søndag', hours: 'Lukket' },
];

const OpeningHours = ({ pathPrefix }: OpeningHoursProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openingHours, setOpeningHours] =
    useState<OpeningHourItem[]>(defaultOpeningHours);

  useEffect(() => {
    const hoursRef = ref(database, `${pathPrefix}/openingHours`);
    const unsubscribe = onValue(hoursRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setOpeningHours(data);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [pathPrefix]);

  const handleSave = async () => {
    try {
      const hoursRef = ref(database, `${pathPrefix}/openingHours`);
      await set(hoursRef, openingHours);
      setIsEditing(false);
      toast({
        title: 'Gemt',
        description: 'Åbningstider er blevet opdateret.',
      });
    } catch (error) {
      console.error('Error saving opening hours:', error);
      toast({
        title: 'Fejl',
        description: 'Kunne ikke gemme åbningstider.',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    const hoursRef = ref(database, `${pathPrefix}/openingHours`);
    onValue(
      hoursRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) setOpeningHours(data);
        else setOpeningHours(defaultOpeningHours);
      },
      { onlyOnce: true },
    );
    setIsEditing(false);
  };

  const addHourRow = () => {
    setOpeningHours([
      ...openingHours,
      { day: 'Ny dag', hours: '00:00 - 00:00' },
    ]);
  };

  const removeHourRow = (index: number) => {
    const newHours = openingHours.filter((_, i) => i !== index);
    setOpeningHours(newHours);
  };

  const updateHour = (index: number, field: 'day' | 'hours', value: string) => {
    const newHours = [...openingHours];
    newHours[index][field] = value;
    setOpeningHours(newHours);
  };

  if (isLoading) {
    return (
      <section className='py-16 md:py-24 bg-card' id='opening-hours'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto text-center'>
            <Clock className='w-8 h-8 text-primary mx-auto animate-pulse' />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='py-16 md:py-24 bg-card' id='opening-hours'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex items-center gap-3 mb-8 justify-center'>
            <Clock className='w-8 h-8 text-primary' />
            <h2 className='font-typewriter text-2xl md:text-3xl font-bold text-foreground'>
              Åbningstider
            </h2>
            {user && !isEditing && (
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className='w-5 h-5' />
              </Button>
            )}
          </div>

          {isEditing && (
            <div className='flex gap-2 mb-4 justify-center'>
              <Button onClick={handleSave} size='sm' className='gap-2'>
                <Save className='w-4 h-4' />
                Gem
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

          <div className='space-y-4'>
            {openingHours.map((item, index) => (
              <div
                key={index}
                className='flex justify-between items-center py-4 border-b border-border/30 gap-4'
              >
                {isEditing ? (
                  <>
                    <Input
                      value={item.day}
                      onChange={(e) => updateHour(index, 'day', e.target.value)}
                      className='max-w-[200px]'
                    />
                    <Input
                      value={item.hours}
                      onChange={(e) =>
                        updateHour(index, 'hours', e.target.value)
                      }
                      className='max-w-[150px]'
                    />
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => removeHourRow(index)}
                      className='text-destructive hover:text-destructive'
                    >
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </>
                ) : (
                  <>
                    <span className='font-sans text-lg text-foreground'>
                      {item.day}
                    </span>
                    <span className='font-sans text-lg text-primary font-medium'>
                      {item.hours}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <Button
              variant='outline'
              onClick={addHourRow}
              className='mt-4 w-full gap-2'
            >
              <Plus className='w-4 h-4' />
              Tilføj række
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default OpeningHours;
