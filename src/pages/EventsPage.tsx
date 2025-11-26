import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {useEffect, useState} from "react";
import {BillettoEvent} from "@/types/billetto.ts";
import {getPreviousEvents, getUpcomingEvents} from "@/services/billetto.service.ts";
import EventDescription from "@/components/Events/EventDescription.tsx";

const EventsPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<BillettoEvent[]>([]);
  const [previousEvents, setPreviousEvents] = useState<BillettoEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const events = await getUpcomingEvents(3);
        setUpcomingEvents(events);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  useEffect(() => {
    async function loadEvents() {
        try {
            const events = await getPreviousEvents(20);
            setPreviousEvents(events);
        } finally {
          setLoading(false)
        }
    }

    loadEvents();
  }, []);

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
            <div className="space-y-12 mx-auto max-w-xl">
              {upcomingEvents.map((ev, idx) => (
                  <div key={ev.id} className="...">
                    <img
                        src={ev.gallery_items?.data[0]?.original_url ?? "/placeholder.jpg"}
                        alt={ev.name}
                        className="object-cover w-full h-full"
                    />

                    <h3>{ev.name}</h3>
                    <p>{new Date(ev.starts_at).toLocaleDateString("da-DK")}</p>
                    <EventDescription html={ev.editorial.description_html ?? ""} initialLines={4} />
                    <a href={ev.public_url} target="_blank">
                      <Button size="lg"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-lg px-8"
                      >
                        Køb billetter
                      </Button>
                    </a>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Previous Events */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-4xl text-center mb-12">Musikere gennem tiden</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {previousEvents.map((ev) => (
                  <div key={ev.id} className="flex flex-col items-center text-center">
                    <div className="w-full max-w-xs aspect-square overflow-hidden rounded-lg">
                      <img
                          src={ev.gallery_items?.data[0]?.original_url ?? "/placeholder.jpg"}
                          alt={ev.name}
                          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-bold text-primary">{ev.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(ev.starts_at).toLocaleDateString("da-DK")}
                    </p>
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
