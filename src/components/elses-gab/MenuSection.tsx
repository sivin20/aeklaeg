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

// --- Skeleton Component for Loading State ---
const MenuSkeleton = () => (
  <div className='max-w-5xl mx-auto space-y-12 animate-pulse'>
    <div className='flex justify-center gap-6 mb-12 border-b border-border/40 pb-4'>
      {[1, 2, 3].map((i) => (
        <div key={i} className='h-4 w-24 bg-muted rounded' />
      ))}
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10'>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className='space-y-3'>
          <div className='flex justify-between items-baseline'>
            <div className='h-5 w-1/2 bg-muted rounded' />
            <div className='h-5 w-12 bg-muted rounded' />
          </div>
          <div className='h-3 w-3/4 bg-muted/50 rounded' />
        </div>
      ))}
    </div>
  </div>
);

// --- Sortable Components ---

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
                type='number'
                value={item.price.replace(/[^0-9]/g, '')}
                onChange={(e) =>
                  onUpdate('price', e.target.value ? `${e.target.value},-` : '')
                }
                className='w-24 text-right font-serif font-semibold'
                placeholder='0'
              />
            ) : (
              <span className='font-sans font-semibold text-lg text-primary'>
                {item.price}
              </span>
            )}
          </div>
        </div>
        <div>
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
      <div
        className={`grid gap-4 ${isEditing ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 md:gap-x-16'}`}
      >
        {children}
      </div>
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
  const style = { transform: CSS.Transform.toString(transform), transition };

  if (!isEditing) {
    return (
      <button
        onClick={onClick}
        className={`pb-2 font-typewriter text-sm md:text-base uppercase tracking-[0.2em] transition-all relative ${isSelected ? 'text-primary font-bold after:content-[""] after:absolute after:bottom-[-17px] after:left-0 after:w-full after:h-0.5 after:bg-primary' : 'text-muted-foreground hover:text-foreground'}`}
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
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [localMenu, setLocalMenu] = useState<MenuData | null>(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    const menuRef = ref(database, 'zhLGIqf2J0aXtotDOJYqLXodJTC2/menu');
    const unsubscribe = onValue(
      menuRef,
      (snapshot) => {
        const data = snapshot.val();
        if (!isEditing) {
          setLocalMenu(data || defaultMenu);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error('Firebase error:', error);
        setIsLoading(false);
      },
    );
    return () => unsubscribe();
  }, [isEditing]);

  const handleSave = () => {
    if (!localMenu) return;
    if (
      localMenu.categories.length === 0 &&
      !confirm('Du er ved at slette hele menuen. Er du sikker?')
    )
      return;
    set(ref(database, `zhLGIqf2J0aXtotDOJYqLXodJTC2/menu`), localMenu)
      .then(() => {
        setIsEditing(false);
        toast({ title: 'Succes', description: 'Menuen er opdateret.' });
      })
      .catch(() =>
        toast({
          title: 'Fejl',
          description: 'Kunne ikke gemme. Prøv igen.',
          variant: 'destructive',
        }),
      );
  };

  const handleCancel = () => setIsEditing(false);

  // Edit Handlers
  const addCategory = () => {
    const newMenu = { ...localMenu! };
    newMenu.categories.push({
      id: generateId(),
      name: 'Ny Kategori',
      images: [],
      subcategories: [],
    });
    setLocalMenu(newMenu);
    setSelectedCategoryIndex(newMenu.categories.length - 1);
  };

  const removeCategory = (id: string) => {
    if (localMenu!.categories.length <= 1) return;
    const newMenu = {
      ...localMenu!,
      categories: localMenu!.categories.filter((c) => c.id !== id),
    };
    setLocalMenu(newMenu);
    setSelectedCategoryIndex(0);
  };

  const updateCategoryName = (id: string, name: string) => {
    const newMenu = { ...localMenu! };
    const cat = newMenu.categories.find((c) => c.id === id);
    if (cat) cat.name = name;
    setLocalMenu(newMenu);
  };

  const addSubcategory = () => {
    const newMenu = { ...localMenu! };
    const cat = newMenu.categories[selectedCategoryIndex];
    if (!cat.subcategories) cat.subcategories = [];
    cat.subcategories.push({
      id: generateId(),
      name: 'Ny Underkategori',
      items: [],
    });
    setLocalMenu(newMenu);
  };

  const removeSubcategory = (subId: string) => {
    const newMenu = { ...localMenu! };
    newMenu.categories[selectedCategoryIndex].subcategories =
      newMenu.categories[selectedCategoryIndex].subcategories.filter(
        (s) => s.id !== subId,
      );
    setLocalMenu(newMenu);
  };

  const moveSubcategory = (subIndex: number, direction: 'up' | 'down') => {
    const newMenu = { ...localMenu! };
    const subs = newMenu.categories[selectedCategoryIndex].subcategories;
    const newIndex = direction === 'up' ? subIndex - 1 : subIndex + 1;
    if (newIndex >= 0 && newIndex < subs.length) {
      [subs[subIndex], subs[newIndex]] = [subs[newIndex], subs[subIndex]];
      setLocalMenu(newMenu);
    }
  };

  const updateSubcategoryName = (subId: string, name: string) => {
    const newMenu = { ...localMenu! };
    const sub = newMenu.categories[selectedCategoryIndex].subcategories.find(
      (s) => s.id === subId,
    );
    if (sub) sub.name = name;
    setLocalMenu(newMenu);
  };

  const addItem = (subIndex: number) => {
    const newMenu = { ...localMenu! };
    const sub =
      newMenu.categories[selectedCategoryIndex].subcategories[subIndex];
    if (!sub.items) sub.items = [];
    sub.items.push({
      id: generateId(),
      name: 'Ny vare',
      description: 'Beskrivelse',
      price: '0,-',
    });
    setLocalMenu(newMenu);
  };

  const removeItem = (subIndex: number, itemId: string) => {
    const newMenu = { ...localMenu! };
    const sub =
      newMenu.categories[selectedCategoryIndex].subcategories[subIndex];
    sub.items = sub.items.filter((i) => i.id !== itemId);
    setLocalMenu(newMenu);
  };

  const updateItem = (
    subIndex: number,
    itemId: string,
    field: keyof MenuItem,
    value: string,
  ) => {
    const newMenu = { ...localMenu! };
    const item = newMenu.categories[selectedCategoryIndex].subcategories[
      subIndex
    ].items.find((i) => i.id === itemId);
    if (item) (item as any)[field] = value;
    setLocalMenu(newMenu);
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
        { method: 'POST', body: formData },
      );
      const data = await res.json();
      if (data.secure_url) {
        const newMenu = { ...localMenu! };
        const cat = newMenu.categories[selectedCategoryIndex];
        if (!cat.images) cat.images = [];
        cat.images.push(data.secure_url);
        setLocalMenu(newMenu);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeCarouselImage = (imgIndex: number) => {
    const newMenu = { ...localMenu! };
    newMenu.categories[selectedCategoryIndex].images.splice(imgIndex, 1);
    setLocalMenu(newMenu);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-carousel');
    if (container)
      container.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth',
      });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !localMenu) return;
    const newMenu = { ...localMenu };
    const oldIdx = newMenu.categories.findIndex((c) => c.id === active.id);
    const newIdx = newMenu.categories.findIndex((c) => c.id === over.id);
    if (oldIdx !== -1 && newIdx !== -1) {
      newMenu.categories = arrayMove(newMenu.categories, oldIdx, newIdx);
      setLocalMenu(newMenu);
      setSelectedCategoryIndex(newIdx);
    }
  };

  const handleItemDragEnd = (event: DragEndEvent, subIndex: number) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !localMenu) return;
    const newMenu = { ...localMenu };
    const sub =
      newMenu.categories[selectedCategoryIndex].subcategories[subIndex];
    const oldIdx = sub.items.findIndex((i) => i.id === active.id);
    const newIdx = sub.items.findIndex((i) => i.id === over.id);
    if (oldIdx !== -1 && newIdx !== -1) {
      sub.items = arrayMove(sub.items, oldIdx, newIdx);
      setLocalMenu(newMenu);
    }
  };

  const currentCategoryData = localMenu?.categories[selectedCategoryIndex];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <section
        className='py-16 md:py-24 bg-background text-foreground scroll-mt-24'
        id='menu'
      >
        <div className='container mx-auto px-4'>
          {/* Static Header */}
          <div className='flex items-center justify-center gap-3 mb-16'>
            <h2 className='font-typewriter text-3xl md:text-4xl font-bold text-center tracking-wide'>
              Menu
            </h2>
            {user && !isEditing && !isLoading && (
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
            <div className='sticky top-20 z-50 flex gap-2 mb-8 justify-center bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border'>
              <Button onClick={handleSave} size='sm' className='gap-2'>
                <Save className='w-4 h-4' /> Gem Menu
              </Button>
              <Button
                onClick={handleCancel}
                size='sm'
                variant='outline'
                className='gap-2'
              >
                <X className='w-4 h-4' /> Annuller
              </Button>
            </div>
          )}

          {isLoading ? (
            <MenuSkeleton />
          ) : !localMenu ? (
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
          ) : (
            <>
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

              <div className='max-w-5xl mx-auto space-y-20'>
                {currentCategoryData?.subcategories?.map(
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
                        onDragEnd={(e) => handleItemDragEnd(e, subIndex)}
                      >
                        <SortableContext
                          items={subcategory.items?.map((i) => i.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          {subcategory.items?.map((item) => (
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
                    <Plus className='w-5 h-5' /> Tilføj ny underkategori
                  </Button>
                )}
              </div>

              {currentCategoryData && (
                <div className='mt-24 border-t pt-16 relative group'>
                  <h4 className='text-center font-sans text-xs uppercase tracking-widest mb-8'>
                    Glimt fra {currentCategoryData.name}
                  </h4>
                  {isEditing && (
                    <div className='flex gap-2 max-w-md mx-auto mb-8'>
                      <Input
                        placeholder='URL...'
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const t = e.target as HTMLInputElement;
                            const newMenu = { ...localMenu! };
                            newMenu.categories[
                              selectedCategoryIndex
                            ].images.push(t.value);
                            setLocalMenu(newMenu);
                            t.value = '';
                          }
                        }}
                      />
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
                  {currentCategoryData.images?.length > 0 ? (
                    <div
                      id='category-carousel'
                      className='flex overflow-x-auto gap-4 md:gap-8 pb-4 snap-x snap-mandatory scrollbar-hide'
                    >
                      {currentCategoryData.images.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className='relative flex-shrink-0 w-[85vw] md:w-[400px] snap-center'
                        >
                          <img
                            src={imgUrl}
                            alt=''
                            className='w-full h-[250px] md:h-[300px] object-cover rounded-lg shadow-md'
                          />
                          {isEditing && (
                            <Button
                              variant='destructive'
                              size='icon'
                              className='absolute top-2 right-2'
                              onClick={() => removeCarouselImage(idx)}
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
                  <button
                    onClick={() => scrollCarousel('left')}
                    className='absolute left-2 md:left-4 top-2/3 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow hidden md:block group-hover:opacity-100 transition-opacity'
                  >
                    <ChevronLeft className='w-6 h-6' />
                  </button>
                  <button
                    onClick={() => scrollCarousel('right')}
                    className='absolute right-2 md:right-4 top-2/3 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow hidden md:block group-hover:opacity-100 transition-opacity'
                  >
                    <ChevronRight className='w-6 h-6' />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </DndContext>
  );
};

export default MenuSection;
