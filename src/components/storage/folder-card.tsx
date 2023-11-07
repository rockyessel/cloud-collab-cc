"use client";

import { useState } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { FiMoreHorizontal } from "react-icons/fi";
import { LuFiles } from "react-icons/lu";
import { FolderProps } from "@/interface";
import FolderOptionCard from "./folder-options";

interface Props {
  folder: FolderProps;
}

const FolderCard = ({ folder }: Props) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="rounded-lg border bg-white p-2 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <FcOpenedFolder className="text-3xl" />
          <p className="text-xs">{folder?.name}</p>
        </div>
        <div className="relative">
          <FiMoreHorizontal onClick={() => setDropdownOpen(!isDropdownOpen)} />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white z-10 border rounded-lg shadow-md">
              <FolderOptionCard folder={folder} />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        <p className="w-full text-xs font-normal inline-flex justify-between items-center gap-1">
          <span className="inline-flex items-center px-3 py-1 text-xs w-fit rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
            Total files <LuFiles />
          </span>
          <span>{folder.files.length || 0}</span>
        </p>
      </div>
    </div>
  );
};

export default FolderCard;
