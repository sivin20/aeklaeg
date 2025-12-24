const Story = () => {
  return (
    <section className='py-20 md:py-32 bg-gradient-to-b from-background to-card'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='font-typewriter text-3xl md:text-5xl font-bold mb-8 text-primary'>
            Else og Alan
          </h2>
          <p className='font-sans text-lg md:text-xl text-muted-foreground leading-relaxed mb-12'>
            Hele eventyret på Æ klæg, startede i 2019 da vi købte den gamle
            fiskebutik og startede baren Værftet. Og siden 2019 er det bare gået
            stærkt med renovering og udvidelse.
          </p>
          <div className='bg-card/50 backdrop-blur-sm rounded-lg p-8 border border-border'>
            <p className='font-sans text-base md:text-lg text-foreground leading-relaxed'>
              Mange spørger til hvor navnene, vi bruger om vores sted, kommer
              fra. Vi bruger navne som Æ Klæg, Elses Gab, Værftet og Kædekassen.
              De er måske ikke helt almindelige, men de har alle en historie.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
