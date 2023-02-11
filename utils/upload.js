const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AMAZON_ACCESS_KEY,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS,
});


async function compressImage(file, fileName) {
  // Extract the file extension
  const ext = path.extname(fileName).toLowerCase();

  // Compress the image using Sharp
  let compressedImage;
  switch (ext) {
    case '.jpeg':
    case '.jpg':
      compressedImage = await Sharp(file)
        .jpeg({ quality: 60 })
        .toBuffer();
      break;
    case '.png':
      compressedImage = await Sharp(file)
        .png({ quality: 60 })
        .toBuffer();
      break;
    default:
      throw new Error(`Unsupported image format: ${ext}`);
  }

  return compressedImage;
}

async function processUpload(upload) {
  try {
    if (!upload) {
      return;
    }

    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();

    // Compress the image
    const compressedImage = await compressImage(stream, filename);

    const key = `${Math.random().toString(36).substring(7)}-${filename}`;

    const result = await s3
      .upload({
        Bucket: "ishop-assets",
        Key: key,
        Body: compressedImage,
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
