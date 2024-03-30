import { FileUploadData } from '@/lib/hooks/use-file-upload';
import { FileDownloadData } from '@/lib/hooks/use-file-download';
import FileItem from './file-item';
import { hasKey } from '@/lib/utils';

export default function FilesList({
  files,
  fileProgress,
  fileDownloadData,
  fileUploadData,
}: {
  files?: FileList | null;
  fileProgress?: Record<string, number> | undefined;
  fileUploadData?: FileUploadData | undefined;
  fileDownloadData?: FileDownloadData | undefined;
}) {
  const filesArray = files && files.length > 0 ? Array.from(files) : [];

  // Check if object has a key

  return (
    <>
      {files &&
        files.length > 0 &&
        filesArray.map((file) => (
          <FileItem
            key={file.name}
            file={file}
            completed={
              fileUploadData && file && hasKey(fileUploadData, file.name)
                ? fileUploadData[file.name].success
                : false
            }
            progress={fileProgress && fileProgress[file.name]}
          />
        ))}

      {fileDownloadData &&
        Object.keys(fileDownloadData).length > 0 &&
        Object.entries(fileDownloadData).map(([key, value]) => (
          <FileItem
            key={key}
            fileMeta={{
              name: value?.fileName,
              type: value?.mimeType,
              size: value?.size,
              downloadLink: value?.downloadedUrl,
            }}
          />
        ))}
    </>
  );
}
