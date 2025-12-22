import {
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
  GripVertical,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ImagePlus,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { database } from '@/lib/firebase.ts';
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
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- Interfaces ---
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
}

interface Subcategory {
  id: string;
  name: string;
  items: MenuItem[];
}

interface Category {
  id: string;
  name: string;
  images: string[];
  subcategories: Subcategory[];
}

interface MenuData {
  categories: Category[];
}

const generateId = () => Math.random().toString(36).substr(2, 9);

// Default structure only used if DB is completely empty
const defaultMenu: MenuData = {
  categories: [
    {
      id: 'cat_default',
      name: 'Ny Kategori',
      images: [],
      subcategories: [],
    },
  ],
};

// --- Sortable Components (Kept mostly the same) ---

const SortableItemRow = ({ item, isEditing, onDelete, onUpdate }: any) => {
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
      className={`w-full flex items-start gap-2 p-3 bg-background rounded-lg border border-transparent ${isEditing ? 'border-border/50 shadow-sm' : ''} ${isDragging ? 'shadow-lg' : ''}`}
    >
      {isEditing && (
        <div
          {...attributes}
          {...listeners}
          className='mt-2 cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-primary shrink-0'
        >
          <GripVertical className='w-5 h-5' />
        </div>
      )}

      <div className='flex-1 min-w-0'>
        {' '}
        {/* min-w-0 fixes flex overflow issues */}
        <div className='flex items-baseline justify-between w-full mb-1'>
          <div className='pr-2 bg-background z-10 flex-1'>
            {isEditing ? (
              <Input
                value={item.name}
                onChange={(e) => onUpdate('name', e.target.value)}
                className='font-serif font-bold uppercase tracking-wider'
              />
            ) : (
              <h4 className='font-serif font-bold text-lg uppercase tracking-wider text-foreground'>
                {item.name}
              </h4>
            )}
          </div>

          {!isEditing && (
            <div className='hidden md:block flex-grow border-b-2 border-dotted border-muted-foreground/30 relative -top-1 mx-2'></div>
          )}

          <div className='pl-2 bg-background z-10 shrink-0'>
            {isEditing ? (
              <Input
                value={item.price}
                onChange={(e) => onUpdate('price', e.target.value)}
                className='w-20 text-right'
              />
            ) : (
              <span className='font-sans font-semibold text-lg text-primary'>
                {item.price}
              </span>
            )}
          </div>
        </div>
        <div className='mt-0'>
          {isEditing ? (
            <Input
              value={item.description}
              onChange={(e) => onUpdate('description', e.target.value)}
              className='text-sm'
              placeholder='Beskrivelse'
            />
          ) : (
            <p className='font-sans text-muted-foreground text-sm italic leading-relaxed max-w-[90%]'>
              {item.description}
            </p>
          )}
        </div>
      </div>

      {isEditing && (
        <Button
          variant='ghost'
          size='icon'
          onClick={onDelete}
          className='text-destructive hover:text-destructive shrink-0'
        >
          <Trash2 className='w-4 h-4' />
        </Button>
      )}
    </div>
  );
};

