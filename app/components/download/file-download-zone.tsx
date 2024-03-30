'use client';

import { useState } from 'react';
import FilesList from '../shared/file-list';
import { Button } from '../ui/button';
import { InputOTP } from '../ui/input-otp';
import { OTPInputControlled } from './otp-input';
import { useFileDownload } from '@/lib/hooks/use-file-download';

export default function FileDownloadZone() {
  const [currFiles, setCurrFiles] = useState<FileList | null>(null); // or any other type you want to use
  const {
    onInputChange,
    handleMultipleFileDownload,
    fileDownloadData,
    isLoading,
  } = useFileDownload();

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
        >
          {isLoading ? 'Fetching...' : 'Download'}
        </Button>
      }
    </div>
  );
}
