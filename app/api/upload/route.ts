
import {toast} from 'react-toastify';
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server';
// Relevant imports
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"


// Initialize S3Client instance
const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
} as any)

const POST = async (req: NextRequest) => {
  try {
    // const user = await currentUser()
    // if (!user) return new Response('Unauthorized', { status: 401 })

    const { fileName, fileType } = await req.json()
    if (!fileType || !fileName) {
      throw new Error("There was a problem with the file!")
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

    // PutObjectCommand: used to generate a pre-signed URL for uploading
    const putCommand = new PutObjectCommand({
      Key: fileName,
      ContentType: fileType,
      Bucket: process.env.AWS_BUCKET,
    })
    // Generate pre-signed URL for PUT request
    const putUrl = await getSignedUrl(client, putCommand, { expiresIn: 600 })

    // GetObjectCommand: used to generate a pre-signed URL for viewing.
    const getCommand = new GetObjectCommand({
      Key:fileName,
      Bucket: process.env.AWS_BUCKET,
    })
    // Generate pre-signed URL for GET request
    const getUrl = await getSignedUrl(client, getCommand, { expiresIn: 600 })

    return NextResponse.json({ putUrl, getUrl }, { status: 200 })
  } catch (error) {
    console.log(error)
    throw error
  }
}


// export const handleUpload = async (files:FileList | null) => {
//   if(files){
//      try {
//     let currfile = files[0];
//     // Split the filename to get the name and type
//     let fileParts = currfile.name.split(".");
//     let fileName = fileParts[0];
//     let fileType = fileParts[1];
    
//     const config = {
//       onUploadProgress: progressEvent => console.log(progressEvent.loaded),
//       headers: { "Content-Type": "application/json"}
//     }

//     // Add data to formdata
//     const formdata = new FormData();
//     formdata.append("fileName", fileName);
//     formdata.append("fileType", fileType);
//     const res = await axios.post("/api/upload", formdata, config)
  
//     const { putUrl, getUrl } =  await res.data

//     // Request made to putUrl, media file included in body
//     const uploadResponse = await fetch(putUrl, {
//       body: currfile,
//       method: "PUT",
//       headers: { "Content-Type": currfile.type },
//     })
//     toast.success("You have successfully uploaded your file")
//     return { status: uploadResponse.ok, uploadedUrl: getUrl }
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
//   }
// };

export {
  POST,
}
