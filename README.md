# CloudCompress
Cloud Compress is an online serverless image compression tool built using AWS.

![image](https://github.com/shinair/CloudCompress/assets/134013894/c5e67760-6528-4937-8828-c9cb995f2dd3)

How it works:
1. Open CloudCompress.html. Upload a jpeg image.
2. Clicking on the upload button calls a JavaScript function which stores the jpeg image in the S3 bucket.
3. A trigger is configured for this bucket which then calls a lambda function. This function reads the bucket, fetches the image and compresses it.
4. The lambda function uses a JavaScript library called "sharp" for image compression.
5. Once the image has been compressed, the lambda function stores this image in a different bucket. It also deletes the original uploaded image from the source bucket on successful image compression. 
6. Once the compressed image has been stored in the new S3 bucket, it can be downloaded from the CloudCompress html page.
7. The compressed image is deleted from the S3 bucket after download completes.

Prerequisites: 
1. An active AWS account with access to S3, Cognito and Lambda services.
2. IAM rules configured for the users to access these services and for these services to interact with each other.
3. CORS policy configured to allow image upload/download.
4. S3 bucket visibility/security rules to allow image upload and download. 
