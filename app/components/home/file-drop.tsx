'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { FileDrop } from 'react-file-drop';
import FilesList from './file-list';
import { Button } from '../ui/button';
import { useFileUpload } from '@/lib/hooks/use-file-upload';
import { Progress } from '../ui/progress';
import OTPDisplay from '../ui/otp-display';

export default function FileDropzone() {
  const fileInputRef = useRef(null);
  const [currFiles, setCurrFiles] = useState<FileList | null>(null); // or any other type you want to use
  const {
    fileProgress,
    handleMultipleFileUpload,
    uploadUrl,
    generatedOTP,
    allFilesUploaded,
    isLoading,
  } = useFileUpload();
  const onFileDrop = (
    files: FileList | null,
    ev: React.DragEvent<HTMLDivElement>,
  ) => {
    setCurrFiles(files);
    // do something with your files...
  };

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    setCurrFiles(files);
    // do something with your files...
  };
  const onTargetClick = () => {
    fileInputRef &&
      fileInputRef.current &&
      (fileInputRef.current as any).click();
  };
  return (
    <div className='w-full'>
      <input
        onChange={onFileInputChange}
        ref={fileInputRef}
        type='file'
        className='hidden'
        multiple
      />
      <FileDrop onTargetClick={onTargetClick} onDrop={onFileDrop}>
        <p>Drop File Here</p>
      </FileDrop>

      <FilesList
        files={currFiles}
        fileProgress={fileProgress}
        uploadUrl={uploadUrl}
      />
      <div className='mx-auto mt-5 w-full'>
        {allFilesUploaded ? (
          <OTPDisplay otp={generatedOTP} />
        ) : (
          <Button
            className='w-full'
            disabled={isLoading || !currFiles || currFiles.length === 0}
            onClick={(e) => {
              e.preventDefault();
              if (currFiles && currFiles.length > 0) {
                handleMultipleFileUpload(currFiles);
              }
            }}
          >
            Upload
          </Button>
        )}
      </div>
    </div>
  );
}
