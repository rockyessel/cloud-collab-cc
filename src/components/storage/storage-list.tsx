import { FileProps } from "@/interface";

interface Props {
  files: FileProps[];
}

const StorageFilesList = ({ files }: Props) => {
  return (
    <div>
      <p className="font medium text-lg">All Files</p>

      <div className="flex flex-col mt-2">
        <div className="overflow-x-auto rounded-lg">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <table className="bg-white min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th className="p-4 text-left text-xs font-medium tracking-wider">
                      File name
                    </th>
                    <th className="p-4 text-left text-xs font-medium tracking-wider">
                      Method
                    </th>
                    <th className="p-4 text-left text-xs font-medium tracking-wider">
                      Type
                    </th>
                    <th className="p-4 text-left text-xs font-medium tracking-wider">
                      Sharable
                    </th>
                    <th className="p-4 text-left text-xs font-medium tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {files?.map((file, index) => (
                    <tr key={index}>
                      <td className="p-4 whitespace-nowrap text-xs font-normal text-gray-900">
                        {file.originalFilename}
                      </td>
                      <td className="p-4 whitespace-nowrap text-xs font-normal text-gray-900">
                        Upload through User/Article
                      </td>
                      <td className="p-4 whitespace-nowrap text-xs font-normal text-gray-500">
                        {file.mimeType}
                      </td>
                      <td className="p-4 whitespace-nowrap text-xs font-semibold text-gray-900">
                        {file.isSharable ? <p>Change later</p> : "Just you"}
                      </td>
                      <td className="p-4 whitespace-nowrap text-xs font-semibold text-gray-900">
                        ...
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageFilesList;
