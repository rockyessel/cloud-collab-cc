"use client";

import { ResObj } from "@/interface";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  folderId: string;
  pageId: string;
}

const DeleteFolderBtn = ({ folderId, pageId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleDeletion = async (folderId: string) => {
    const loadId = toast.loading("Deleting folder.");
    const { data: d } = await axios.delete<ResObj>(
      `http://localhost:3000/api/storages/folder?folderId=${folderId}&orgId=${pageId}`
    );
    console.log("deletion: ", d);
    toast.dismiss(loadId);
    if (d.success) {
      toast.success(d.msg);
      startTransition(() => {
        router.refresh();
      });
    } else if (!d.success) {
      toast.error(d.msg);
    }
  };
  return (
    <li
      onClick={() => {
        toast(
          "Are you sure? Every files in this folder will be deleted permanently",
          {
            action: {
              label: "Yes",
              onClick: async () => await handleDeletion(folderId),
            },
          }
        );
      }}
      className="py-2 px-4 cursor-pointer hover-bg-gray-100"
    >
      Delete
    </li>
  );
};

export default DeleteFolderBtn;
