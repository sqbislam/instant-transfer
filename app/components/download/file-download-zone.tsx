'use client';

import { useState } from 'react';
import FilesList from '../home/file-list';
import { Button } from '../ui/button';
import { InputOTP } from '../ui/input-otp';
import { OTPInputControlled } from './otp-input';
import { useFileDownload } from '@/lib/hooks/use-file-download';

export default function FileDownloadZone() {
  const [currFiles, setCurrFiles] = useState<FileList | null>(null); // or any other type you want to use
  const {
    onInputChange,
    handleMultipleFileDownload,
    fileUploadData,
    isLoading,
  } = useFileDownload();
  console.debug({ fileUploadData });
  return (
    <div className='w-full'>
      <OTPInputControlled onInputChange={onInputChange} />
      {/* <FilesList
        files={currFiles}
        fileProgress={fileProgress}
        fileUploadData={fileUploadData}
      /> */}
      <div className='mx-auto mt-5 w-full'>
        <Button
          className='w-full'
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault();
            handleMultipleFileDownload();
          }}
        >
          Download Files
        </Button>
      </div>
    </div>
  );
}
