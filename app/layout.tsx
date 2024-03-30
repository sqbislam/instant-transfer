import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import cx from 'classnames';
import { sfPro, inter } from './fonts';
import Nav from '@/components/layout/nav';
import Footer from '@/components/layout/footer';
import { Suspense } from 'react';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TimerProvider } from '@/lib/timercontext';

export const metadata = {
  title: 'Instant Transfer',
  description:
    'File transfer made easy. Just upload your file and use the code or QR code to download file in your desired device',
  metadataBase: new URL('https://precedent.dev'),
  themeColor: '#FFF',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className='fixed z-[-10] h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100' />

        <Suspense fallback='...'>
          <Nav />
        </Suspense>
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme='dark'
        />
        <main className='z-5 flex min-h-screen w-full flex-col items-center py-32'>
          <div className=' w-full max-w-xl px-10 xl:px-0'>
            <div className='w-full '>
              <h2 className='my-4 inline-block text-2xl font-bold'>
                Instant Transfer
                <AiOutlineThunderbolt />
              </h2>
              <p className='text-slate-500'>
                File transfer made easy. Just upload your file and use the code
                or QR code to download file in your desired device
              </p>
            </div>
          </div>
          <TimerProvider>{children}</TimerProvider>
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
