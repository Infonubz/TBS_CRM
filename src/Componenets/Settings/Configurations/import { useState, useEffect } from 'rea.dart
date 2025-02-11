import { useState, useEffect } from 'react';

const [body, setBody] = useState();

useEffect(() => {
  if (body) {
    convertBase64ToBinary(body);
  }
}, [body]);

const convertBase64ToBinary = (body) => {
  // Parse the body HTML string to create an HTML document
  const parser = new DOMParser();
  const doc = parser.parseFromString(body, 'text/html');
  
  // Find the first <img> element
  const imgElement = doc.querySelector("img");

  if (imgElement && imgElement.src) {
    // Extract the base64 string from the image source
    const base64String = imgElement.src.split(",")[1];

    if (base64String) {
      // Convert the base64 string to binary data
      const binaryData = new Uint8Array(
        atob(base64String) // Decode the base64 string
          .split("") // Split into individual characters
          .map((char) => char.charCodeAt(0)) // Convert each character to its char code
      );
      
      console.log(binaryData);
      return binaryData;
    } else {
      console.error("No Base64 string found in image source");
    }
  } else {
    console.error("Image element not found or src is empty");
  }
};
