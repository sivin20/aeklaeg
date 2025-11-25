const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <p className="font-serif text-3xl font-bold text-primary">Æ Klæg</p>
          <p className="font-sans text-muted-foreground">
            Havnevej 2, 6720 Nordby • Fanø, Danmark
          </p>
          <p className="font-sans text-sm text-muted-foreground">
            © {new Date().getFullYear()} Æ Klæg. Alle rettigheder forbeholdes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
