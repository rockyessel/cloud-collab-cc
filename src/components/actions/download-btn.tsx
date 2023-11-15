"use client";

import { FileProps } from "@/interface";
import { downloadFile } from "@/lib/helpers";

interface Props {
  file: FileProps;
}

const DownloadBtn = ({ file }: Props) => {
  return (
    <button onClick={() => downloadFile(file.fileUrl, file.originalFilename)}>
      Download
    </button>
  );
};

export default DownloadBtn;
