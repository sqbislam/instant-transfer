import { formatBytes, truncateString } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Card } from '../ui/card';
import { fileIconTypes } from '@/lib/fileIcons';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import DownloadButton from '../download/download-btn';

interface FileItemProps {
  file?: File;
  progress?: number;
  completed?: boolean;
  fileMeta?: {
    name?: string;
    size?: number;
    type?: string;
    downloadLink?: string;
  };
}
const FileItem = ({
  file,
  progress = 0,
  completed = false,
  fileMeta,
}: FileItemProps) => {
  const { name, size, type } = file ?? fileMeta ?? {};
  let nameComp = (
    <h3 className='text-md font-semibold'>
      {name && truncateString(name, 50)}
    </h3>
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
  return (
    <Card className='relative mt-2 flex w-full flex-row items-center p-1'>
      <div className='flex h-[50px] w-[50px] items-center  justify-center'>
        {type && fileIconTypes.hasOwnProperty(type)
          ? fileIconTypes[type]
          : fileIconTypes['default']}
      </div>
      <div className='flex w-full flex-col pl-2'>
        {nameComp}
        <p className='text-sm text-slate-500'>{size && formatBytes(size)}</p>
        {!completed && !fileMeta && (
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
      {fileMeta && fileMeta.downloadLink && (
        <DownloadButton
          s3Url={fileMeta.downloadLink}
          fileName={fileMeta?.name ?? 'default'}
        >
          Download
        </DownloadButton>
      )}
    </Card>
  );
};
export default FileItem;
