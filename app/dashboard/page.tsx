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

export default function FileDashboard() {
  return (
    <div className='relative my-5 w-full max-w-xl'>
      <Button className='absolute right-0 top-0'>
        <Link href='/download'>Download File</Link>
      </Button>
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
