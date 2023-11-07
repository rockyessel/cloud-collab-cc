import React from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { TbPng } from "react-icons/tb";
import Button from "../reusables/button";
import { formatFileSize, truncate } from "@/lib/helpers";
import FileExtensionIcon from "./file-extension-icon";

interface Props {
  handleRemoveFile: (fileId: string) => void;
  file: File;
  progress: number;
}

const UploadFileCard = ({ handleRemoveFile, progress, file }: Props) => {
  const extension = file?.name?.split(".").pop();
  console.log(file);
  return (
    <li className="rounded-lg p-2 border transition ease-in-out delay-150">
      <span className="w-full flex items-end justify-end">
        <Button
          type={`button`}
          title={`Remove ${file?.name}`}
          className="button-outline-small !p-1"
          onClick={() => handleRemoveFile(file?.name)}
        >
          <IoIosRemoveCircleOutline className="text-xl" />
        </Button>
      </span>
      <div className="flex items-center gap-2">
        <div className="border rounded-lg p-1">
          <FileExtensionIcon class="text-2xl" extension={extension} />
        </div>

        <div className=" w-full flex justify-center flex-col">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="font-normal text-xs inline-flex items-center gap-1">
              {truncate(file.name, 25)}
              <span>({formatFileSize(file.size)})</span>
            </span>
            <p className="text-xs font-normal inline-block text-right">
              {progress}%
            </p>
          </div>

          <div className="w-full overflow-hidden flex h-2 mb-4 text-xs rounded bg-black/10">
            <div
              style={{ width: `${progress}%` }}
              className="bg-black rounded-r"
            ></div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default UploadFileCard;
