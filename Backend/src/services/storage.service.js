import ImageKit from "imagekit";
 import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadFile = async (file, fileName) => {
  try {
    const result = await imagekit.upload({
      file: file, 
      fileName: fileName,
    });
    return result;
  } catch (err) {
    console.error("ImageKit upload error:", err);
    throw err;
  }
};

export { uploadFile, imagekit };

