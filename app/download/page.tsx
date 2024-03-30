import FileDownloadZone from '@/components/download/file-download-zone';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

const DownloadPage = () => {
  return (
    <div className='relative my-5 w-full max-w-xl'>
      <Card className='flex flex-col items-center gap-5 p-5'>
        <CardTitle>Download your file</CardTitle>
        <CardDescription>Input OTP to download your files</CardDescription>
        <CardContent className='w-full'>
          <FileDownloadZone />
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadPage;
