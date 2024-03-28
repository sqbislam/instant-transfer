import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const useFileUpload = () => {
  const [uploadUrl, setUploadUrl] = useState({} as Record<string, string>);
  const [fileProgress, setFileProgress] = useState(
    {} as Record<string, number>,
  );

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

      const formdata = new FormData();
      formdata.append('fileName', fileName);
      formdata.append('fileType', fileType);
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const res = await axios.post('/api/upload', formdata, config);
      const { putUrl, getUrl } = await res.data;
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

      //toast.success('You have successfully uploaded your file');
      // Optionally return uploadedUrl or any other data
      return getUrl;
    } catch (error) {
      console.error(error);
      setFileProgress({ ...fileProgress, [file.name]: 0.0 }); // Set file progress to 100% when file upload succeeds
      toast.error('Failed to upload file');
    }
  };

  const handleMultipleFileUpload = async (files: FileList) => {
    try {
      const filesArray = Array.from(files);
      const totalFiles = filesArray.length;

      for (let i = 0; i < totalFiles; i++) {
        const file = files[i];
        const uploadedUrl = await handleSingleFileUpload(file);
        setUploadUrl((prev) => ({ ...prev, [file.name]: uploadedUrl }));
      }

      toast.success('All files uploaded successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload files');
    }
  };

  return { handleMultipleFileUpload, fileProgress, uploadUrl };
};
