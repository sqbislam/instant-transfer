import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import cx from 'classnames';
import { sfPro, inter } from './fonts';
import Nav from '@/components/layout/nav';
import Footer from '@/components/layout/footer';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

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
        <div className='fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100' />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
        <Suspense fallback='...'>
          <Nav />
        </Suspense>
        <main className='flex min-h-screen w-full flex-col items-center py-32'>
            {children}
        </main>
      
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
