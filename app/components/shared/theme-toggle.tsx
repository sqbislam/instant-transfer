'use client';

import * as React from 'react';
import { FaSun } from 'react-icons/fa6';
import { FaMoon } from 'react-icons/fa6';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const handleToggle = React.useCallback(() => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, [setTheme, theme]);
  return (
    <Button variant='secondary' size='icon' onClick={handleToggle}>
      <FaSun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <FaMoon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
    </Button>
  );
}
