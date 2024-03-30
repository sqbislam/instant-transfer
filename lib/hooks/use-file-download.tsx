import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

export interface FileDownloadData {
  [key: string]: {
    error?: string;
    downloadedUrl?: string;
    fileIdentifier?: string;
    fileName?: string;
    success?: boolean;
    isValid?: boolean;
  };
}

export const useFileDownload = () => {
  const [fileUploadData, setFileUploadData] = useState<FileDownloadData>({});
  const [fileProgress, setFileProgress] = useState(
    {} as Record<string, number>,
  );
  const [inputOTP, setInputOTP] = useState('' as any);
  const [allFilesDownloaded, setAllFilesDownloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetState = () => {
    setFileUploadData({});
    setFileProgress({});
    setAllFilesDownloaded(false);
    setIsLoading(false);
  };

  const onOTPInputChange = (value: string) => {
    setInputOTP(value);
  };

  const handleMultipleFileDownload = async () => {
    if (!inputOTP || inputOTP.length < 6) {
      toast.error('Please enter a valid OTP');
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.get('/api/hash', {
        params: { inputOTP },
      });

      // Get the pre-signed URL for uploading the file and OTP
      const { fileIdentifiers, fileNames } = await res.data;
      console.log({ fileIdentifiers, fileNames });
      // Retrieve files from s3 if fileIdentifiers are valid
      if (fileIdentifiers && fileIdentifiers.length > 0) {
        const fileDownloadData: FileDownloadData = {};

        let i = 0;
        for (const fileIdentifier of fileIdentifiers) {
          const res = await axios.get('/api/upload', {
            params: { fileIdentifier },
          });
          const { getUrl, fileIdentifier: fileId } = res.data;
          fileDownloadData[fileId] = {
            downloadedUrl: getUrl,
            fileIdentifier,
            fileName: fileNames[i],
          };
          i++;
        }
        setFileUploadData(fileDownloadData);
        setAllFilesDownloaded(true);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return {
    onInputChange: onOTPInputChange,
    handleMultipleFileDownload,
    fileUploadData,
    isLoading,
  };
};
