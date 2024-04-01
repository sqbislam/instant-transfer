'use client';

import Image from 'next/image';
import Link from 'next/link';
import useScroll from '@/lib/hooks/use-scroll';
import { Session } from 'next-auth';
import ModeToggle from '../shared/theme-toggle';
export default function NavBar() {
  const scrolled = useScroll(50);

  return (
    <>
      {/* <SignInModal /> */}
      <div
        className={`fixed top-0 flex w-full justify-center ${
          scrolled
            ? 'border-b border-gray-200 bg-white/50 backdrop-blur-xl dark:border-gray-800 dark:bg-black/50 '
            : 'bg-white/0'
        } z-30 transition-all`}
      >
        <div className='mx-5 flex h-16 w-full max-w-screen-xl items-center justify-center gap-x-10'>
          <Link
            href='/'
            className='font-display mr-auto flex items-center text-2xl'
          >
            <Image
              src='/logo.png'
              alt='Instant Transfer logo'
              width='30'
              height='30'
              className='mr-2 rounded-sm'
            ></Image>
            <p>Instant Transfer</p>
          </Link>

          <Link
            href='/'
            className='font-display flex items-center rounded-sm text-lg font-semibold transition-all hover:text-gray-600'
          >
            <p>Upload</p>
          </Link>
          <Link
            href='/download'
            className='font-display flex items-center rounded-sm text-lg font-semibold transition-all  hover:text-gray-600'
          >
            <p>Download</p>
          </Link>

          <ModeToggle />

          {/* <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className='rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black'
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}
