import {ImageKit} from '@imagekit/nodejs';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});


const uploadFile = async (fileBuffer, fileName) => {
  try {
    const result = await imagekit.upload({
      file: fileBuffer,
      fileName: fileName 
    });
    return result;
  } catch (err) {
    console.error("ImageKit upload error:", err);
    throw err;
  }
};

export { uploadFile, imagekit };
