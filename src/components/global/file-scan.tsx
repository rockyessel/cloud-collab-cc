import React, { useState } from "react";
import axios from "axios";

function FileUploadAndScan() {
  const [selectedFile, setSelectedFile] = useState<File | null>();

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  console.log("selectedFile: ", selectedFile);

  const handleFileScan = async () => {
    if (selectedFile) {
      console.log("Checking file...");
    }
    const apiUrl = "/api/files/scan";
    const formData = new FormData();
    formData.append("upload", selectedFile as any);
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        accept=".jpg, .png, .txt"
        onChange={handleFileChange}
      />
      <button onClick={handleFileScan}>Scan File</button>
    </div>
  );
}

export default FileUploadAndScan;
