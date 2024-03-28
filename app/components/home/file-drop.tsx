'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { FileDrop } from 'react-file-drop';
import FilesList from './file-list';
import { Button } from '../ui/button';
import { handleUpload } from '@/app/api/upload/route';

export default function FileDropzone() {
  const fileInputRef = useRef(null);
  const [currFiles, setCurrFiles] = useState<FileList | null>(null); // or any other type you want to use

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
      <FileDrop onTargetClick={onTargetClick} onDrop={onFileDrop}  >
        Drop File Here
      </FileDrop>

      <FilesList files={currFiles} />

         <Button className='mx-auto mt-5 w-full' onClick={(e)=>{e.preventDefault(); 
          handleUpload(currFiles)}}>Upload</Button>
    </div>
  );
}