const SubcategorySection = ({
  subcategory,
  isEditing,
  onDelete,
  onUpdateName,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
  children,
}: any) => {
  return (
    <div
      className={`mb-16 transition-all ${isEditing ? 'border border-dashed border-primary/30 p-6 rounded-lg bg-primary/5 relative' : ''}`}
    >
      {isEditing && (
        <div className='absolute top-4 left-2 flex flex-col gap-1 z-20'>
          <Button
            variant='outline'
            size='icon'
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className='h-8 w-8'
          >
            <ChevronUp className='w-4 h-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className='h-8 w-8'
          >
            <ChevronDown className='w-4 h-4' />
          </Button>
        </div>
      )}

      <div className='text-center mb-10'>
        <div className='flex items-center justify-center gap-2'>
          {isEditing ? (
            <Input
              value={subcategory.name}
              onChange={(e) => onUpdateName(e.target.value)}
              className='text-center font-serif text-2xl font-bold italic max-w-xs bg-transparent'
            />
          ) : (
            <h3 className='font-typewriter text-1xl md:text-2xl font-bold italic text-foreground/80'>
              {subcategory.name}
            </h3>
          )}
          {isEditing && (
            <Button
              variant='ghost'
              size='icon'
              className='text-destructive'
              onClick={onDelete}
            >
              <Trash2 className='w-4 h-4' />
            </Button>
          )}
        </div>
        <div className='w-12 h-1 bg-primary/20 mx-auto mt-4 rounded-full'></div>
      </div>

      <SortableContext
        items={subcategory.items.map((i: any) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          className={`grid gap-4 ${isEditing ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 md:gap-x-16'}`}
        >
          {children}
        </div>
      </SortableContext>
    </div>
  );
};

const SortableCategoryTab = ({
  category,
  isSelected,
  onClick,
  isEditing,
  onUpdate,
  onDelete,
}: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!isEditing) {
    return (
      <button
        onClick={onClick}
        className={`pb-2 font-typewriter text-sm md:text-base uppercase tracking-[0.2em] transition-all relative ${
          isSelected
            ? 'text-primary font-bold after:content-[""] after:absolute after:bottom-[-17px] after:left-0 after:w-full after:h-0.5 after:bg-primary'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {category.name}
      </button>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='flex items-center gap-1 bg-background border p-1 rounded-md shadow-sm'
    >
      <div
        {...attributes}
        {...listeners}
        className='cursor-grab active:cursor-grabbing text-muted-foreground px-1'
      >
        <GripVertical className='w-4 h-4' />
      </div>
      <Input
        value={category.name}
        onChange={(e) => onUpdate(e.target.value)}
        className='w-32 text-center font-sans text-xs uppercase h-8'
        onClick={onClick}
      />
      <Button
        variant='ghost'
        size='icon'
        className='h-8 w-8 text-destructive'
        onClick={onDelete}
      >
        <Trash2 className='w-3 h-3' />
      </Button>
    </div>
  );
};

// --- MAIN COMPONENT ---

const MenuSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // State Management
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // We keep two states:
  // 1. liveMenu: The data coming directly from Firebase
  // 2. localMenu: The data we are currently displaying/editing
  const [localMenu, setLocalMenu] = useState<MenuData | null>(null);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // --- SAFE FIREBASE LOADING ---
  useEffect(() => {
    const menuRef = ref(database, 'zhLGIqf2J0aXtotDOJYqLXodJTC2/menu');

    const unsubscribe = onValue(
      menuRef,
      (snapshot) => {
        const data = snapshot.val();

        // Only update local menu if we are NOT currently editing
        // This prevents incoming changes from wiping your work while you type
        if (!isEditing) {
          if (data) {
            // If data exists, use it
            setLocalMenu(data);
          } else {
            // If DB is empty, use default (but don't save it yet)
            setLocalMenu(defaultMenu);
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
  }, [isEditing]); // dependency on isEditing ensures logic switches correctly

  // --- SAVE LOGIC ---
  const handleSave = () => {
    if (!localMenu) return;

    // Safety check: Don't save empty categories list unless intentional
    if (localMenu.categories.length === 0) {
      if (!confirm('Du er ved at slette hele menuen. Er du sikker?')) return;
    }

    const path = `zhLGIqf2J0aXtotDOJYqLXodJTC2/menu`;
    console.log('Saving menu to Firebase at path:', path, localMenu);
    set(ref(database, path), localMenu)
      .then(() => {
        setIsEditing(false);
        toast({ title: 'Succes', description: 'Menuen er gemt og opdateret.' });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: 'Fejl',
          description: 'Kunne ikke gemme. Prøv igen.',
          variant: 'destructive',
        });
      });
  };

  const handleCancel = () => {
    // Force a re-fetch or just toggle editing off to let the useEffect
    // pick up the live data again.
    setIsEditing(false);
    // The useEffect will trigger on next render because isEditing changed,
    // causing it to resync with Firebase 'live' data.
  };

  // --- HELPERS FOR EDITING ---
  // All edit functions modify `localMenu`
  const updateLocalMenu = (newMenu: MenuData) => {
    setLocalMenu(newMenu);
  };

  const addCategory = () => {
    if (!localMenu) return;
    const newMenu = { ...localMenu };
    newMenu.categories.push({
      id: generateId(),
      name: 'Ny Kategori',
      images: [],
      subcategories: [],
    });
    updateLocalMenu(newMenu);
    setSelectedCategoryIndex(newMenu.categories.length - 1);
  };

  const removeCategory = (id: string) => {
    if (!localMenu || localMenu.categories.length <= 1) return;
    const newMenu = { ...localMenu };
    newMenu.categories = newMenu.categories.filter((c) => c.id !== id);
    updateLocalMenu(newMenu);
    setSelectedCategoryIndex(0);
  };

  const updateCategoryName = (id: string, name: string) => {
    if (!localMenu) return;
    const newMenu = { ...localMenu };
    const cat = newMenu.categories.find((c) => c.id === id);
    if (cat) cat.name = name;
    updateLocalMenu(newMenu);
  };

  const addSubcategory = () => {
    if (!localMenu) return;
    const newMenu = { ...localMenu };
    // Safety check for index
    if (!newMenu.categories[selectedCategoryIndex]) return;

    // Ensure subcategories array exists
    if (!newMenu.categories[selectedCategoryIndex].subcategories) {
      newMenu.categories[selectedCategoryIndex].subcategories = [];
    }

    newMenu.categories[selectedCategoryIndex].subcategories.push({
      id: generateId(),
      name: 'Ny Underkategori',
      items: [],
    });
    updateLocalMenu(newMenu);
  };

  const removeSubcategory = (subId: string) => {
    if (!localMenu) return;
    const newMenu = { ...localMenu };
    const cat = newMenu.categories[selectedCategoryIndex];
    cat.subcategories = cat.subcategories.filter((s) => s.id !== subId);
    updateLocalMenu(newMenu);
  };

  const moveSubcategory = (subIndex: number, direction: 'up' | 'down') => {
    if (!localMenu) return;
    const newMenu = { ...localMenu };
    const subcategories =
      newMenu.categories[selectedCategoryIndex].subcategories;
    const newIndex = direction === 'up' ? subIndex - 1 : subIndex + 1;
    if (newIndex < 0 || newIndex >= subcategories.length) return;

    [subcategories[subIndex], subcategories[newIndex]] = [
      subcategories[newIndex],
      subcategories[subIndex],
    ];
    updateLocalMenu(newMenu);
  };

  const updateSubcategoryName = (subId: string, name: string) => {
    if (!localMenu) return;
    const newMenu = { ...localMenu };
    const sub = newMenu.categories[selectedCategoryIndex].subcategories.find(
      (s) => s.id === subId,
    );
    if (sub) sub.name = name;
    updateLocalMenu(newMenu);
  };

  const addItem = (subIndex: number) => {
    if (!localMenu) return;
    const newMenu = { ...localMenu };
    const sub =
      newMenu.categories[selectedCategoryIndex].subcategories[subIndex];

    if (!sub.items) sub.items = []; // Safety check

    sub.items.push({
      id: generateId(),
      name: 'Ny vare',
      description: 'Beskrivelse',
      price: '0 kr',
    });
    updateLocalMenu(newMenu);
  };

  const removeItem = (subIndex: number, itemId: string) => {
    if (!localMenu) return;
    const newMenu = { ...localMenu };
    const sub =
      newMenu.categories[selectedCategoryIndex].subcategories[subIndex];
    sub.items = sub.items.filter((i) => i.id !== itemId);
    updateLocalMenu(newMenu);
  };

  const updateItem = (
    subIndex: number,
    itemId: string,
    field: keyof MenuItem,
    value: string,
  ) => {
    if (!localMenu) return;
    const newMenu = { ...localMenu };
    const item = newMenu.categories[selectedCategoryIndex].subcategories[
      subIndex
    ].items.find((i) => i.id === itemId);
    if (item) (item as any)[field] = value;
    updateLocalMenu(newMenu);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'oevk43dt');

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dhh4wuc20/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await res.json();
      console.log('Upload response:', data);
      if (data.secure_url) {
        addCarouselImage(data.secure_url);
        toast({
          title: 'Billede uploadet',
          description: 'Billedet er nu tilføjet til karusellen.',
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: 'Upload fejl',
        description: 'Billedet kunne ikke uploades.',
        variant: 'destructive',
      });
    }
  };

  const addCarouselImage = (url: string) => {
    if (!url || !localMenu) return;
    const newMenu = { ...localMenu };
    const cat = newMenu.categories[selectedCategoryIndex];
    if (!cat.images) cat.images = [];
    cat.images.push(url);
    updateLocalMenu(newMenu);
  };

  const removeCarouselImage = (imgIndex: number) => {
    if (!localMenu) return;
    const newMenu = { ...localMenu };
    newMenu.categories[selectedCategoryIndex].images.splice(imgIndex, 1);
    updateLocalMenu(newMenu);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-carousel');
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // --- DRAG END HANDLER for Categories ---
  const handleDragEnd = (event: DragEndEvent) => {
    if (!localMenu) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const newMenu = { ...localMenu };

    // Categories only
    const activeCatIndex = newMenu.categories.findIndex(
      (c) => c.id === active.id,
    );
    const overCatIndex = newMenu.categories.findIndex((c) => c.id === over.id);

    if (activeCatIndex !== -1 && overCatIndex !== -1) {
      newMenu.categories = arrayMove(
        newMenu.categories,
        activeCatIndex,
        overCatIndex,
      );
      updateLocalMenu(newMenu);
      setSelectedCategoryIndex(overCatIndex);
    }
  };

  // --- DRAG END HANDLER for Items within a specific subcategory ---
  const handleItemDragEnd = (event: DragEndEvent, subIndex: number) => {
    if (!localMenu) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const newMenu = { ...localMenu };
    const sub =
      newMenu.categories[selectedCategoryIndex].subcategories[subIndex];

    const activeItemIndex = sub.items.findIndex(
      (item) => item.id === active.id,
    );
    const overItemIndex = sub.items.findIndex((item) => item.id === over.id);

    if (activeItemIndex !== -1 && overItemIndex !== -1) {
      sub.items = arrayMove(sub.items, activeItemIndex, overItemIndex);
      updateLocalMenu(newMenu);
    }
  };

  // --- RENDER ---

  if (isLoading) {
    return (
      <div className='min-h-[50vh] flex items-center justify-center'>
        <Loader2 className='w-10 h-10 animate-spin text-primary' />
      </div>
    );
  }

  // Fallback if load failed or empty
  if (!localMenu)
    return (
      <div className='text-center py-20'>
        <AlertTriangle className='w-10 h-10 mx-auto text-yellow-500 mb-4' />
        <p>Kunne ikke indlæse menuen.</p>
        <Button
          onClick={() => window.location.reload()}
          variant='outline'
          className='mt-4'
        >
          Prøv igen
        </Button>
      </div>
    );

  const currentCategoryData =
    localMenu.categories[selectedCategoryIndex] || localMenu.categories[0];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <section className='py-16 md:py-24 bg-background text-foreground'>
        <div className='container mx-auto px-4'>
          {/* Header */}
          <div className='flex items-center justify-center gap-3 mb-16'>
            <h2 className='font-typewriter text-3xl md:text-4xl font-bold text-center tracking-wide'>
              Menu
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

          {/* Edit Controls */}
          {isEditing && (
            <div className='sticky top-20 z-50 flex gap-2 mb-8 justify-center bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border animate-in fade-in slide-in-from-top-4'>
              <Button onClick={handleSave} size='sm' className='gap-2'>
                <Save className='w-4 h-4' />
                Gem Menu
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

          {/* Category Tabs */}
          <div className='max-w-4xl mx-auto mb-20 border-b border-border/40 pb-4'>
            <div className='flex flex-wrap gap-4 justify-center items-center'>
              <SortableContext
                items={localMenu.categories.map((c) => c.id)}
                strategy={horizontalListSortingStrategy}
              >
                {localMenu.categories.map((category, index) => (
                  <SortableCategoryTab
                    key={category.id}
                    category={category}
                    isSelected={selectedCategoryIndex === index}
                    onClick={() => setSelectedCategoryIndex(index)}
                    isEditing={isEditing}
                    onUpdate={(val: string) =>
                      updateCategoryName(category.id, val)
                    }
                    onDelete={() => removeCategory(category.id)}
                  />
                ))}
              </SortableContext>

              {isEditing && (
                <Button
                  variant='outline'
                  size='sm'
                  onClick={addCategory}
                  className='gap-1 ml-2'
                >
                  <Plus className='w-4 h-4' />
                </Button>
              )}
            </div>
          </div>

          {/* Subcategories & Items Content */}
          <div className='max-w-5xl mx-auto space-y-20'>
            {currentCategoryData &&
              (currentCategoryData.subcategories || []).map(
                (subcategory, subIndex) => (
                  <SubcategorySection
                    key={subcategory.id}
                    subcategory={subcategory}
                    isEditing={isEditing}
                    onUpdateName={(val: string) =>
                      updateSubcategoryName(subcategory.id, val)
                    }
                    onDelete={() => removeSubcategory(subcategory.id)}
                    onMoveUp={() => moveSubcategory(subIndex, 'up')}
                    onMoveDown={() => moveSubcategory(subIndex, 'down')}
                    canMoveUp={subIndex > 0}
                    canMoveDown={
                      subIndex <
                      (currentCategoryData.subcategories?.length || 0) - 1
                    }
                  >
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={(event) => handleItemDragEnd(event, subIndex)}
                    >
                      <SortableContext
                        items={subcategory.items.map((i) => i.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        {subcategory.items.map((item) => (
                          <SortableItemRow
                            key={item.id}
                            item={item}
                            isEditing={isEditing}
                            onUpdate={(field: keyof MenuItem, val: string) =>
                              updateItem(subIndex, item.id, field, val)
                            }
                            onDelete={() => removeItem(subIndex, item.id)}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>

                    {isEditing && (
                      <div className='mt-4 flex justify-center'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => addItem(subIndex)}
                          className='gap-2 border-dashed'
                        >
                          <Plus className='w-4 h-4' /> Tilføj vare
                        </Button>
                      </div>
                    )}
                  </SubcategorySection>
                ),
              )}

            {isEditing && (
              <Button
                variant='outline'
                onClick={addSubcategory}
                className='w-full gap-2 border-dashed h-16 text-lg'
              >
                <Plus className='w-5 h-5' />
                Tilføj ny underkategori
              </Button>
            )}
          </div>

          {/* Bottom Image Carousel */}
          {currentCategoryData && (
            <div className='mt-24 border-t pt-16 relative group'>
              <h4 className='text-center font-sans text-xs uppercase tracking-widest mb-8'>
                Glimt fra {currentCategoryData.name}
              </h4>

              {isEditing && (
                <div className='flex gap-2 max-w-md mx-auto mb-8'>
                  <Input
                    placeholder='Indsæt billed-URL...'
                    id='new-img-url'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const target = e.target as HTMLInputElement;
                        addCarouselImage(target.value);
                        target.value = '';
                      }
                    }}
                  />

                  {/* Select file button */}
                  <Button
                    onClick={() =>
                      document.getElementById('file-upload')!.click()
                    }
                  >
                    <ImagePlus className='w-4 h-4' />
                  </Button>

                  <input
                    type='file'
                    accept='image/*'
                    id='file-upload'
                    className='hidden'
                    onChange={handleImageUpload}
                  />
                </div>
              )}

              {currentCategoryData.images &&
              currentCategoryData.images.length > 0 ? (
                <div
                  id='category-carousel'
                  className='flex overflow-x-auto gap-4 md:gap-8 pb-4 snap-x snap-mandatory scrollbar-hide'
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {currentCategoryData.images.map((imgUrl, imgIndex) => (
                    <div
                      key={imgIndex}
                      className='relative flex-shrink-0 w-[85vw] md:w-[400px] snap-center'
                    >
                      <img
                        src={imgUrl}
                        alt={`${currentCategoryData.name} ${imgIndex}`}
                        className='w-full h-[250px] md:h-[300px] object-cover rounded-lg transition-all duration-700 shadow-md'
                      />
                      {isEditing && (
                        <Button
                          variant='destructive'
                          size='icon'
                          className='absolute top-2 right-2 opacity-90 hover:opacity-100'
                          onClick={() => removeCarouselImage(imgIndex)}
                        >
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                !isEditing && (
                  <p className='text-center text-muted-foreground italic'>
                    Ingen billeder endnu.
                  </p>
                )
              )}

              {/* Navigation Arrows */}
              <button
                onClick={() => scrollCarousel('left')}
                className='absolute left-2 md:left-4 top-2/3 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden md:block'
              >
                <ChevronLeft className='w-6 h-6' />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className='absolute right-2 md:right-4 top-2/3 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden md:block'
              >
                <ChevronRight className='w-6 h-6' />
              </button>
            </div>
          )}
        </div>
      </section>
    </DndContext>
  );
};

export default MenuSection;
