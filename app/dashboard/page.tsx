import FileDropzone from '@/components/home/file-drop';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

export default function FileDashboard() {
  return (
    <div className='my-5 w-full max-w-xl'>
      <Card className='flex flex-col items-center gap-5 p-5'>
        <CardTitle>Upload your file</CardTitle>
        <CardDescription>Upload your file to get started</CardDescription>
        <CardContent className='w-full'>
          <FileDropzone />
        </CardContent>

        <Button>Upload</Button>
      </Card>
    </div>
  );
}
