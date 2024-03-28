'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { FileDrop } from 'react-file-drop';

export default function FileDropzone() {
  const fileInputRef = useRef(null);
  const [currFile, setCurrFile] = useState<File | null>(null); // or any other type you want to use

  const onFileDrop = (
    files: FileList | null,
    ev: React.DragEvent<HTMLDivElement>,
  ) => {
    setCurrFile(files && files[0]);
    // do something with your files...
  };

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    setCurrFile(files && files[0]);
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
      />
      <FileDrop onTargetClick={onTargetClick} onDrop={onFileDrop}>
        Drop File Here
        <span>{currFile && currFile.name}</span>
      </FileDrop>
    </div>
  );
}
