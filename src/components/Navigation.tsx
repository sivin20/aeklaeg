import { useState } from 'react';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import LoginDialog from './LoginDialog';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Hjem', href: '/', logo: null },
    { label: 'Kædekassen', href: '/kaedekassen', logo: '/logos/kaedekassen_white.svg' },
    { label: 'Elses Gab', href: '/elses-gab', logo: '/logos/elsesgab-white.svg' },
    { label: 'Værftet', href: '/vaerftet', logo: '/logos/vaerftet_white.svg' },
    { label: 'TØRW', href: '/torw', logo: '/logos/torw_white.svg' },
    { label: 'Kontakt', href: '/#kontakt', logo: null },
  ];

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-20'>
          <Link to='/'>
            <img 
              src='/logos/aeklaeg_white.svg' 
              alt='Æ Klæg' 
              className='h-10 invert dark:invert-0'
            />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className='group flex items-center gap-2 text-foreground hover:text-primary transition-colors font-sans text-sm tracking-wide'
              >
                {item.logo && (
                  <img 
                    src={item.logo} 
                    alt={item.label} 
                    className='h-5 invert dark:invert-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:brightness-125' 
                  />
                )}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className='md:hidden py-4 animate-fade-in'>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className='group flex items-center gap-2 py-3 text-foreground hover:text-primary transition-colors font-sans'
                onClick={() => setIsOpen(false)}
              >
                {item.logo && (
                  <img 
                    src={item.logo} 
                    alt={item.label} 
                    className='h-5 invert dark:invert-0 transition-all duration-300 group-hover:scale-110' 
                  />
                )}
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
