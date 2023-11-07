import { FolderProps } from "@/interface";
import FolderCard from "../storage/folder-card";

interface Props {
  folders: FolderProps[];
}

const FolderSection = ({ folders }: Props) => {
  return (
    <div>
      <p className="font medium text-lg">Recently Created Folder</p>
      {folders?.length === 0 ? (
        <p className="ml-4 mt-2 text-xs">No folder created yet.</p>
      ) : (
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-x-4 gap-y-4">
          {folders?.map((folder, index) => (
            <FolderCard key={index} folder={folder} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderSection;
