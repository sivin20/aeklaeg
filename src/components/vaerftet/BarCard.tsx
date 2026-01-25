import React, { useState, useEffect } from 'react';
import {
  Beer,
  Coffee,
  Droplets,
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
  GripVertical,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { database } from '@/lib/firebase';
import { ref, onValue, set } from 'firebase/database';

// --- DnD Kit Imports ---
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import BeerCard from '@/components/vaerftet/BeerCard.tsx';

// --- Interfaces ---
interface Cocktail {
  id: string;
  name: string;
  description: string;
  price: string;
}

interface BarData {
  cocktails: Cocktail[];
}

const generateId = () => Math.random().toString(36).substr(2, 9);

// --- Sortable Cocktail Row Component ---
const SortableCocktailRow = ({ item, isEditing, onDelete, onUpdate }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 10,
    opacity: isDragging ? 0.9 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative mb-6 ${isEditing ? 'p-4 border border-dashed border-primary/20 rounded-lg bg-card/50' : ''}`}
    >
      {/* Drag Handle */}
      {isEditing && (
        <div
          {...attributes}
          {...listeners}
          className='absolute left-2 top-4 cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-primary z-20'
        >
          <GripVertical className='w-5 h-5' />
        </div>
      )}

      <div className={`${isEditing ? 'pl-8' : ''}`}>
        <div className='flex justify-between items-baseline mb-1'>
          {/* Name Input/Display */}
          <div className='relative z-10 bg-card pr-4 flex-1'>
            {isEditing ? (
              <Input
                value={item.name}
                onChange={(e) => onUpdate('name', e.target.value)}
                className='font-serif text-lg font-bold'
                placeholder='Cocktail Navn'
              />
            ) : (
              <h3 className='font-serif text-xl text-foreground group-hover:text-primary transition-colors'>
                {item.name}
              </h3>
            )}
          </div>

          {/* Dotted Line (Hidden when editing) */}
          {!isEditing && (
            <div className='flex-grow border-b border-dotted border-muted-foreground/40 mx-2 self-center relative -top-1'></div>
          )}

          {/* Price Input/Display */}
          <div className='relative z-10 bg-card pl-4'>
            {isEditing ? (
              <Input
                value={item.price}
                onChange={(e) => onUpdate('price', e.target.value)}
                className='font-serif font-semibold w-20 text-right'
                placeholder='Pris'
              />
            ) : (
              <span className='font-serif text-xl text-primary font-semibold'>
                {item.price}
              </span>
            )}
          </div>
        </div>

        {/* Description Input/Display */}
        <div className='mt-1'>
          {isEditing ? (
            <Textarea
              value={item.description}
              onChange={(e) => onUpdate('description', e.target.value)}
              className='text-sm min-h-[100px]'
              placeholder='Beskrivelse af ingredienser...'
            />
          ) : (
            <p className='font-sans text-sm text-muted-foreground leading-relaxed'>
              {item.description}
            </p>
          )}
        </div>
      </div>

      {/* Delete Button */}
      {isEditing && (
        <Button
          variant='ghost'
          size='icon'
          onClick={onDelete}
          className='absolute -top-3 -right-3 text-destructive hover:text-destructive bg-background border shadow-sm rounded-full h-8 w-8'
        >
          <Trash2 className='w-4 h-4' />
        </Button>
      )}
    </div>
  );
};

// --- MAIN COMPONENT ---
const BarCard = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [localData, setLocalData] = useState<BarData | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // --- FIREBASE LOADING ---
  useEffect(() => {
    const barRef = ref(database, 'zhLGIqf2J0aXtotDOJYqLXodJTC2/bar');

    const unsubscribe = onValue(
      barRef,
      (snapshot) => {
        const data = snapshot.val();
        if (!isEditing) {
          if (data && data.cocktails) {
            setLocalData({ cocktails: data.cocktails });
          } else {
            // Empty state if DB is empty
            setLocalData({ cocktails: [] });
          }
        }
        setIsLoading(false);
      },
      (error) => {
        console.error('Firebase read error:', error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [isEditing]);

  // --- ACTIONS ---

  const handleSave = () => {
    if (!localData) return;
    const path = `zhLGIqf2J0aXtotDOJYqLXodJTC2/bar`;

    const dataToSave = {
      cocktails: localData.cocktails,
    };

    set(ref(database, path), dataToSave)
      .then(() => {
        setIsEditing(false);
        toast({ title: 'Succes', description: 'Cocktailkortet er opdateret.' });
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
    setIsEditing(false); // Triggers re-fetch from DB via useEffect
  };

  // Cocktail Logic
  const updateCocktail = (id: string, field: keyof Cocktail, value: string) => {
    if (!localData) return;
    const newData = { ...localData };
    const cocktail = newData.cocktails.find((c) => c.id === id);
    if (cocktail) (cocktail as any)[field] = value;
    setLocalData(newData);
  };

  const addCocktail = () => {
    if (!localData) return;
    const newData = { ...localData };
    if (!newData.cocktails) newData.cocktails = [];

    newData.cocktails.unshift({
      id: generateId(),
      name: 'Ny Cocktail',
      description: 'Beskrivelse...',
      price: '0,-',
    });
    setLocalData(newData);
  };

  const removeCocktail = (id: string) => {
    if (!localData) return;
    if (!confirm('Er du sikker på at du vil slette denne cocktail?')) return;
    const newData = { ...localData };
    newData.cocktails = newData.cocktails.filter((c) => c.id !== id);
    setLocalData(newData);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (!localData) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localData.cocktails.findIndex((c) => c.id === active.id);
    const newIndex = localData.cocktails.findIndex((c) => c.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      setLocalData({
        ...localData,
        cocktails: arrayMove(localData.cocktails, oldIndex, newIndex),
      });
    }
  };

  // --- RENDER ---
  if (isLoading) {
    return (
      <div className='min-h-[400px] flex items-center justify-center'>
        <Loader2 className='w-10 h-10 animate-spin text-primary' />
      </div>
    );
  }

  // Fallback only if localData is truly null (shouldn't happen with above logic unless error)
  if (!localData)
    return (
      <div className='text-center py-20 text-muted-foreground'>
        <AlertTriangle className='w-10 h-10 mx-auto mb-2' />
        Kunne ikke indlæse data
      </div>
    );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <section className='py-20 md:py-24 bg-background' id='bar-card'>
        <div className='container mx-auto px-4 max-w-5xl space-y-12'>
          {/* Edit Controls (Sticky) */}
          {isEditing && (
            <div className='sticky top-20 z-50 flex gap-2 mb-8 justify-center bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border animate-in fade-in slide-in-from-top-4'>
              <Button onClick={handleSave} size='sm' className='gap-2'>
                <Save className='w-4 h-4' />
                Gem Cocktails
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

          {/* === CARD 1: COCKTAILS === */}
          <div
            className={`bg-card border p-8 md:p-12 rounded-sm shadow-sm relative overflow-hidden transition-all ${isEditing ? 'border-primary/40 ring-1 ring-primary/20' : 'border-border/50'}`}
          >
            <div className='text-center mb-12'>
              <div className='flex items-center justify-center gap-3 mb-4'>
                <h2 className='font-typewriter text-3xl md:text-4xl text-primary'>
                  Cocktailkort
                </h2>
                {/* PENCIL EDIT BUTTON */}
                {user && !isEditing && (
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => setIsEditing(true)}
                    className='text-muted-foreground hover:text-primary'
                  >
                    <Edit2 className='w-5 h-5' />
                  </Button>
                )}
              </div>
              <div className='h-1 w-24 bg-primary/30 mx-auto rounded-full' />
            </div>

            {isEditing && (
              <div className='mb-8 flex justify-center'>
                <Button
                  onClick={addCocktail}
                  variant='secondary'
                  className='gap-2 w-full md:w-auto border-dashed border'
                >
                  <Plus className='w-4 h-4' /> Tilføj Ny Cocktail
                </Button>
              </div>
            )}

            <SortableContext
              items={localData.cocktails.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div
                className={`grid gap-y-4 ${isEditing ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 lg:grid-cols-2 gap-x-12'}`}
              >
                {localData.cocktails.length > 0 ? (
                  localData.cocktails.map((cocktail) => (
                    <SortableCocktailRow
                      key={cocktail.id}
                      item={cocktail}
                      isEditing={isEditing}
                      onDelete={() => removeCocktail(cocktail.id)}
                      onUpdate={(field: keyof Cocktail, val: string) =>
                        updateCocktail(cocktail.id, field, val)
                      }
                    />
                  ))
                ) : (
                  <div className='col-span-full text-center py-10 text-muted-foreground italic'>
                    Ingen cocktails fundet.{' '}
                    {isEditing ? 'Tilføj en for at starte.' : ''}
                  </div>
                )}
              </div>
            </SortableContext>

            <div className='text-center mt-16 pt-8 border-t border-border/50'>
              <p className='font-serif text-lg text-muted-foreground italic'>
                "Drik med omtanke og nydelse. Velbekomme!"
              </p>
            </div>

            <div className='absolute top-0 left-0 w-full h-full bg-primary/5 -z-10 pointer-events-none mix-blend-multiply' />
          </div>

          {/* === CARD 2: BEER & NON-ALCOHOLIC (STATIC) === */}
          <BeerCard />
        </div>
      </section>
    </DndContext>
  );
};

export default BarCard;
