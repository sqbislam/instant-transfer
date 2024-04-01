'use client';

import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { FileDrop } from 'react-file-drop';
import FilesList from '../shared/file-list';
import { Button } from '../ui/button';
import { useFileUpload } from '@/lib/hooks/use-file-upload';
import OTPDisplay from '../ui/otp-display';
import { AiOutlineLoading } from 'react-icons/ai';
import QRCodeView from './qrCodeView';
export default function FileDropzone() {
  const fileInputRef = useRef(null);
  const [currFiles, setCurrFiles] = useState<FileList | null>(null); // or any other type you want to use
  const {
    fileProgress,
    handleMultipleFileUpload,
    fileUploadData,
    generatedOTP,
    allFilesUploaded,
    isLoading,
    resetState,
    buttonText,
  } = useFileUpload();
  const onFileDrop = (
    files: FileList | null,
    ev: React.DragEvent<HTMLDivElement>,
  ) => {
    resetState();
    setCurrFiles(files);
    // do something with your files...
  };

  const onFileInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      resetState();
      const { files } = event.target;
      setCurrFiles(files);
      // do something with your files...
    },
    [resetState],
  );

  const onTargetClick = useCallback(() => {
    fileInputRef &&
      fileInputRef.current &&
      (fileInputRef.current as any).click();
  }, [fileInputRef]);
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
        fileUploadData={fileUploadData}
      />
      <div className='mx-auto mt-5 w-full'>
        {allFilesUploaded ? (
          <div>
            Files Uploaded
            <OTPDisplay otp={generatedOTP} />
            <QRCodeView
              value={`https://instant-transfer.vercel.app/download?otp=${generatedOTP}`}
            />
          </div>
        ) : (
          <Button
            className='w-full font-semibold'
            disabled={isLoading || !currFiles || currFiles.length === 0}
            onClick={(e) => {
              e.preventDefault();
              if (currFiles && currFiles.length > 0) {
                handleMultipleFileUpload(currFiles);
              }
            }}
          >
            {isLoading && (
              <AiOutlineLoading className='mr-5 h-7 w-7 animate-spin' />
            )}{' '}
            {buttonText ?? 'Upload Files'}
          </Button>
        )}
      </div>
    </div>
  );
}
