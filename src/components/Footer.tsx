import { Button } from '@/components/ui/button.tsx';
import {
  LogIn,
  LogOut,
  MapPin,
  Instagram,
  Facebook,
  Mail,
  Map,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.tsx';
import { useState } from 'react';
import LoginDialog from '@/components/LoginDialog.tsx';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, logOut } = useAuth();

  return (
    <footer className='bg-card border-t border-border mt-auto'>
      <div className='container mx-auto px-6 py-12 md:py-16'>
        {/* MAIN GRID */}
        <div className='grid grid-cols-2 md:grid-cols-12 gap-y-10 gap-x-4 md:gap-8 mb-16'>
          {/* 1. BRAND (Full width on mobile, Col 1-5 on desktop) */}
          <div className='col-span-2 md:col-span-5 space-y-4'>
            <h3 className='font-typewriter text-2xl font-bold text-primary tracking-tight'>
              <Link to='/'>Æ Klæg</Link>
            </h3>
            <p className='text-muted-foreground font-sans text-sm leading-relaxed max-w-sm'>
              Vi skaber autentiske oplevelser i hjertet af Nordby. Kom forbi til
              lokale specialiteter og den gode stemning på havnen.
            </p>

            <div className='flex gap-4 pt-2'>
              <a
                href='https://www.instagram.com/elses_gab/'
                className='flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-muted-foreground'
                aria-label='Instagram'
              >
                <Instagram className='h-4 w-4' />
              </a>
              <a
                href='https://www.facebook.com/profile.php?id=100043699035975'
                className='flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-muted-foreground'
                aria-label='Facebook'
              >
                <Facebook className='h-4 w-4' />
              </a>
            </div>
          </div>

          {/* 2. UDFORSK (Left side on mobile) */}
          <div className='col-span-1 md:col-start-7 md:col-span-3'>
            <h4 className='font-sans text-xs font-bold uppercase tracking-widest text-foreground/80 mb-6'>
              Udforsk
            </h4>
            <nav className='flex flex-col space-y-4'>
              {['Værftet', 'Elses Gab', 'TØRW', 'Kædekassen'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(' ', '-').replace('ø', 'oe').replace('æ', 'ae')}`}
                  className='text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 duration-200 block'
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* 3. BESØG OS (Right side on mobile) */}
          <div className='col-span-1 md:col-span-3'>
            <h4 className='font-sans text-xs font-bold uppercase tracking-widest text-foreground/80 mb-6'>
              Besøg os
            </h4>
            {/* Unified List Structure */}
            <div className='flex flex-col space-y-4'>
              {/* Address Item */}
              <div className='flex items-start gap-3 group'>
                <MapPin className='h-4 w-4 text-primary shrink-0 mt-0.5' />
                <div className='text-sm text-muted-foreground leading-tight group-hover:text-foreground transition-colors'>
                  <p>Havnevej 2</p>
                  <p>6720 Fanø</p>
                </div>
              </div>

              {/* Directions Item */}
              <a
                href='https://www.google.com/maps/search/?api=1&query=Havnevej+2+6720+Nordby'
                target='_blank'
                rel='noreferrer'
                className='flex items-center gap-3 group'
              >
                <Map className='h-4 w-4 text-primary shrink-0' />
                <span className='text-sm text-muted-foreground group-hover:text-primary transition-colors'>
                  Find vej
                </span>
              </a>

              {/* Email Item */}
              <a
                href='mailto:elsesgab@gmail.com'
                className='flex items-center gap-3 group'
              >
                <Mail className='h-4 w-4 text-primary shrink-0' />
                <span className='text-sm text-muted-foreground group-hover:text-primary transition-colors truncate'>
                  elsesgab@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className='pt-8 border-t border-border flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground'>
          <div className='flex flex-col md:flex-row items-center gap-1 md:gap-6'>
            <span>© {new Date().getFullYear()} Æ Klæg</span>
            <span className='hidden md:inline text-border/60'>|</span>
            <span className='flex items-center gap-1'>
              Website made by
              <span className='font-semibold text-foreground border-b border-primary/20 pb-px'>
                Sigurd
              </span>
            </span>
          </div>

          <div>
            {user ? (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => logOut()}
                className='h-auto p-0 hover:bg-transparent hover:text-destructive text-xs'
              >
                <LogOut className='h-3 w-3 mr-1.5' />
                Log ud
              </Button>
            ) : (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setLoginOpen(true)}
                className='h-auto p-0 hover:bg-transparent hover:text-primary text-muted-foreground text-xs'
              >
                <LogIn className='h-3 w-3 mr-1.5' />
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
