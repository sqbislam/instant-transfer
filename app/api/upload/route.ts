import { NextRequest, NextResponse } from 'next/server';

// Relevant imports
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { generateUniqueIdentifier } from '@/lib/utils';

// Initialize S3Client instance
const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
} as any);

const POST = async (req: NextRequest) => {
  try {
    // const user = await currentUser()
    // if (!user) return new Response('Unauthorized', { status: 401 })

    const { fileName, fileType } = await req.json();
    if (!fileType || !fileName) {
      throw new Error('There was a problem with the file!');
    }

    // Create a new media entry in database.
    // The uploaded media file will be stored in the S3 bucket
    // with a name (Key) matching the id (PK) of the newMedia/photo.
    // const newMedia = await prisma.photo.create({
    //   data: {
    //     fileSize: fileSize,
    //     fileName: fileName,
    //     mimeType: fileType,
    //     authorId: user.id,
    //     authorName: `${user.firstName} ${user.lastName}`
    //   }
    // })

    // if (!newMedia) { throw new Error("Something went wrong!") }

    const fileIdentifier = await generateUniqueIdentifier();

    // PutObjectCommand: used to generate a pre-signed URL for uploading
    const putCommand = new PutObjectCommand({
      Key: fileIdentifier,
      ContentType: fileType,
      Bucket: process.env.AWS_BUCKET,
    });
    // Generate pre-signed URL for PUT request
    const putUrl = await getSignedUrl(client, putCommand, { expiresIn: 600 });

    // GetObjectCommand: used to generate a pre-signed URL for viewing.
    const getCommand = new GetObjectCommand({
      Key: fileIdentifier,
      Bucket: process.env.AWS_BUCKET,
    });
    // Generate pre-signed URL for GET request
    const getUrl = await getSignedUrl(client, getCommand, { expiresIn: 600 });

    return NextResponse.json(
      { putUrl, getUrl, fileIdentifier },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { POST };
