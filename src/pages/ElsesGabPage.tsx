import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  Clock,
  Instagram,
  Edit2,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const ElsesGabPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const defaultOpeningHours = [
    { day: 'Mandag - Torsdag', hours: '10:00 - 17:00' },
    { day: 'Fredag', hours: '10:00 - 18:00' },
    { day: 'Lørdag', hours: '10:00 - 16:00' },
    { day: 'Søndag', hours: 'Lukket' },
  ];

  // UPDATED DATA STRUCTURE: Categories -> Subcategories -> Items
  const defaultMenu = {
    categories: [
      {
        name: 'Drikkevarer',
        // Images for the bottom carousel
        images: [
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800',
          'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=800',
          'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800',
        ],
        subcategories: [
          {
            name: 'Varme Drikke',
            items: [
              {
                name: 'Kaffe',
                description: 'Friskbrygget filteret kaffe',
                price: '30 kr',
              },
              { name: 'Espresso', description: 'Dobbelt shot', price: '25 kr' },
              {
                name: 'Cappuccino',
                description: 'Espresso med cremet mælkeskum',
                price: '35 kr',
              },
              {
                name: 'Latte',
                description: 'Espresso med dampet mælk',
                price: '35 kr',
              },
            ],
          },
          {
            name: 'Kolde Drikke',
            items: [
              {
                name: 'Te',
                description: 'Udvalg af økologiske teer',
                price: '25 kr',
              },
              {
                name: 'Friskpresset Juice',
                description: 'Sæsonens frugt',
                price: '40 kr',
              },
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
              {
                name: 'Smørrebrød',
                description: 'Klassisk dansk smørrebrød med dagens pålæg',
                price: '65 kr',
              },
              {
                name: 'Sandwich',
                description: 'Hjemmelavet med friske ingredienser',
                price: '55 kr',
              },
              {
                name: 'Salat',
                description: 'Grøn salat med sæsonens grøntsager',
                price: '70 kr',
              },
            ],
          },
          {
            name: 'Det Søde',
            items: [
              {
                name: 'Kage',
                description: 'Hjemmebagt dagligt',
                price: '40 kr',
              },
              {
                name: 'Croissant',
                description: 'Smørbagt croissant',
                price: '35 kr',
              },
            ],
          },
        ],
      },
    ],
  };

  const [openingHours, setOpeningHours] = useState(defaultOpeningHours);
  const [menu, setMenu] = useState(defaultMenu);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    const savedHours = localStorage.getItem('elsesGabHours');
    const savedMenu = localStorage.getItem('elsesGabMenu');
    if (savedHours) setOpeningHours(JSON.parse(savedHours));
    if (savedMenu) setMenu(JSON.parse(savedMenu));
  }, []);

  const handleSave = () => {
    localStorage.setItem('elsesGabHours', JSON.stringify(openingHours));
    localStorage.setItem('elsesGabMenu', JSON.stringify(menu));
    setIsEditing(false);
    toast({
      title: 'Changes saved',
      description: 'Opening hours and menu have been updated.',
    });
  };

  const handleCancel = () => {
    const savedHours = localStorage.getItem('elsesGabHours');
    const savedMenu = localStorage.getItem('elsesGabMenu');
    if (savedHours) setOpeningHours(JSON.parse(savedHours));
    else setOpeningHours(defaultOpeningHours);
    if (savedMenu) setMenu(JSON.parse(savedMenu));
    else setMenu(defaultMenu);
    setIsEditing(false);
  };

  // Helper for Carousel
  const scrollCarousel = (direction) => {
    const container = document.getElementById('category-carousel');
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const currentCategoryData = menu.categories[selectedCategory];

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navigation />
      <main className='pt-20'>
        {/* Hero Section */}
        <section className='relative h-[50vh] flex items-center justify-center'>
          <div className='absolute inset-0'>
            <img
              src='https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1547'
              alt='Elses Gab'
              className='object-cover w-full h-full'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-background/80 to-background'></div>
          </div>
          <div className='relative z-10 text-center'>
            <h1 className='font-serif text-5xl md:text-7xl font-bold mb-4 text-primary'>
              Elses Gab
            </h1>
            <p className='font-sans text-xl text-muted-foreground'>
              Kaffe, Kage & Gode Historier
            </p>
          </div>
        </section>

        {/* Opening Hours */}
        <section className='py-16 md:py-24 bg-card'>
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
                    Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    size='sm'
                    variant='outline'
                    className='gap-2'
                  >
                    <X className='w-4 h-4' />
                    Cancel
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
                          onChange={(e) => {
                            const newHours = [...openingHours];
                            newHours[index].day = e.target.value;
                            setOpeningHours(newHours);
                          }}
                          className='max-w-[200px]'
                        />
                        <Input
                          value={item.hours}
                          onChange={(e) => {
                            const newHours = [...openingHours];
                            newHours[index].hours = e.target.value;
                            setOpeningHours(newHours);
                          }}
                          className='max-w-[150px]'
                        />
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
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section className='py-16 md:py-24 bg-background text-foreground'>
          <div className='container mx-auto px-4'>
            {/* Main Title */}
            <h2 className='font-serif text-4xl md:text-5xl font-bold text-center mb-16 tracking-wide'>
              Menu
            </h2>

            {/* Category Tabs */}
            <div className='max-w-4xl mx-auto mb-20 border-b border-border/40 pb-4'>
              <div className='flex flex-wrap gap-8 justify-center'>
                {menu.categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(index)}
                    className={`pb-2 font-serif text-sm md:text-base uppercase tracking-[0.2em] transition-all relative ${
                      selectedCategory === index
                        ? 'text-primary font-bold after:content-[""] after:absolute after:bottom-[-17px] after:left-0 after:w-full after:h-0.5 after:bg-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategories & Items */}
            <div className='max-w-5xl mx-auto space-y-20'>
              {currentCategoryData.subcategories?.map(
                (subcategory, subIndex) => (
                  <div
                    key={subIndex}
                    className='animate-in fade-in slide-in-from-bottom-4 duration-700'
                  >
                    {/* Subcategory Title */}
                    <div className='text-center mb-10'>
                      {isEditing ? (
                        <Input
                          value={subcategory.name}
                          onChange={(e) => {
                            const newMenu = { ...menu };
                            newMenu.categories[selectedCategory].subcategories[
                              subIndex
                            ].name = e.target.value;
                            setMenu(newMenu);
                          }}
                          className='text-center font-serif text-2xl font-bold italic'
                        />
                      ) : (
                        <h3 className='font-serif text-2xl md:text-3xl font-bold italic text-foreground/80 decoration-wavy'>
                          {subcategory.name}
                        </h3>
                      )}
                      <div className='w-12 h-1 bg-primary/20 mx-auto mt-4 rounded-full'></div>
                    </div>

                    {/* Items Grid */}
                    <div className='grid md:grid-cols-2 gap-x-16 gap-y-6'>
                      {subcategory.items.map((item, itemIndex) => (
                        <div key={itemIndex} className='w-full'>
                          <div className='flex flex-col'>
                            <div className='flex items-baseline justify-between w-full mb-1'>
                              {/* Name */}
                              <div className='pr-2 bg-background z-10'>
                                {isEditing ? (
                                  <Input
                                    value={item.name}
                                    onChange={(e) => {
                                      const newMenu = { ...menu };
                                      newMenu.categories[
                                        selectedCategory
                                      ].subcategories[subIndex].items[
                                        itemIndex
                                      ].name = e.target.value;
                                      setMenu(newMenu);
                                    }}
                                    className='font-serif font-bold uppercase tracking-wider'
                                  />
                                ) : (
                                  <h4 className='font-serif font-bold text-lg uppercase tracking-wider text-foreground'>
                                    {item.name}
                                  </h4>
                                )}
                              </div>

                              {/* Dotted Leader */}
                              {!isEditing && (
                                <div className='flex-grow border-b-2 border-dotted border-muted-foreground/30 relative -top-1 mx-2'></div>
                              )}

                              {/* Price */}
                              <div className='pl-2 bg-background z-10'>
                                {isEditing ? (
                                  <Input
                                    value={item.price}
                                    onChange={(e) => {
                                      const newMenu = { ...menu };
                                      newMenu.categories[
                                        selectedCategory
                                      ].subcategories[subIndex].items[
                                        itemIndex
                                      ].price = e.target.value;
                                      setMenu(newMenu);
                                    }}
                                    className='w-20 text-right'
                                  />
                                ) : (
                                  <span className='font-sans font-semibold text-lg text-primary'>
                                    {item.price}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Description */}
                            <div className='mt-0'>
                              {isEditing ? (
                                <Input
                                  value={item.description}
                                  onChange={(e) => {
                                    const newMenu = { ...menu };
                                    newMenu.categories[
                                      selectedCategory
                                    ].subcategories[subIndex].items[
                                      itemIndex
                                    ].description = e.target.value;
                                    setMenu(newMenu);
                                  }}
                                  className='text-sm'
                                />
                              ) : (
                                <p className='font-sans text-muted-foreground text-sm italic leading-relaxed max-w-[90%]'>
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* Bottom Image Carousel */}
            {(currentCategoryData.images?.length > 0 || isEditing) && (
              <div className='mt-24 border-t border-border/20 pt-16 relative group'>
                <h4 className='text-center font-sans text-xs uppercase tracking-widest text-muted-foreground mb-8'>
                  Glimt fra {currentCategoryData.name}
                </h4>

                <div
                  id='category-carousel'
                  className='flex overflow-x-auto gap-4 md:gap-8 pb-4 snap-x snap-mandatory scrollbar-hide'
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {isEditing && (
                    <div className='flex-shrink-0 w-[300px] h-[200px] bg-muted flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 snap-center'>
                      <span className='text-sm text-muted-foreground'>
                        Tilføj billeder her (Funktion ikke aktiv)
                      </span>
                    </div>
                  )}

                  {currentCategoryData.images?.map((imgUrl, imgIndex) => (
                    <div
                      key={imgIndex}
                      className='flex-shrink-0 w-[85vw] md:w-[400px] snap-center'
                    >
                      <img
                        src={imgUrl}
                        alt={`${currentCategoryData.name} ${imgIndex}`}
                        className='w-full h-[250px] md:h-[300px] object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-700 shadow-md'
                      />
                    </div>
                  ))}
                </div>

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

        {/* Instagram Feed */}
        <section className='py-16 md:py-24 bg-card'>
          <div className='container mx-auto px-4'>
            <div className='flex items-center gap-3 mb-12 justify-center'>
              <Instagram className='w-8 h-8 text-primary' />
              <h2 className='font-serif text-3xl md:text-4xl font-bold text-foreground'>
                Følg os på Instagram
              </h2>
            </div>
            <div className='max-w-6xl mx-auto'>
              <div className='text-center mb-8'>
                <a
                  href='https://www.instagram.com/elses_gab/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-sans text-lg'
                >
                  @elses_gab <Instagram className='w-5 h-5' />
                </a>
              </div>

              {/* Instagram Embed Placeholder */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className='aspect-square bg-muted/20 rounded-lg flex items-center justify-center border border-border/20'
                  >
                    <Instagram className='w-12 h-12 text-muted-foreground/30' />
                  </div>
                ))}
              </div>
              <p className='text-center mt-8 text-muted-foreground font-sans'>
                Instagram feed kræver API integration. Besøg vores{' '}
                <a
                  href='https://www.instagram.com/elses_gab/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary hover:underline'
                >
                  Instagram profil
                </a>{' '}
                for at se de nyeste opslag.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ElsesGabPage;
