import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Clock, Instagram, Edit2, Save, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ElsesGabPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const defaultOpeningHours = [
    { day: "Mandag - Torsdag", hours: "10:00 - 17:00" },
    { day: "Fredag", hours: "10:00 - 18:00" },
    { day: "Lørdag", hours: "10:00 - 16:00" },
    { day: "Søndag", hours: "Lukket" },
  ];

  const defaultMenu = {
    categories: [
      {
        name: "Varme Drikke",
        items: [
          { name: "Kaffe", description: "Friskbrygget filteret kaffe", price: "30 kr", image: "" },
          { name: "Espresso", description: "Dobbelt shot", price: "25 kr", image: "" },
          { name: "Cappuccino", description: "Espresso med cremet mælkeskum", price: "35 kr", image: "" },
          { name: "Latte", description: "Espresso med dampet mælk", price: "35 kr", image: "" },
        ],
      },
      {
        name: "Kolde Drikke",
        items: [
          { name: "Te", description: "Udvalg af økologiske teer", price: "25 kr", image: "" },
          { name: "Friskpresset Juice", description: "Sæsonens frugt", price: "40 kr", image: "" },
        ],
      },
      {
        name: "Mad",
        items: [
          { name: "Smørrebrød", description: "Klassisk dansk smørrebrød med dagens pålæg", price: "65 kr", image: "" },
          { name: "Sandwich", description: "Hjemmelavet med friske ingredienser", price: "55 kr", image: "" },
          { name: "Salat", description: "Grøn salat med sæsonens grøntsager", price: "70 kr", image: "" },
        ],
      },
      {
        name: "Sødt",
        items: [
          { name: "Kage", description: "Hjemmebagt dagligt", price: "40 kr", image: "" },
          { name: "Croissant", description: "Smørbagt croissant", price: "35 kr", image: "" },
        ],
      },
    ],
  };

  const [openingHours, setOpeningHours] = useState(defaultOpeningHours);
  const [menu, setMenu] = useState(defaultMenu);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    const savedHours = localStorage.getItem("elsesGabHours");
    const savedMenu = localStorage.getItem("elsesGabMenu");
    if (savedHours) setOpeningHours(JSON.parse(savedHours));
    if (savedMenu) setMenu(JSON.parse(savedMenu));
  }, []);

  const handleSave = () => {
    localStorage.setItem("elsesGabHours", JSON.stringify(openingHours));
    localStorage.setItem("elsesGabMenu", JSON.stringify(menu));
    setIsEditing(false);
    toast({
      title: "Changes saved",
      description: "Opening hours and menu have been updated.",
    });
  };

  const handleCancel = () => {
    const savedHours = localStorage.getItem("elsesGabHours");
    const savedMenu = localStorage.getItem("elsesGabMenu");
    if (savedHours) setOpeningHours(JSON.parse(savedHours));
    else setOpeningHours(defaultOpeningHours);
    if (savedMenu) setMenu(JSON.parse(savedMenu));
    else setMenu(defaultMenu);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1547"
              alt="Elses Gab"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background"></div>
          </div>
          <div className="relative z-10 text-center">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4 text-primary">
              Elses Gab
            </h1>
            <p className="font-sans text-xl text-muted-foreground">
              Kaffe, Kage & Gode Historier
            </p>
          </div>
        </section>

        {/* Opening Hours */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-8 justify-center">
                <Clock className="w-8 h-8 text-primary" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  Åbningstider
                </h2>
                {user && !isEditing && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="w-5 h-5" />
                  </Button>
                )}
              </div>
              {isEditing && (
                <div className="flex gap-2 mb-4 justify-center">
                  <Button onClick={handleSave} size="sm" className="gap-2">
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} size="sm" variant="outline" className="gap-2">
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>
              )}
              <div className="space-y-4">
                {openingHours.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-4 border-b border-border/30 gap-4"
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
                          className="max-w-[200px]"
                        />
                        <Input
                          value={item.hours}
                          onChange={(e) => {
                            const newHours = [...openingHours];
                            newHours[index].hours = e.target.value;
                            setOpeningHours(newHours);
                          }}
                          className="max-w-[150px]"
                        />
                      </>
                    ) : (
                      <>
                        <span className="font-sans text-lg text-foreground">{item.day}</span>
                        <span className="font-sans text-lg text-primary font-medium">
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

        {/* Menu */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Menu
            </h2>
            
            {/* Category Tabs */}
            <div className="max-w-6xl mx-auto mb-12">
              <div className="flex flex-wrap gap-3 justify-center">
                {menu.categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(index)}
                    className={`px-6 py-3 font-sans font-medium text-sm uppercase tracking-wider transition-all rounded-lg ${
                      selectedCategory === index
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-card text-muted-foreground hover:bg-muted border border-border"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Category */}
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                {menu.categories[selectedCategory].items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-4">
                    {/* Optional Image */}
                    {(item.image || isEditing) && (
                      <div className="flex-shrink-0">
                        {isEditing ? (
                          <div className="space-y-2">
                            <Input
                              value={item.image}
                              onChange={(e) => {
                                const newMenu = { ...menu };
                                newMenu.categories[selectedCategory].items[itemIndex].image = e.target.value;
                                setMenu(newMenu);
                              }}
                              placeholder="Image URL"
                              className="w-32"
                            />
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            )}
                          </div>
                        ) : item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ) : null}
                      </div>
                    )}
                    
                    {/* Item Details */}
                    <div className="flex-1 border-b border-border/20 pb-6">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div className="flex-1">
                          {isEditing ? (
                            <Input
                              value={item.name}
                              onChange={(e) => {
                                const newMenu = { ...menu };
                                newMenu.categories[selectedCategory].items[itemIndex].name = e.target.value;
                                setMenu(newMenu);
                              }}
                              className="font-sans font-semibold"
                            />
                          ) : (
                            <h4 className="font-sans font-semibold text-foreground text-lg">
                              {item.name}
                            </h4>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          {isEditing ? (
                            <Input
                              value={item.price}
                              onChange={(e) => {
                                const newMenu = { ...menu };
                                newMenu.categories[selectedCategory].items[itemIndex].price = e.target.value;
                                setMenu(newMenu);
                              }}
                              className="max-w-[100px]"
                            />
                          ) : (
                            <span className="font-sans text-primary font-medium text-lg">
                              {item.price}
                            </span>
                          )}
                        </div>
                      </div>
                      {isEditing ? (
                        <Input
                          value={item.description}
                          onChange={(e) => {
                            const newMenu = { ...menu };
                            newMenu.categories[selectedCategory].items[itemIndex].description = e.target.value;
                            setMenu(newMenu);
                          }}
                          placeholder="Description"
                          className="text-sm mt-2"
                        />
                      ) : (
                        <p className="font-sans text-muted-foreground text-sm italic leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Feed */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-12 justify-center">
              <Instagram className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Følg os på Instagram
              </h2>
            </div>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <a
                  href="https://www.instagram.com/elses_gab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-sans text-lg"
                >
                  @elses_gab <Instagram className="w-5 h-5" />
                </a>
              </div>
              
              {/* Instagram Embed Placeholder */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-muted/20 rounded-lg flex items-center justify-center border border-border/20"
                  >
                    <Instagram className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                ))}
              </div>
              <p className="text-center mt-8 text-muted-foreground font-sans">
                Instagram feed kræver API integration. Besøg vores{" "}
                <a
                  href="https://www.instagram.com/elses_gab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Instagram profil
                </a>{" "}
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
