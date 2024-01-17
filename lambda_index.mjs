import AWS from "aws-sdk";
import sharp from "sharp";

// Set the S3 instance and destination bucket
const s3 = new AWS.S3();
const DESTINATION_BUCKET = "destination_s2_bucket_name";

export const handler = async (event) => {
  const srcBucket = event.Records[0].s3.bucket.name;
  console.log(srcBucket);
  const srcKey = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  console.log(srcKey);

  const fileExtension = srcKey.split(".").pop().toLowerCase();

  try {
    const image = await s3
      .getObject({ Bucket: srcBucket, Key: srcKey })
      .promise();

    let compressedImage;
    if (fileExtension === "jpg" || fileExtension === "jpeg") {
      compressedImage = await sharp(image.Body)
        .jpeg({ quality: 80 })
        .toBuffer();
    } else if (fileExtension === "png") {
      compressedImage = await sharp(image.Body)
        .png({ compressionLevel: 6 })
        .toBuffer();
    } else {
      throw new Error(`Unsupported file format: ${fileExtension}`);
    }

    const destParams = {
      Bucket: DESTINATION_BUCKET,
      Key: `${srcKey.split(".")[0]}.${fileExtension}`,
      Body: compressedImage,
      ContentType: fileExtension === "png" ? "image/png" : "image/jpeg",
    };

    console.log(
      `Uploading compressed image to destination bucket: ${DESTINATION_BUCKET}`
    );
    await s3.putObject(destParams).promise();
    console.log(`Image compressed and uploaded successfully: ${srcKey}`);

    // Delete the original image from the source bucket
    const deleteParams = {
      Bucket: srcBucket,
      Key: srcKey,
    };

    await s3.deleteObject(deleteParams).promise();
    console.log(`Original image deleted from source bucket: ${srcKey}`);

    return {
      statusCode: 200,
      body: JSON.stringify(
        "Image compressed, uploaded, and original deleted successfully"
      ),
    };
  } catch (error) {
    console.error(`Error compressing, uploading, and deleting image: ${error}`);
    return {
      statusCode: 500,
      body: JSON.stringify("Error compressing, uploading, and deleting image"),
    };
  }
};
