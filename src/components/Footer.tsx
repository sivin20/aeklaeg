import { Button } from '@/components/ui/button.tsx';
import { LogIn, LogOut, MapPin, Instagram, Facebook, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.tsx';
import { useState } from 'react';
import LoginDialog from '@/components/LoginDialog.tsx';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, logOut } = useAuth();

  return (
    <footer className='bg-card border-t border-border mt-auto'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
          {/* Column 1: Brand & About */}
          <div className='space-y-4 text-center md:text-left'>
            <h3 className='font-serif text-3xl font-bold text-primary'>
              Æ Klæg
            </h3>
            <p className='text-muted-foreground font-sans max-w-xs mx-auto md:mx-0'>
              Oplev den autentiske stemning på Fanø. Vi serverer lokale
              specialiteter i hjertet af Nordby.
            </p>
            <div className='flex justify-center md:justify-start gap-4 pt-2'>
              {/* Social Placeholders */}
              <a
                href='#'
                className='text-muted-foreground hover:text-primary transition-colors'
              >
                <Instagram className='h-5 w-5' />
                <span className='sr-only'>Instagram</span>
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-primary transition-colors'
              >
                <Facebook className='h-5 w-5' />
                <span className='sr-only'>Facebook</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Inferred from your site content) */}
          <div className='space-y-4 text-center md:text-left'>
            <h4 className='font-serif text-lg font-semibold text-foreground'>
              Oplev
            </h4>
            <nav className='flex flex-col space-y-2'>
              <Link
                to='/vaerftet'
                className='text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm'
              >
                Værftet
              </Link>
              <Link
                to='/elses-gab'
                className='text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm'
              >
                Elses Gab
              </Link>
              <Link
                to='/toerw'
                className='text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm'
              >
                TØRW
              </Link>
              <Link
                to='/kaedekassen'
                className='text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm'
              >
                Kædekassen
              </Link>
            </nav>
          </div>

          {/* Column 3: Contact Info */}
          <div className='space-y-4 text-center md:text-left'>
            <h4 className='font-serif text-lg font-semibold text-foreground'>
              Kontakt
            </h4>
            <div className='space-y-3 text-sm text-muted-foreground'>
              <div className='flex items-center justify-center md:justify-start gap-2'>
                <MapPin className='h-4 w-4 shrink-0' />
                <span>Havnevej 2, 6720 Nordby • Fanø</span>
              </div>
              <div className='flex items-center justify-center md:justify-start gap-2'>
                <Mail className='h-4 w-4 shrink-0' />
                {/* Placeholder email */}
                <a
                  href='mailto:kontakt@aeklaeg.dk'
                  className='hover:text-primary transition-colors'
                >
                  kontakt@aeklaeg.dk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='my-8 border-t border-border/50' />

        {/* Bottom Bar: Copyright, Credit, Admin */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground'>
          <div className='flex flex-col md:flex-row items-center gap-2 md:gap-6'>
            <p>© {new Date().getFullYear()} Æ Klæg.</p>
            <span className='hidden md:inline text-border'>|</span>
            <p>
              Website made by{' '}
              <span className='font-semibold text-foreground'>Sigurd</span>
            </p>
          </div>

          <div>
            {user ? (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => logOut()}
                className='gap-2 text-muted-foreground hover:text-destructive'
              >
                <LogOut className='h-4 w-4' />
                Log ud
              </Button>
            ) : (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setLoginOpen(true)}
                className='gap-2 text-muted-foreground'
              >
                <LogIn className='h-4 w-4' />
                Admin
              </Button>
            )}
          </div>
        </div>
      </div>
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </footer>
  );
};

export default Footer;
