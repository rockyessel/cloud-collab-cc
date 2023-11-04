"use client";

import FileUploadAndScan from "@/components/global/file-scan";
import React, { useEffect, useState } from "react";

function FileHashVerification() {
  const [hashResult, setHashResult] = useState("");

  async function calculateHash(event: any) {
    const file = event.target.files[0];

    if (file) {
      const hash = await calculateHashFromFile(file);
      setHashResult(hash as string);
    } else {
      setHashResult("Please select a file first.");
    }
  }

  console.log(hashResult);

  useEffect(() => {
    const fetchFileReputation = async (hash: string) => {
      try {
        const res = await fetch("/api/files/reputation", {
          method: "POST",
          body: hash,
        });

        const data = await res.json();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (hashResult !== "") {
      fetchFileReputation(hashResult);
    }
  }, [hashResult]);

  async function calculateHashFromFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const fileData = new Uint8Array(event?.target?.result);
        crypto.subtle.digest("SHA-256", fileData).then((hashBuffer) => {
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
          resolve(hashHex);
        });
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        accept=".jpg, .png, .txt"
        onChange={calculateHash}
      />
      <div id="hashResult">{hashResult}</div>

      <hr />
      <br />

      <FileUploadAndScan />
    </div>
  );
}

export default FileHashVerification;
