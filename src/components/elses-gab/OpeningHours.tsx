import { Clock, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface OpeningHourItem {
  day: string;
  hours: string;
}

const defaultOpeningHours: OpeningHourItem[] = [
  { day: 'Mandag - Torsdag', hours: '10:00 - 17:00' },
  { day: 'Fredag', hours: '10:00 - 18:00' },
  { day: 'Lørdag', hours: '10:00 - 16:00' },
  { day: 'Søndag', hours: 'Lukket' },
];

const STORAGE_KEY = 'elsesGabHours';

const OpeningHours = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [openingHours, setOpeningHours] =
    useState<OpeningHourItem[]>(defaultOpeningHours);

  useEffect(() => {
    const savedHours = localStorage.getItem(STORAGE_KEY);
    if (savedHours) setOpeningHours(JSON.parse(savedHours));
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(openingHours));
    setIsEditing(false);
    toast({
      title: 'Gemt',
      description: 'Åbningstider er blevet opdateret.',
    });
  };

  const handleCancel = () => {
    const savedHours = localStorage.getItem(STORAGE_KEY);
    if (savedHours) setOpeningHours(JSON.parse(savedHours));
    else setOpeningHours(defaultOpeningHours);
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

  return (
    <section className='py-16 md:py-24 bg-card' id='opening-hours'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex items-center gap-3 mb-8 justify-center'>
            <Clock className='w-8 h-8 text-primary' />
            <h2 className='font-serif text-3xl md:text-4xl font-bold text-foreground'>
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
