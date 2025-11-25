const TORW = () => {
  return (
    <section id="torw" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-primary">
              TØRW
            </h2>
            <h3 className="font-serif text-2xl md:text-3xl mb-8 text-secondary">
              Tøjbutik og Unika
            </h3>
            <div className="space-y-6 text-muted-foreground">
              <p className="font-sans text-lg leading-relaxed">
                TØRW er vores tøjbutik, hvor du finder udvalgte brands og unika pieces. Vi fokuserer på kvalitet, 
                stil og tidløst design.
              </p>
              <p className="font-sans text-lg leading-relaxed">
                Butikken rummer også et galleri med skiftende udstillinger af lokale kunstnere og håndværkere. 
                Kom forbi og bliv inspireret.
              </p>
              <div className="pt-4">
                <div className="inline-block px-6 py-3 bg-primary/10 border border-primary rounded-lg">
                  <p className="font-sans text-foreground font-medium">Åben efter aftale • Kontakt os for besøg</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470"
                alt="TØRW Tøjbutik"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TORW;
