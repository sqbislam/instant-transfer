import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { createFormDataFromObject } from '../utils';
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
  const [buttonText, setButtonText] = useState('Upload Files' as any); //  Text displayed on loading button

  const resetState = useCallback(() => {
    setFileUploadData({});
    setFileProgress({});
    setGeneratedOTP('');
    setButtonText('Upload Files');
    setAllFilesUploaded(false);
    setIsLoading(false);
  }, []);

  const _handleSingleFileUpload = useCallback(
    async (file: File) => {
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
        // Start file upload
        setButtonText('Uploading...');
        const res = await axios.post('/api/upload', data, {
          headers: { 'Content-Type': 'application/json' },
        });

        // Get the pre-signed URL for uploading the file and OTP
        const { putUrl, fileIdentifier } = await res.data;
        // Upload files to S3 using signed URL
        const uploadResponse = await axios.put(putUrl, currfile, {
          headers: { 'Content-Type': currfile.type },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.loaded && progressEvent.total !== undefined) {
              const percentCompleted =
                progressEvent.loaded / progressEvent.total;
              setFileProgress((prev) => ({
                ...prev,
                [file.name]: percentCompleted,
              }));
            }
          },
        });

        if (!(uploadResponse.status === 200)) {
          setButtonText('Try Again');
          throw new Error('Failed to upload file');
        }
        setFileProgress({ ...fileProgress, [file.name]: 1.0 }); // Set file progress to 100% when file upload succeeds
        setFileUploadData((prev) => ({
          ...prev,
          [currfile.name]: {
            uploadedUrl: putUrl,
            success: true,
            fileName,
            fileIdentifier,
          },
        }));

        return { putUrl, fileIdentifier };
      } catch (error) {
        console.error(error);
        setFileProgress({ ...fileProgress, [file.name]: 0.0 }); // Set file progress to 100% when file upload succeeds
        toast.error('Failed to upload file');
        setButtonText('Try Again');
      }
    },
    [fileProgress],
  );

  const handleMultipleFileUpload = useCallback(
    async (files: FileList) => {
      setAllFilesUploaded(false);
      setIsLoading(true);
      try {
        const filesArray = Array.from(files);
        const totalFiles = filesArray.length;
        const fileIdentifiers = [];
        const fileNames = [];
        const mimeTypes = [];
        const sizes = [];
        for (let i = 0; i < totalFiles; i++) {
          const file = files[i];
          const singleFileUploadRes = await _handleSingleFileUpload(file);
          fileIdentifiers.push(singleFileUploadRes?.fileIdentifier);
          fileNames.push(file.name);
          mimeTypes.push(file.type);
          sizes.push(file.size);
        }

        // Request Prisma to upload hashed OTP and file Identifiers
        const data = { fileIdentifiers, fileNames, mimeTypes, sizes};
        setButtonText('Generating OTP...');
        const res = await axios.post('/api/hash', data, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (!(res.status === 200)) {
          setButtonText('Try Again');
          throw new Error('Failed to generate OTP');
        }
        // Get the pre-signed URL for uploading the file and OTP
        const { generatedOTP } = await res.data;

        // TODO: Email or SMS the OTP to the user
        setGeneratedOTP(generatedOTP);

        toast.success('All files uploaded successfully. OTP generated!');
        setButtonText('Success!');
        setAllFilesUploaded(true);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setButtonText('Try Again');
        toast.error('Failed to upload files');
      }
    },
    [_handleSingleFileUpload],
  );

  return {
    handleMultipleFileUpload,
    fileProgress,
    fileUploadData,
    generatedOTP,
    allFilesUploaded,
    isLoading,
    resetState,
    buttonText,
  };
};
