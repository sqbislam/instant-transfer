import { formatBytes, hasKey, truncateString } from '@/lib/utils';
import { Card } from '../ui/card';
import { fileIconTypes } from '@/lib/fileIcons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Progress } from '../ui/progress';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FileUploadData } from '@/lib/hooks/use-file-upload';
const FileItem = ({
  file,
  progress = 0,
  completed = false,
}: {
  file: File;
  completed?: boolean;
  progress?: number;
}) => {
  const { name, size, type } = file;
  let nameComp = (
    <h3 className='text-md font-semibold'>{truncateString(name, 50)}</h3>
  );

  if (name && name.length > 50) {
    nameComp = (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <h3 className='text-md cursor-pointer font-semibold'>
              {truncateString(name, 50)}
            </h3>
          </TooltipTrigger>
          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    // Implement tooltip logic
  }
  console.log({ progress });

  return (
    <Card className='relative mt-2 flex w-full flex-row items-center p-1'>
      <div className='flex h-[50px] w-[50px] items-center  justify-center'>
        {type && fileIconTypes.hasOwnProperty(type)
          ? fileIconTypes[type]
          : fileIconTypes['default']}
      </div>
      <div className='flex w-full flex-col pl-2'>
        {nameComp}
        <p className='text-sm text-slate-500'>{formatBytes(size)}</p>
        {!completed && (
          <Progress
            className=' mt-1 h-2 w-[90%]'
            value={Math.round(progress * 100)}
          />
        )}
      </div>
      <p></p>
      {completed && (
        <BsCheckCircleFill className='absolute right-2 text-green-500' />
      )}
    </Card>
  );
};
export default function FilesList({
  files,
  fileProgress,
  fileUploadData,
}: {
  files: FileList | null;
  fileProgress: Record<string, number> | undefined;
  fileUploadData: FileUploadData | undefined;
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
    </>
  );
}
