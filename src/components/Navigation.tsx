import { useState } from 'react';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import LoginDialog from './LoginDialog';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Hjem', href: '/' },
    { label: 'Kædekassen', href: '/kaedekassen' },
    { label: 'Elses Gab', href: '/elses-gab' },
    { label: 'Værftet', href: '/vaerftet' },
    { label: 'TØRW', href: '/torw' },
    { label: 'Kontakt', href: '/#kontakt' },
  ];

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-20'>
          <Link
            to='/'
            className='font-typewriter text-xl font-bold text-primary'
          >
            Æ Klæg
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className='text-foreground hover:text-primary transition-colors font-sans text-sm tracking-wide'
              >
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
                className='block py-3 text-foreground hover:text-primary transition-colors font-sans'
                onClick={() => setIsOpen(false)}
              >
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
