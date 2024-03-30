import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import prisma from '@/lib/prisma';
import { createFormDataFromObject, generateOTP, hashOTP } from '../utils';
export interface FileUploadData {
  [key: string]: {
    error?: string;
    uploadedUrl?: string;
    fileIdentifier?: string;
    fileName?: string;
    success?: boolean;
  };
}

export const useFileUpload = () => {
  const [fileUploadData, setFileUploadData] = useState<FileUploadData>({});
  const [fileProgress, setFileProgress] = useState(
    {} as Record<string, number>,
  );
  const [generatedOTP, setGeneratedOTP] = useState('' as any);
  const [allFilesUploaded, setAllFilesUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSingleFileUpload = async (file: File) => {
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    setFileProgress((prev) => ({ ...prev, [file.name]: 0 })); // Set progress to 0% when file upload starts

    try {
      let currfile = file;
      let fileParts = currfile.name.split('.');
      let fileName = fileParts[0];
      let fileType = fileParts[1];

      const data = createFormDataFromObject({ fileName, fileType });

      const res = await axios.post('/api/upload', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Get the pre-signed URL for uploading the file and OTP
      const { putUrl, getUrl, fileIdentifier } = await res.data;

      const uploadResponse = await axios.put(putUrl, currfile, {
        headers: { 'Content-Type': currfile.type },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.loaded && progressEvent.total !== undefined) {
            const percentCompleted = progressEvent.loaded / progressEvent.total;
            setFileProgress((prev) => ({
              ...prev,
              [file.name]: percentCompleted,
            }));
          }
        },
      });

      if (!(uploadResponse.status === 200)) {
        throw new Error('Failed to upload file');
      }
      setFileProgress({ ...fileProgress, [file.name]: 1.0 }); // Set file progress to 100% when file upload succeeds
      setFileUploadData((prev) => ({
        ...prev,
        [currfile.name]: {
          uploadedUrl: getUrl,
          success: true,
          fileName,
          fileIdentifier,
        },
      }));

      toast.success('You have successfully uploaded your file');

      return { getUrl, fileIdentifier };
    } catch (error) {
      console.error(error);
      setFileProgress({ ...fileProgress, [file.name]: 0.0 }); // Set file progress to 100% when file upload succeeds
      toast.error('Failed to upload file');
    }
  };

  const handleMultipleFileUpload = async (files: FileList) => {
    setAllFilesUploaded(false);
    setIsLoading(true);
    try {
      const filesArray = Array.from(files);
      const totalFiles = filesArray.length;
      const fileIdentifiers = [];
      for (let i = 0; i < totalFiles; i++) {
        const file = files[i];
        const singleFileUploadRes = await handleSingleFileUpload(file);
        fileIdentifiers.push(singleFileUploadRes?.fileIdentifier);
      }

      // Request Prisma to upload hashed OTP and file Identifiers
      const data = { fileIdentifiers };
      const res = await axios.post('/api/hash', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!(res.status === 200)) {
        throw new Error('Failed to generate OTP');
      }
      // Get the pre-signed URL for uploading the file and OTP
      const { generatedOTP } = await res.data;

      setGeneratedOTP(generatedOTP);
      toast.success('All files uploaded successfully');
      setAllFilesUploaded(true);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error('Failed to upload files');
    }
  };

  return {
    handleMultipleFileUpload,
    fileProgress,
    fileUploadData,
    generatedOTP,
    allFilesUploaded,
    isLoading,
  };
};
