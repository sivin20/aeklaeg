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
    drinks: [
      { name: "Kaffe", price: "30 kr" },
      { name: "Espresso", price: "25 kr" },
      { name: "Cappuccino", price: "35 kr" },
      { name: "Latte", price: "35 kr" },
      { name: "Te", price: "25 kr" },
    ],
    food: [
      { name: "Smørrebrød", price: "65 kr" },
      { name: "Sandwich", price: "55 kr" },
      { name: "Salat", price: "70 kr" },
      { name: "Kage", price: "40 kr" },
      { name: "Croissant", price: "35 kr" },
    ],
  };

  const [openingHours, setOpeningHours] = useState(defaultOpeningHours);
  const [menu, setMenu] = useState(defaultMenu);

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
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Drinks */}
              <div>
                <h3 className="font-serif text-2xl font-bold mb-6 text-primary">
                  Drikkevarer
                </h3>
                <div className="space-y-4">
                  {menu.drinks.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-border/20 gap-4"
                    >
                      {isEditing ? (
                        <>
                          <Input
                            value={item.name}
                            onChange={(e) => {
                              const newMenu = { ...menu };
                              newMenu.drinks[index].name = e.target.value;
                              setMenu(newMenu);
                            }}
                          />
                          <Input
                            value={item.price}
                            onChange={(e) => {
                              const newMenu = { ...menu };
                              newMenu.drinks[index].price = e.target.value;
                              setMenu(newMenu);
                            }}
                            className="max-w-[100px]"
                          />
                        </>
                      ) : (
                        <>
                          <span className="font-sans text-foreground">{item.name}</span>
                          <span className="font-sans text-primary font-medium">
                            {item.price}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Food */}
              <div>
                <h3 className="font-serif text-2xl font-bold mb-6 text-primary">Mad</h3>
                <div className="space-y-4">
                  {menu.food.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-border/20 gap-4"
                    >
                      {isEditing ? (
                        <>
                          <Input
                            value={item.name}
                            onChange={(e) => {
                              const newMenu = { ...menu };
                              newMenu.food[index].name = e.target.value;
                              setMenu(newMenu);
                            }}
                          />
                          <Input
                            value={item.price}
                            onChange={(e) => {
                              const newMenu = { ...menu };
                              newMenu.food[index].price = e.target.value;
                              setMenu(newMenu);
                            }}
                            className="max-w-[100px]"
                          />
                        </>
                      ) : (
                        <>
                          <span className="font-sans text-foreground">{item.name}</span>
                          <span className="font-sans text-primary font-medium">
                            {item.price}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
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
