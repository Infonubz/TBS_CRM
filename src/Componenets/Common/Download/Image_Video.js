// ExportButton.js

import React from "react";
import { MdDownloadForOffline } from "react-icons/md";

export default function Image_Video({ fileUrl, filename, selectItems }) {
  const downloadFile = (url, filename) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename || "downloaded_file"; // Default filename if none provided
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => console.error("Download error:", err));
  };

  const handleDownload = () => {
    if (selectItems) {
      const url = fileUrl;
      const name = filename;
      downloadFile(url, name);
    } else {
      console.error("No file selected or file URL is invalid.");
    }
  };

  return (
    <MdDownloadForOffline onClick={handleDownload} color="#4283e5" size="2vw" />
  );
}
