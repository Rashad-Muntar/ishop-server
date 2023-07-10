const AWS = require("aws-sdk");

AWS.config.update({
  httpOptions: {
    timeout: 60000 // increase the timeout to 60 seconds
  },
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AMAZON_ACCESS_KEY,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS,
});

async function processUpload(upload) {
  try {
    if (!upload) {
      return;
    }

    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    const key = `${Math.random().toString(36).substring(7)}-${filename}`;

    const result = await s3
      .upload({
        Bucket: "ishop-assets",
        Key: key,
        Body: stream,
        ContentType: mimetype,
      })
      .promise();

    return result;
  } catch (error) {
    console.error(error);
    throw new Error(`Error processing file: ${error.message}`);
  }
}

module.exports = processUpload;
