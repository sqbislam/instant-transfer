import { SiJpeg } from 'react-icons/si';
import { PiFilePngDuotone } from 'react-icons/pi';
import { RiFileGifLine } from 'react-icons/ri';
import { BsFiletypeBmp } from 'react-icons/bs';
import { PiFileSvgDuotone } from 'react-icons/pi';
import { BsFiletypeMp4 } from 'react-icons/bs';
import { FaFileVideo } from 'react-icons/fa';
import { FaFileAudio } from 'react-icons/fa';
import { FaFilePdf } from 'react-icons/fa';
import { FaFileWord } from 'react-icons/fa';
import { SiMicrosoftexcel } from 'react-icons/si';
import { FaFilePowerpoint } from 'react-icons/fa';
import { AiFillFileText } from 'react-icons/ai';
import { FaFileZipper } from 'react-icons/fa6';
import { TbFileTypeXml } from 'react-icons/tb';
import { BsFiletypeJson } from 'react-icons/bs';
import { PiFileCsv } from 'react-icons/pi';
import { ReactNode } from 'react';
export const fileIconTypes: {[key:string]: ReactNode} = {
  'image/jpeg': <SiJpeg className='file-icon' />,
  'image/png': <PiFilePngDuotone className='file-icon' />,
  'image/gif': <RiFileGifLine className='file-icon' />,
  'image/bmp': <BsFiletypeBmp className='file-icon' />,
  'image/svg+xml': <PiFileSvgDuotone className='file-icon' />,
  'video/mp4': <BsFiletypeMp4 className='file-icon' />,
  'video/webm': <FaFileVideo className='file-icon' />,
  'video/ogg': <FaFileVideo className='file-icon' />,
  'audio/mpeg': <FaFileAudio className='file-icon' />,
  'audio/wav': <FaFileAudio className='file-icon' />,
  'audio/ogg': <FaFileAudio className='file-icon' />,
  'application/pdf': <FaFilePdf className='file-icon' />,
  'application/msword': <FaFileWord className='file-icon' />,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': (
    <FaFileWord className='file-icon' />
  ),
  'application/vnd.ms-excel': <SiMicrosoftexcel className='file-icon' />,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': (
    <SiMicrosoftexcel className='file-icon' />
  ),
  'application/vnd.ms-powerpoint': <FaFilePowerpoint className='file-icon' />,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': (
    <FaFilePowerpoint className='file-icon' />
  ),
  'text/plain': <AiFillFileText className='file-icon' />,
  'application/zip': <FaFileZipper className='file-icon' />,
  'application/x-tar': <FaFileZipper className='file-icon' />,
  'application/gzip': <FaFileZipper className='file-icon' />,
  'application/vnd.rar': <FaFileZipper className='file-icon' />,
  'application/xml': <TbFileTypeXml className='file-icon' />,
  'application/json': <BsFiletypeJson className='file-icon' />,
  'text/csv': <PiFileCsv className='file-icon' />,
  'default':<AiFillFileText className='file-icon' />,
};
