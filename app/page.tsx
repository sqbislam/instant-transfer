import Card from '@/components/home/card';
import FileDashboard from './dashboard/page';
import { AiOutlineThunderbolt } from 'react-icons/ai';

export default async function Home() {
  return (
    <>
      <div className='z-10 w-full max-w-xl px-10 xl:px-0'>
        <div className='w-full '>
          <h2 className='my-4 inline-block text-2xl font-bold'>
            Instant Transfer
            <AiOutlineThunderbolt />
          </h2>
          <p className='text-slate-500'>
            File transfer made easy. Just upload your file and use the code or
            QR code to download file in your desired device
          </p>
        </div>
        <FileDashboard />
      </div>
    </>
  );
}
