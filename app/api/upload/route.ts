import { NextRequest, NextResponse } from 'next/server';

// Relevant imports
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { generateUniqueIdentifier } from '@/lib/utils';
import axios from 'axios';

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

    const fileIdentifier = await generateUniqueIdentifier();

    // PutObjectCommand: used to generate a pre-signed URL for uploading
    const putCommand = new PutObjectCommand({
      Key: fileIdentifier,
      ContentType: fileType,
      Bucket: process.env.AWS_BUCKET,
    });
    // Generate pre-signed URL for PUT request
    const putUrl = await getSignedUrl(client, putCommand, { expiresIn: 600 });

    return NextResponse.json({ putUrl, fileIdentifier }, { status: 200 });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GET = async (req: NextRequest) => {
  try {
    // const user = await currentUser()
    // if (!user) return new Response('Unauthorized', { status: 401 })

    const fileIdentifier = await req.nextUrl.searchParams.get('fileIdentifier');

    // GetObjectCommand: used to generate a pre-signed URL for viewing.
    const getCommand = new GetObjectCommand({
      Key: fileIdentifier as string,
      Bucket: process.env.AWS_BUCKET,
    });

    // Generate pre-signed URL for GET request
    const getUrl = await getSignedUrl(client, getCommand, { expiresIn: 600 });

    return NextResponse.json({ getUrl, fileIdentifier }, { status: 200 });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { POST, GET };
