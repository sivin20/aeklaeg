import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const EventsPage = () => {
  const upcomingEvents = [
    {
      title: "Jazz Aften med Lokale Kunstnere",
      date: "15. Marts 2024",
      time: "19:00 - 23:00",
      location: "Værftet",
      description: "En hyggelig jazzaften med lokale musikere. Cocktails og god stemning.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1474",
    },
    {
      title: "Kunstudstilling: Lokale Malere",
      date: "22. Marts 2024",
      time: "15:00 - 20:00",
      location: "TØRW",
      description: "Fernisering med udstilling af lokale kunstneres værker. Vin og snacks.",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1480",
    },
    {
      title: "Kaffe Smagning",
      date: "5. April 2024",
      time: "14:00 - 17:00",
      location: "Elses Gab",
      description: "Kom og smag forskellige kaffebønner fra hele verden. Lær om kaffe.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1470",
    },
  ];

  const previousEvents = [
    {
      title: "Nytårskoncert",
      date: "31. December 2023",
      location: "Værftet",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1470",
    },
    {
      title: "Julemarket",
      date: "15. December 2023",
      location: "TØRW",
      image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1470",
    },
    {
      title: "Høstfest",
      date: "20. Oktober 2023",
      location: "Kædekassen",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1470",
    },
    {
      title: "Sommerkoncert",
      date: "15. Juli 2023",
      location: "Værftet",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1470",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1470"
              alt="Events"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background"></div>
          </div>
          <div className="relative z-10 text-center px-4">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4 text-primary">
              Kædekassen / Events
            </h1>
            <p className="font-sans text-xl text-muted-foreground">
              Oplevelser, Musik & Kunst
            </p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-16 text-foreground">
              Kommende Events
            </h2>
            <div className="space-y-12 max-w-5xl mx-auto">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-2 gap-8 items-center bg-card rounded-lg overflow-hidden shadow-xl"
                >
                  <div className={`relative aspect-[4/3] ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className={`p-8 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-primary">
                      {event.title}
                    </h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="w-5 h-5" />
                        <span className="font-sans">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="w-5 h-5" />
                        <span className="font-sans">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-5 h-5" />
                        <span className="font-sans">{event.location}</span>
                      </div>
                    </div>
                    <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                      {event.description}
                    </p>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Læs mere
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Previous Events */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-16 text-foreground">
              Tidligere Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {previousEvents.map((event, index) => (
                <div key={index} className="group relative rounded-lg overflow-hidden shadow-lg">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-serif text-xl font-bold mb-2 text-primary">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="font-sans">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPin className="w-4 h-4" />
                        <span className="font-sans">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;
