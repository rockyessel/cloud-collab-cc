import { formatFileSize } from "@/lib/helpers";
import { BsFillImageFill } from "react-icons/bs";

interface Props {
  docType: string;
  limit: number;
  used: number;
}

const StorageTypeCard: React.FC<Props> = ({ docType, limit, used }) => {
  // Calculate the percentage of storage used
  const percentageUsed = (used / limit) * 100;

  return (
    <div className="border rounded-md p-2 flex flex-col gap-4 bg-white">
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-md bg-blue-100/50 w-fit">
          <BsFillImageFill className="text-xl text-green-500" />
        </div>
        <p className="font-medium text-xs">{docType}</p>
      </div>
      <div className="">
        <div className="w-full overflow-hidden flex h-4 mb-4 text-xs rounded-md bg-gray-300">
          <div
            style={{ width: `${percentageUsed}%` }}
            className="bg-blue-500 rounded-r"
          ></div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="font-normal text-xs">{formatFileSize(used)}</p>
          <p className="font-normal text-xs">{formatFileSize(limit)}</p>
        </div>
      </div>
    </div>
  );
};

export default StorageTypeCard;
