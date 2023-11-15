"use client";

import { Fragment, SyntheticEvent, useState } from "react";
import { ImUpload } from "react-icons/im";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { BsFileEarmarkPlus, BsFiles } from "react-icons/bs";
import Button from "../reusables/button";
import { UserProps } from "@/interface";
import UploadFileCard from "./upload-file-card";
import { useAuth } from "@pangeacyber/react-auth";
import { toast } from "sonner";
import DataTraffic from "@/lib/model/dataTraffic.model";
import { baseURL } from "@/lib/helpers";

interface Props {
  pageId?: string;
}

const UploadModel = ({ pageId }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [filesProgressPercentage, setFilesProgressPercentage] = useState(0);
  const [urlValue, setUrlValue] = useState("");

  const { user } = useAuth();

  const currentUser = { ...user } as UserProps;

  const handleRemoveFile = (name: string) => {
    const removed_file = files.filter((file) => file.name !== name);
    setFiles(removed_file);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFile = (event: any) => {
    const file: File[] = event.target.files;
    const arr = [...files, ...file];
    setFiles(Array.prototype.slice.call(arr));
  };

  const handleClear = () => {
    setFiles([]);
  };

  const handleSubmission = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();

      if (currentUser.active_token.id && pageId) {
        const data = new FormData();
        files.forEach((file) => {
          data.append(`files`, file);
        });
        data.append("uploadedBy", currentUser.active_token.id);
        data.append("organizationId", pageId);
        postFiles(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postFiles = async (formData: FormData): Promise<void> => {
    try {
      const response = await fetch(`${baseURL}/api/files/multiples`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
    } catch (error) {
      toast.error("Error ");
      console.error("Error fetching data:", error);
    }
  };

  const Modal = ({ isOpen, closeModal, children }: any) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] top-0">
        <div className="bg-slate-900 rounded-lg p-4 shadow-lg w-[35rem] z-[100]">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-200 hover:text-gray-300"
          >
            Close
          </button>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <Button
        onClick={openModal}
        className=" font-normal button-outline-small gap-1"
      >
        <BsFileEarmarkPlus className="text-lg" />
        <span>Upload File</span>
      </Button>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className="flex flex-col gap-1 mb-4">
          {/* <p className="font-bold">Upload files</p> */}
          {/* <p>Upload any type of files from local machine</p> */}
        </div>

        {urlValue.length > 0 ? null : (
          <label className="rounded-sm border-dashed border-2 border-[#003143] flex flex-col items-center justify-center p-5">
            {files.length > 0 ? (
              <Fragment>
                {/* <ProgressCircle value={filesProgressPercentage} /> */}
                <p className="font-normal my-2">
                  {` Click "Upload" to import your files.`}
                </p>
                <p className="inline-flex items-center  gap-1">
                  Total files:
                  <span className="inline-flex items-center">
                    {files.length} <BsFiles />
                  </span>
                </p>
              </Fragment>
            ) : (
              <Fragment>
                <ImUpload className="text-3xl" />
                <span className="">Click to browse</span>
                <input
                  type="file"
                  name="file"
                  className="w-0 h-0"
                  onChange={handleFile}
                  multiple
                />
              </Fragment>
            )}
          </label>
        )}

        {/* When a file or files is selected. */}
        {files.length > 0 && (
          <Fragment>
            {/* Files Options */}
            <div className="flex justify-end items-center gap-2 my-2">
              <label className="button-small  !p-1">
                Add more
                <input
                  type="file"
                  name="file"
                  className="w-0 h-0"
                  onChange={handleFile}
                  multiple
                />
              </label>
              <Button
                className="button-outline-small  !p-1"
                type="button"
                title="Clear"
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>

            {/* Files Lists */}
            <ul
              className={`flex flex-col gap-1 overflow-auto ${
                files.length > 2 ? "h-[10rem] pb-5" : ""
              }`}
            >
              {files?.map((file, index) => (
                <UploadFileCard
                  handleRemoveFile={handleRemoveFile}
                  key={index}
                  file={file}
                  progress={progress}
                />
              ))}
            </ul>
          </Fragment>
        )}

        {/* Bad Actions */}
        <section className="flex items-center justify-between py-5">
          <div className="flex items-center gap-5">
            <Button
              onClick={closeModal}
              type="button"
              title="Discard"
              className="button-outline-small border border-rose-700 rounded-lg p-3 "
            >
              Discard
            </Button>
            <Button
              disabled={!files.length}
              type="button"
              title="Import"
              onClick={handleSubmission}
              className={`button-small border border-[#12485b] rounded-lg p-3 ${
                !files.length ? "cursor-not-allowed text-[#12485b]" : ""
              }`}
            >
              Upload
            </Button>
          </div>
        </section>
      </Modal>
    </div>
  );
};

export default UploadModel;
