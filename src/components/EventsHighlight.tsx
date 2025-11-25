import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const EventsHighlight = () => {
  const featuredEvents = [
    {
      title: "Jazz Aften",
      date: "15. Marts 2024",
      location: "Værftet",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1474",
    },
    {
      title: "Kunstudstilling",
      date: "22. Marts 2024",
      location: "TØRW",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1480",
    },
    {
      title: "Kaffe Smagning",
      date: "5. April 2024",
      location: "Elses Gab",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1470",
    },
  ];

  return (
    <section id="events" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Calendar className="w-10 h-10 text-primary" />
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-foreground">
              Kommende Events
            </h2>
          </div>
          <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto">
            Oplev musik, kunst og kultur i vores unikke venues
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {featuredEvents.map((event, index) => (
            <div
              key={index}
              className="group relative rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500"
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl font-bold mb-2 text-primary">
                    {event.title}
                  </h3>
                  <p className="font-sans text-muted-foreground mb-1">{event.date}</p>
                  <p className="font-sans text-sm text-muted-foreground">{event.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="/events">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-lg px-8"
            >
              Se alle events
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventsHighlight;
