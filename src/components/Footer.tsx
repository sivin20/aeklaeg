import { Button } from '@/components/ui/button.tsx';
import { LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.tsx';
import { useState } from 'react';
import LoginDialog from '@/components/LoginDialog.tsx';

const Footer = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, logOut } = useAuth();

  return (
    <footer className='py-12 bg-card border-t border-border'>
      <div className='container mx-auto px-4'>
        <div className='text-center space-y-4'>
          <p className='font-serif text-3xl font-bold text-primary'>Æ Klæg</p>
          <p className='font-sans text-muted-foreground'>
            Havnevej 2, 6720 Nordby • Fanø, Danmark
          </p>
          <p className='font-sans text-sm text-muted-foreground'>
            © {new Date().getFullYear()} Æ Klæg. Alle rettigheder forbeholdes.
          </p>
          {user ? (
            <Button
              variant='ghost'
              size='sm'
              onClick={() => logOut()}
              className='gap-2'
            >
              <LogOut className='h-4 w-4' />
              Logout
            </Button>
          ) : (
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setLoginOpen(true)}
              className='gap-2'
            >
              <LogIn className='h-4 w-4' />
              Admin
            </Button>
          )}
        </div>
      </div>
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </footer>
  );
};

export default Footer;
