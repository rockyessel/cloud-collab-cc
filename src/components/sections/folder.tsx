import { FolderProps } from "@/interface";
import FolderCard from "../storage/folder-card";

interface Props {
  folders: FolderProps[];
  pageId: string;
}

const FolderSection = ({ folders, pageId }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-gray-300 max-w-3xl">
        <p className="font medium text-3xl">Recently Created Folder</p>
        <span className="mt-2">
          Create, Share, and Control access to the folders below to members.
        </span>
      </div>
      {folders?.length === 0 ? (
        <p className="ml-4 mt-2 text-xs">No folder created yet.</p>
      ) : (
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-x-4 gap-y-4">
          {folders?.map((folder, index) => (
            <FolderCard pageId={pageId} key={index} folder={folder} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderSection;
