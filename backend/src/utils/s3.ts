import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function getS3PreSignedUrl(
  key: string,
  fileType: string
): Promise<string> {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Expires: 60 * 60,
    ContentType: fileType,
  };
  const url = await s3.getSignedUrlPromise("putObject", params);
  return url;
}

export async function getS3ObjectStream(fileName: string) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET ?? "",
    Key: fileName,
  };
  const stream = s3.getObject(params).createReadStream();

  return stream;
}

export async function removeS3Object(fileName: string) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET ?? "",
    Key: fileName,
  };
  await s3.deleteObject(params).promise();
}
