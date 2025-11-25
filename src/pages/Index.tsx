import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import EventsHighlight from "@/components/EventsHighlight";
import Story from "@/components/Story";
import ElsesGab from "@/components/ElsesGab";
import Vaerftet from "@/components/Vaerftet";
import TORW from "@/components/TORW";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <EventsHighlight />
        <Story />
        <ElsesGab />
        <Vaerftet />
        <TORW />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
