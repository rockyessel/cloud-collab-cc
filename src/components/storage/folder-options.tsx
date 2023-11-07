import { useEffect, useState } from "react";
import { FolderProps, ResObj, UserProps } from "@/interface";
import NextLink from "../reusables/next-link";
import { FcOpenedFolder } from "react-icons/fc";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import DeleteFolderBtn from "../actions/delete-folder-btn";

interface Props {
  folder: FolderProps;
}

const FolderOptionCard = ({ folder }: Props) => {
  const [isNestedDropdownOpen, setNestedDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchedFolders, setFetchedFolders] = useState<FolderProps[] | []>([]);

  const currentUser = {  } as UserProps;

  useEffect(() => {
    const fetchUserFolders = async (userId: string) => {
      const {
        data: { data: folders },
      } = await axios.get<ResObj>(
        `http://localhost:3000/api/storages/folder?userId=${userId}`
      );

      const filteredFolders = folders.filter(
        (fld: FolderProps) => fld._id !== folder._id
      );
      setFetchedFolders(filteredFolders);
      setLoading(false);
    };
    if (currentUser.id) fetchUserFolders(currentUser.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className="divide-y text-xs divide-gray-300">
      <li className="py-2 px-4 cursor-pointer hover:bg-gray-100">
        <NextLink
          className="w-full"
          href={`dashboard/storage/folders/${folder?._id}`}
        >
          Open
        </NextLink>
      </li>
      <li className="py-2 px-4 cursor-pointer hover:bg-gray-100">Share</li>
      <li
        className="w-full py-2 px-4 cursor-pointer hover:bg-gray-100 inline-flex items-center gap-1"
        onClick={() => setNestedDropdownOpen(!isNestedDropdownOpen)}
      >
        Move to <IoMdArrowDropdown />
      </li>
      {isNestedDropdownOpen && (
        <div className="pl-1">
          <ul className="divide-y divide-gray-300 overflow-y-auto h-40">
            {loading ? (
              <li>Loading</li>
            ) : fetchedFolders.length === 0 ? (
              <li>Create a folder.</li>
            ) : (
              fetchedFolders.map((fetchedFolder, index) => (
                <li
                  key={index}
                  className="w-full py-2 px-4 cursor-pointer hover:bg-gray-100 inline-flex items-center gap-1"
                >
                  <FcOpenedFolder /> {fetchedFolder.name}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
      <li className="py-2 px-4 cursor-pointer hover:bg-gray-100">Copy to</li>
      <DeleteFolderBtn folderId={folder._id} />
    </ul>
  );
};

export default FolderOptionCard;
