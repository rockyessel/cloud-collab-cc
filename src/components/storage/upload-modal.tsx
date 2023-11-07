"use client";

import { Fragment, SyntheticEvent, useState } from "react";
import { ImUpload } from "react-icons/im";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { BsFileEarmarkPlus, BsFiles } from "react-icons/bs";
import Button from "../reusables/button";
import { UserProps } from "@/interface";
import UploadFileCard from "./upload-file-card";

const UploadModel = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [filesProgressPercentage, setFilesProgressPercentage] = useState(0);
  const [urlValue, setUrlValue] = useState("");

  const handleRemoveFile = (name: string) => {
    const removed_file = files.filter((file) => file.name !== name);
    setFiles(removed_file);
  };


  const currentUser = { } as UserProps;

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

      if (currentUser.id) {
        const data = new FormData();
        files.forEach((file) => {
          data.append(`files`, file);
        });
        data.append("userId", currentUser.id);

        const res = await fetch("http://localhost:3000/api/storages/file", {
          method: "POST",
          body: data,
        });
        console.log("res", res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Modal = ({ isOpen, closeModal, children }: any) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] top-0">
        <div className="bg-white rounded-lg p-4 shadow-lg w-[35rem] z-[100]">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="text-xs">
      <Button
        onClick={openModal}
        className="text-xs font-normal button-outline-small gap-1"
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
          <label className="rounded-sm border-dashed border-2 border-gray-900/20 flex flex-col items-center justify-center p-5">
            {files.length > 0 ? (
              <Fragment>
                {/* <ProgressCircle value={filesProgressPercentage} /> */}
                <p className="font-normal my-2">
                 {` Click "Upload" to import your files.`}
                </p>
                <p className="inline-flex items-center text-xs gap-1">
                  Total files:
                  <span className="inline-flex items-center">
                    {files.length} <BsFiles />
                  </span>
                </p>
              </Fragment>
            ) : (
              <Fragment>
                <ImUpload className="text-3xl" />
                <span className="text-xs">Click to browse</span>
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
              <label className="button-small text-xs !p-1">
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
                className="button-outline-small text-xs !p-1"
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
              className="button-outline-small text-xs"
            >
              Discard
            </Button>
            <Button
              disabled={!files.length}
              type="button"
              title="Import"
              onClick={handleSubmission}
              className={`button-small bg-green-500 ${
                !files.length ? "bg-pink-200 cursor-not-allowed" : ""
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
