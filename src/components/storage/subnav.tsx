import { AiOutlineSearch } from "react-icons/ai";
import CreateFolderBtn from "../actions/create-folder-btn";
import UploadModel from "./upload-modal";

interface Props {
  pageId: string;
}

const StorageSubNav = ({ pageId }: Props) => {
  return (
    <div className="flex items-center justify-between gap-4 text-gray-200">
      <div className="px-4">
        <label className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <AiOutlineSearch className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="input-small pl-10 "
            placeholder="Search here"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <UploadModel pageId={pageId} />
        <CreateFolderBtn orgId={pageId} />
      </div>
    </div>
  );
};

export default StorageSubNav;
