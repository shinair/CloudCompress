# CloudCompress
Cloud Compress - Online Serverless Image Compression Tool on AWS

![image](https://github.com/shinair/CloudCompress/assets/134013894/c5e67760-6528-4937-8828-c9cb995f2dd3)

# How it Works:
1. Open the CloudCompress.html file and upload a JPEG image.
2. When you click the upload button, it triggers a JavaScript function that stores the JPEG image in an AWS S3 bucket.
3. A configured trigger for this bucket then invokes a Lambda function. This Lambda function reads the bucket, retrieves the image, and performs compression using the "sharp" JavaScript library.
4. After successful compression, the Lambda function stores the compressed image in a separate bucket and deletes the originally uploaded image from the source bucket.
5. The compressed image, now available in the new S3 bucket, can be easily downloaded from the CloudCompress HTML page.
6. To maintain storage efficiency, the compressed image is automatically removed from the S3 bucket once the download is complete.

# Prerequisites:

Before using Cloud Compress, ensure the following prerequisites are in place:

1. An active AWS account with access to S3, Cognito, and Lambda services.
2. Proper IAM roles configured for users to access these services and for these services to interact seamlessly.
3. CORS policy configured to allow image uploads and downloads.
4. S3 bucket visibility and security rules adjusted to permit image upload and download operations.
