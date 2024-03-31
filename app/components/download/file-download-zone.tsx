'use client';

import { useState } from 'react';
import FilesList from '../shared/file-list';
import { Button } from '../ui/button';
import { InputOTP } from '../ui/input-otp';
import { OTPInputControlled } from './otp-input';
import { useFileDownload } from '@/lib/hooks/use-file-download';
import { useSearchParams } from 'next/navigation';

export default function FileDownloadZone() {
    const searchParams = useSearchParams();
    const otp = searchParams.get('otp');
  const {
    onInputChange,
    handleMultipleFileDownload,
    fileDownloadData,
    isLoading,
  } = useFileDownload({ otp });

  return (
    <div className='w-full'>
      <OTPInputControlled onInputChange={onInputChange} />
      <FilesList fileDownloadData={fileDownloadData} />
      {
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleMultipleFileDownload();
          }}
          disabled={isLoading}
          className='mt-2 w-full'
        >
          {isLoading ? 'Fetching...' : 'Download'}
        </Button>
      }
    </div>
  );
}
