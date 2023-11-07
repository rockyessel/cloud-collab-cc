"use client";

import { ResObj, UserProps } from "@/interface";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Fragment, useState, useTransition } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { toast } from "sonner";
import Button from "../reusables/button";

const CreateFolderBtn = () => {
  const [isPending, startTransition] = useTransition();
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [folderName, setFolderName] = useState("");

  const router = useRouter();

  const currentUser = {} as UserProps;

  const createFolder = async () => {
    const loadId = toast.loading("Creating folder.");
    if (currentUser.id && folderName !== "") {
      const { data: data } = await axios.post<ResObj>(
        "http://localhost:3000/api/storages/folder",
        {
          userId: currentUser.id,
          name: folderName,
        }
      );
      startTransition(() => {
        if (data.success) {
          toast.dismiss(loadId);
          toast.success(data.msg);
        }
        router.refresh();
      });

      if (!data.success) {
        toast.error(data.msg);
        console.error(data.msg);
      }
    }
    console.log("Creating folder:", folderName);
    setIsCreatingFolder(false);
  };

  return (
    <div>
      {isCreatingFolder ? (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="input-small"
          />
          {isPending ? (
            <Button className="text-xs font-normal button-outline-small gap-1">
              Refreshing
            </Button>
          ) : (
            <Fragment>
              <Button
                onClick={createFolder}
                className="text-xs font-normal button-small bg-green-400 text-white"
              >
                Create
              </Button>
              <Button
                onClick={() => setIsCreatingFolder(false)}
                className="text-xs font-normal button-small bg-red-400 text-white"
              >
                Cancel
              </Button>
            </Fragment>
          )}
        </div>
      ) : isPending ? (
        <Button className="text-xs font-normal button-outline-small gap-1">
          Refreshing
        </Button>
      ) : (
        <Button
          className="text-xs font-normal button-outline-small gap-1"
          onClick={() => setIsCreatingFolder(true)}
        >
          <FcOpenedFolder className="text-xl" />
          Create Folder
        </Button>
      )}
    </div>
  );
};

export default CreateFolderBtn;
