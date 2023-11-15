import { FileProps } from "@/interface";
import FileExtensionIcon from "./file-extension-icon";
import TableTd from "../actions/table-td-btn";

interface Props {
  files: FileProps[];
}

const StorageFilesList = ({ files }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-gray-200">
        <p className="font medium text-3xl ">All Files</p>
        <span>View, share, and delete the files.</span>
      </div>

      <div className="flex flex-col mt-2">
        <div className="overflow-x-auto rounded-lg">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <table className="dark b-dark rounded-lg min-w-full divide-y divide-[#376576]">
                <thead className="dark">
                  <tr className="text-gray-300">
                    <th className="p-4 text-left font-medium tracking-wider">
                      File name
                    </th>
                    <th className="p-4 text-left font-medium tracking-wider">
                      Method
                    </th>
                    <th className="p-4 text-left font-medium tracking-wider">
                      Type
                    </th>
                    <th className="p-4 text-left font-medium tracking-wider">
                      Sharable
                    </th>
                    <th className="p-4 text-left font-medium tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="dark b-dark  text-gray-200 divide-y divide-slate-500">
                  {files?.map((file, index) => (
                    <tr key={index} className="hover:bg-slate-900 group">
                      <td className="p-4 whitespace-nowrap font-normal inline-flex items-center gap-1">
                        <span className="border border-[#003143] group-hover:border-[#345865] rounded-lg p-1">
                          <FileExtensionIcon
                            class="text-2xl text-[#345865]"
                            extension={file.extension}
                          />
                        </span>
                        {file.originalFilename}
                      </td>
                      <td className="p-4 whitespace-nowrap font-normal">
                        Upload through User/Article
                      </td>
                      <td className="p-4 whitespace-nowrap font-normal text-gray-500">
                        {file.mimeType}
                      </td>
                      <td className="p-4 whitespace-nowrap font-semibold">
                        {file.isSharable ? <p>Change later</p> : "Just you"}
                      </td>
                      <td className="p-4 whitespace-nowrap font-semibold">
                        <TableTd file={file} />
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
