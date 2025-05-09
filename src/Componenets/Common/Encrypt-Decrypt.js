import CryptoJS from "crypto-js";

const SECRET_KEY = CryptoJS.enc.Utf8.parse(
  process.env.REACT_APP_SECRET_KEY?.substring(0, 32)
);

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), SECRET_KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};

export const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    console.log(bytes,"bytes");
    let data = CryptoJS.enc.Utf8.stringify(bytes)
    console.log( data, "crypto");
    
    return CryptoJS.enc.Utf8.stringify(bytes);
  } catch (error) {
    console.error("Decryption Error:", error?.message);
    return null;
  }
};
