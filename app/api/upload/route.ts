import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
import aws from 'aws-sdk';
import { ChangeEvent } from 'react';
import toast from 'react-toastify';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  // Update AWS configuration with the provided credentials
  aws.config.update({
    region: 'eu-west-2',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  });

  const s3Bucket = process.env.AWS_BUCKET;

  // Create a new instance of S3
  const s3 = new aws.S3();
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;

  const s3Params = {
    Bucket: s3Bucket,
    Key: `businesslogos/${fileName}`,
    ContentType: fileType,
    ACL: 'public-read',
  };

  //   try {
  //     // Get a signed URL from S3 for uploading an object
  //     s3.getSignedUrl("putObject", s3Params, async (err, data) => {
  //       if (err) {
  //         return res.json({ success: false, error: err });
  //       }
  //       const returnData = {
  //         signedRequest: data,
  //         url: `https://${s3Bucket}.s3.amazonaws.com/businesslogos/${fileName}`,
  //       };
  //       const imageUrl = await prisma.user.update({
  //         where: {
  //           email: session.user.email,
  //         },
  //         data: {
  //           business: {
  //             update: {
  //               businessLogo: returnData.url,
  //             },
  //           },
  //         },
  //       });

  //       return res.status(200).json(returnData);
  //     });
  //   } catch (err) {
  //     return res.status(500).json(err);
  //   }
}

// const handleUpload = (ev: ChangeEvent<HTMLButtonElement>) => {
//   let file = uploadInput.current.files[0];
//   // Split the filename to get the name and type
//   let fileParts = uploadInput.current.files[0].name.split(".");
//   let fileName = fileParts[0];
//   let fileType = fileParts[1];
//   axios
//     .post("/api/awsimageupload", {
//       fileName: fileName,
//       fileType: fileType,
//     })
//     .then((res) => {
//       const signedRequest = res.data.signedRequest;
//       const url = res.data.url;
//       setUploadState({
//         ...uploadState,
//         url,
//       });

//       var options = {
//         headers: {
//           "Content-Type": fileType,
//         },
//       };
//       axios
//         .put(signedRequest, file, options)
//         .then((_) => {
//           setUploadState({ ...uploadState, success: true });
//           mutate();
//         })
//         .catch((_) => {
//           toast("error", "We could not upload your image");
//         });
//     })
//     .catch((error) => {
//       toast("error", "We could not upload your image");
//     });
// };
