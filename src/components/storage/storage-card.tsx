
import React from "react";
import { BsFillImageFill } from "react-icons/bs";

const StorageTypeCard = () => {
  return (
    <div className="border rounded-md p-2 flex flex-col gap-4 bg-white">
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-md bg-blue-100/50 w-fit">
          <BsFillImageFill className="text-xl text-green-500" />
        </div>
        <p className="font-medium text-xs">Image</p>
      </div>
      <div className="">
        {/* <ProgressBar value={10} /> */}
        <div className="flex items-center justify-between mt-1">
          <p className="font-normal text-xs">324 MB</p>
          <p className="font-normal text-xs">1 GB</p>
        </div>
      </div>
    </div>
  );
};

export default StorageTypeCard;
