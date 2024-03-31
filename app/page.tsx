import FileDropzone from '@/components/home/file-drop';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { toast } from 'react-toastify';
import CountdownTimer from './components/shared/countdown-timer';

export default function Home() {
  return (
    <div className='relative my-5 w-full max-w-xl'>
      {/* <CountdownTimer /> */}
      <Card className='flex flex-col items-center gap-5 p-5'>
        <CardTitle>Upload your file</CardTitle>
        <CardDescription>Upload your file to get started</CardDescription>
        <CardContent className='w-full'>
          <FileDropzone />
        </CardContent>
      </Card>
    </div>
  );
}
