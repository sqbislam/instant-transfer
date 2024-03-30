import React, { ReactNode } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';

const DownloadButton = ({
  s3Url,
  children,
  fileName,
}: {
  s3Url: string;
  fileName: string;
  children: ReactNode;
}) => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(s3Url, {
        responseType: 'blob', // Important
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // Set the desired filename here
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      toast.error('Error downloading file. Please try again');
      console.error('Error downloading file:', error);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      variant='link'
      className='text-sm text-blue-500'
    >
      {children}
    </Button>
  );
};

export default DownloadButton;
