const ElsesGab = () => {
  return (
    <section id="elses-gab" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-primary">
              Elses Gab
            </h2>
            <h3 className="font-serif text-2xl md:text-3xl mb-8 text-secondary">
              Café og Spisested
            </h3>
            <div className="space-y-6 text-muted-foreground">
              <p className="font-sans text-lg leading-relaxed">
                Elses Gab er en hyggelig café, der emmer af hjemlig charme. Her kan du nyde god kaffe, lækker brunch 
                og hjemmelavet mad i hyggelige omgivelser.
              </p>
              <p className="font-sans text-lg leading-relaxed">
                Caféen er navngivet efter Else, der sammen med Alan står bag hele Æ Klæg. Navnet "Gab" henviser til 
                det hyggelige smørhul, hvor man kan få en sludder over en kop kaffe.
              </p>
              <div className="pt-4">
                <div className="inline-block px-6 py-3 bg-primary/10 border border-primary rounded-lg">
                  <p className="font-sans text-foreground font-medium">Åben dagligt • Se åbningstider på vores sociale medier</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1447"
                alt="Elses Gab Café"
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

export default ElsesGab;
