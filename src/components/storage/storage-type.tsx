import React from "react";
import StorageTypeCard from "./storage-card";

const StorageTypeSection = () => {
  return (
    <div>
      <p className="font medium text-lg">File Types</p>
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4">
        <StorageTypeCard
          docType="Image"
          limit={1024 * 1024 * 1}
          used={324 * 1024}
        />

        <StorageTypeCard
          docType="Video"
          limit={1024 * 1024 * 1}
          used={324 * 1024}
        />

        <StorageTypeCard
          docType="Audio"
          limit={1024 * 1024 * 1}
          used={324 * 1024}
        />

        <StorageTypeCard
          docType="Document"
          limit={1024 * 1024 * 1}
          used={324 * 1024}
        />
      </div>
    </div>
  );
};

export default StorageTypeSection;
