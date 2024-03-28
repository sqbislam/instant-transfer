
import FileDashboard from './dashboard/page';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import {  ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default async function Home() {
  return (
    <>
      <div className='z-10 w-full max-w-xl px-10 xl:px-0'>
            <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="dark"
          />
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
