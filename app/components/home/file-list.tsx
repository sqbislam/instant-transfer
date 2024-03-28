import { formatBytes, truncateString } from '@/lib/utils';
import { Card } from '../ui/card';
import { fileIconTypes } from '@/lib/fileIcons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const FileItem = ({ file }: { file: File }) => {
  const { name, size, type } = file;
  let nameComp = (
    <h3 className='text-md font-semibold'>{truncateString(name, 50)}</h3>
  );

  if (name && name.length > 50) {
    nameComp =     (<TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <h3 className='text-md font-semibold cursor-pointer'>{truncateString(name, 50)}</h3>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>)
    // Implement tooltip logic
  }

  return (
    <Card className='mt-2 flex flex-row items-center p-1 '>
      <div className='flex h-[50px] w-[50px] items-center  justify-center'>
        {type && fileIconTypes.hasOwnProperty(type) ? fileIconTypes[type] : fileIconTypes['default']}
      </div>
      <div className='flex flex-col pl-2'>
        {nameComp}
        <p className='text-sm text-slate-500'>{formatBytes(size)}</p>
      </div>
      <p></p>
    </Card>
  );
};
export default function FilesList({ files }: { files: FileList | null }) {
  const filesArray = files && files.length > 0 ? Array.from(files) : [];
  return (
    <>
      {files &&
        files.length > 0 &&
        filesArray.map((file) => <FileItem key={file.name} file={file} />)}
    </>
  );
}
