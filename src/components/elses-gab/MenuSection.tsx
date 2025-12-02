import {
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image?: string;
}

interface Subcategory {
  name: string;
  items: MenuItem[];
}

interface Category {
  name: string;
  images: string[];
  subcategories: Subcategory[];
}

interface MenuData {
  categories: Category[];
}

const defaultMenu: MenuData = {
  categories: [
    {
      name: 'Drikkevarer',
      images: [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800',
        'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=800',
        'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800',
      ],
      subcategories: [
        {
          name: 'Varme Drikke',
          items: [
            { name: 'Kaffe', description: 'Friskbrygget filteret kaffe', price: '30 kr' },
            { name: 'Espresso', description: 'Dobbelt shot', price: '25 kr' },
            { name: 'Cappuccino', description: 'Espresso med cremet mælkeskum', price: '35 kr' },
            { name: 'Latte', description: 'Espresso med dampet mælk', price: '35 kr' },
          ],
        },
        {
          name: 'Kolde Drikke',
          items: [
            { name: 'Te', description: 'Udvalg af økologiske teer', price: '25 kr' },
            { name: 'Friskpresset Juice', description: 'Sæsonens frugt', price: '40 kr' },
            { name: 'Fanø Lyng', description: 'Lokal saft', price: '35 kr' },
          ],
        },
      ],
    },
    {
      name: 'Mad & Sødt',
      images: [
        'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=800',
        'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800',
      ],
      subcategories: [
        {
          name: 'Frokost',
          items: [
            { name: 'Smørrebrød', description: 'Klassisk dansk smørrebrød med dagens pålæg', price: '65 kr' },
            { name: 'Sandwich', description: 'Hjemmelavet med friske ingredienser', price: '55 kr' },
            { name: 'Salat', description: 'Grøn salat med sæsonens grøntsager', price: '70 kr' },
          ],
        },
        {
          name: 'Det Søde',
          items: [
            { name: 'Kage', description: 'Hjemmebagt dagligt', price: '40 kr' },
            { name: 'Croissant', description: 'Smørbagt croissant', price: '35 kr' },
          ],
        },
      ],
    },
  ],
};

const STORAGE_KEY = 'elsesGabMenu';

const MenuSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [menu, setMenu] = useState<MenuData>(defaultMenu);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    const savedMenu = localStorage.getItem(STORAGE_KEY);
    if (savedMenu) setMenu(JSON.parse(savedMenu));
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menu));
    setIsEditing(false);
    toast({
      title: 'Gemt',
      description: 'Menuen er blevet opdateret.',
    });
  };

  const handleCancel = () => {
    const savedMenu = localStorage.getItem(STORAGE_KEY);
    if (savedMenu) setMenu(JSON.parse(savedMenu));
    else setMenu(defaultMenu);
    setIsEditing(false);
  };

  // Category operations
  const addCategory = () => {
    const newMenu = { ...menu };
    newMenu.categories.push({
      name: 'Ny Kategori',
      images: [],
      subcategories: [],
    });
    setMenu(newMenu);
    setSelectedCategory(newMenu.categories.length - 1);
  };

  const removeCategory = (index: number) => {
    if (menu.categories.length <= 1) return;
    const newMenu = { ...menu };
    newMenu.categories.splice(index, 1);
    setMenu(newMenu);
    if (selectedCategory >= newMenu.categories.length) {
      setSelectedCategory(newMenu.categories.length - 1);
    }
  };

  const moveCategory = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= menu.categories.length) return;
    const newMenu = { ...menu };
    const [moved] = newMenu.categories.splice(index, 1);
    newMenu.categories.splice(newIndex, 0, moved);
    setMenu(newMenu);
    setSelectedCategory(newIndex);
  };

  const updateCategoryName = (index: number, name: string) => {
    const newMenu = { ...menu };
    newMenu.categories[index].name = name;
    setMenu(newMenu);
  };

  // Subcategory operations
  const addSubcategory = () => {
    const newMenu = { ...menu };
    newMenu.categories[selectedCategory].subcategories.push({
      name: 'Ny Underkategori',
      items: [],
    });
    setMenu(newMenu);
  };

  const removeSubcategory = (subIndex: number) => {
    const newMenu = { ...menu };
    newMenu.categories[selectedCategory].subcategories.splice(subIndex, 1);
    setMenu(newMenu);
  };

  const moveSubcategory = (subIndex: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? subIndex - 1 : subIndex + 1;
    const subcategories = menu.categories[selectedCategory].subcategories;
    if (newIndex < 0 || newIndex >= subcategories.length) return;
    const newMenu = { ...menu };
    const [moved] = newMenu.categories[selectedCategory].subcategories.splice(subIndex, 1);
    newMenu.categories[selectedCategory].subcategories.splice(newIndex, 0, moved);
    setMenu(newMenu);
  };

  const updateSubcategoryName = (subIndex: number, name: string) => {
    const newMenu = { ...menu };
    newMenu.categories[selectedCategory].subcategories[subIndex].name = name;
    setMenu(newMenu);
  };

  // Item operations
  const addItem = (subIndex: number) => {
    const newMenu = { ...menu };
    newMenu.categories[selectedCategory].subcategories[subIndex].items.push({
      name: 'Ny vare',
      description: 'Beskrivelse',
      price: '0 kr',
    });
    setMenu(newMenu);
  };

  const removeItem = (subIndex: number, itemIndex: number) => {
    const newMenu = { ...menu };
    newMenu.categories[selectedCategory].subcategories[subIndex].items.splice(itemIndex, 1);
    setMenu(newMenu);
  };

  const moveItem = (subIndex: number, itemIndex: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;
    const items = menu.categories[selectedCategory].subcategories[subIndex].items;
    if (newIndex < 0 || newIndex >= items.length) return;
    const newMenu = { ...menu };
    const [moved] = newMenu.categories[selectedCategory].subcategories[subIndex].items.splice(itemIndex, 1);
    newMenu.categories[selectedCategory].subcategories[subIndex].items.splice(newIndex, 0, moved);
    setMenu(newMenu);
  };

  const updateItem = (subIndex: number, itemIndex: number, field: keyof MenuItem, value: string) => {
    const newMenu = { ...menu };
    newMenu.categories[selectedCategory].subcategories[subIndex].items[itemIndex][field] = value;
    setMenu(newMenu);
  };

  // Carousel helper
  const scrollCarousel = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-carousel');
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const currentCategoryData = menu.categories[selectedCategory];

  return (
    <section className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center tracking-wide">
            Menu
          </h2>
          {user && !isEditing && (
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
              <Edit2 className="w-5 h-5" />
            </Button>
          )}
        </div>

        {isEditing && (
          <div className="flex gap-2 mb-8 justify-center">
            <Button onClick={handleSave} size="sm" className="gap-2">
              <Save className="w-4 h-4" />
              Gem
            </Button>
            <Button onClick={handleCancel} size="sm" variant="outline" className="gap-2">
              <X className="w-4 h-4" />
              Annuller
            </Button>
          </div>
        )}

        {/* Category Tabs */}
        <div className="max-w-4xl mx-auto mb-20 border-b border-border/40 pb-4">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {menu.categories.map((category, index) => (
              <div key={index} className="flex items-center gap-1">
                {isEditing && (
                  <div className="flex flex-col">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => moveCategory(index, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => moveCategory(index, 'down')}
                      disabled={index === menu.categories.length - 1}
                    >
                      <ArrowDown className="w-3 h-3" />
                    </Button>
                  </div>
                )}
                {isEditing ? (
                  <Input
                    value={category.name}
                    onChange={(e) => updateCategoryName(index, e.target.value)}
                    className="w-32 text-center font-serif text-sm uppercase tracking-[0.1em]"
                    onClick={() => setSelectedCategory(index)}
                  />
                ) : (
                  <button
                    onClick={() => setSelectedCategory(index)}
                    className={`pb-2 font-serif text-sm md:text-base uppercase tracking-[0.2em] transition-all relative ${
                      selectedCategory === index
                        ? 'text-primary font-bold after:content-[""] after:absolute after:bottom-[-17px] after:left-0 after:w-full after:h-0.5 after:bg-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {category.name}
                  </button>
                )}
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:text-destructive"
                    onClick={() => removeCategory(index)}
                    disabled={menu.categories.length <= 1}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>
            ))}
            {isEditing && (
              <Button variant="outline" size="sm" onClick={addCategory} className="gap-1">
                <Plus className="w-4 h-4" />
                Kategori
              </Button>
            )}
          </div>
        </div>

        {/* Subcategories & Items */}
        <div className="max-w-5xl mx-auto space-y-20">
          {currentCategoryData.subcategories?.map((subcategory, subIndex) => (
            <div
              key={subIndex}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              {/* Subcategory Header */}
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-2">
                  {isEditing && (
                    <div className="flex flex-col">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={() => moveSubcategory(subIndex, 'up')}
                        disabled={subIndex === 0}
                      >
                        <ArrowUp className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={() => moveSubcategory(subIndex, 'down')}
                        disabled={subIndex === currentCategoryData.subcategories.length - 1}
                      >
                        <ArrowDown className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                  {isEditing ? (
                    <Input
                      value={subcategory.name}
                      onChange={(e) => updateSubcategoryName(subIndex, e.target.value)}
                      className="text-center font-serif text-2xl font-bold italic max-w-xs"
                    />
                  ) : (
                    <h3 className="font-serif text-2xl md:text-3xl font-bold italic text-foreground/80">
                      {subcategory.name}
                    </h3>
                  )}
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeSubcategory(subIndex)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="w-12 h-1 bg-primary/20 mx-auto mt-4 rounded-full"></div>
              </div>

              {/* Items Grid */}
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
                {subcategory.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="w-full">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        {isEditing && (
                          <div className="flex flex-col">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4"
                              onClick={() => moveItem(subIndex, itemIndex, 'up')}
                              disabled={itemIndex === 0}
                            >
                              <ArrowUp className="w-2 h-2" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4"
                              onClick={() => moveItem(subIndex, itemIndex, 'down')}
                              disabled={itemIndex === subcategory.items.length - 1}
                            >
                              <ArrowDown className="w-2 h-2" />
                            </Button>
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-baseline justify-between w-full mb-1">
                            <div className="pr-2 bg-background z-10">
                              {isEditing ? (
                                <Input
                                  value={item.name}
                                  onChange={(e) => updateItem(subIndex, itemIndex, 'name', e.target.value)}
                                  className="font-serif font-bold uppercase tracking-wider"
                                />
                              ) : (
                                <h4 className="font-serif font-bold text-lg uppercase tracking-wider text-foreground">
                                  {item.name}
                                </h4>
                              )}
                            </div>
                            {!isEditing && (
                              <div className="flex-grow border-b-2 border-dotted border-muted-foreground/30 relative -top-1 mx-2"></div>
                            )}
                            <div className="pl-2 bg-background z-10">
                              {isEditing ? (
                                <Input
                                  value={item.price}
                                  onChange={(e) => updateItem(subIndex, itemIndex, 'price', e.target.value)}
                                  className="w-20 text-right"
                                />
                              ) : (
                                <span className="font-sans font-semibold text-lg text-primary">
                                  {item.price}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-0">
                            {isEditing ? (
                              <Input
                                value={item.description}
                                onChange={(e) => updateItem(subIndex, itemIndex, 'description', e.target.value)}
                                className="text-sm"
                              />
                            ) : (
                              <p className="font-sans text-muted-foreground text-sm italic leading-relaxed max-w-[90%]">
                                {item.description}
                              </p>
                            )}
                          </div>
                          {isEditing && (
                            <Input
                              value={item.image || ''}
                              onChange={(e) => updateItem(subIndex, itemIndex, 'image', e.target.value)}
                              placeholder="Billede URL (valgfrit)"
                              className="text-sm mt-2"
                            />
                          )}
                          {item.image && !isEditing && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="mt-2 w-full h-32 object-cover rounded-md"
                            />
                          )}
                        </div>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeItem(subIndex, itemIndex)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {isEditing && (
                <Button
                  variant="outline"
                  onClick={() => addItem(subIndex)}
                  className="mt-6 w-full gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Tilføj vare
                </Button>
              )}
            </div>
          ))}

          {isEditing && (
            <Button variant="outline" onClick={addSubcategory} className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Tilføj underkategori
            </Button>
          )}
        </div>

        {/* Bottom Image Carousel */}
        {(currentCategoryData.images?.length > 0 || isEditing) && (
          <div className="mt-24 border-t border-border/20 pt-16 relative group">
            <h4 className="text-center font-sans text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Glimt fra {currentCategoryData.name}
            </h4>

            <div
              id="category-carousel"
              className="flex overflow-x-auto gap-4 md:gap-8 pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {isEditing && (
                <div className="flex-shrink-0 w-[300px] h-[200px] bg-muted flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 snap-center">
                  <span className="text-sm text-muted-foreground">
                    Tilføj billeder her (Funktion ikke aktiv)
                  </span>
                </div>
              )}

              {currentCategoryData.images?.map((imgUrl, imgIndex) => (
                <div key={imgIndex} className="flex-shrink-0 w-[85vw] md:w-[400px] snap-center">
                  <img
                    src={imgUrl}
                    alt={`${currentCategoryData.name} ${imgIndex}`}
                    className="w-full h-[250px] md:h-[300px] object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-700 shadow-md"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollCarousel('left')}
              className="absolute left-2 md:left-4 top-2/3 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="absolute right-2 md:right-4 top-2/3 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
