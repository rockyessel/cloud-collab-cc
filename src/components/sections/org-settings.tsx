"use client";

import { FileProps, InitialOrganizationData } from "@/interface";
import { FileEdit, SaveAll } from "lucide-react";
import { ChangeEvent, Fragment, useState, useTransition } from "react";
import NextImage from "../reusables/next-image";
import { baseURL, cn } from "@/lib/helpers";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  org: InitialOrganizationData;
}

const OrgSettings = ({ org }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [orgForm, setOrgForm] = useState<InitialOrganizationData>(org);
  const [isPending, startTransition] = useTransition();
  const [orgFile, setOrgFile] = useState<FileProps>();

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (target.files) {
      const { files } = target;
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);
      fetchFile(formData)
        .then((res) => res)
        .catch((error) => console.error(error));
    }
  };

  const fetchFile = async (formData: FormData): Promise<void> => {
    try {
      const response = await fetch(`${baseURL}/api/files`, {
        method: "POST",
        body: formData,
      });
      if (!response.body) throw new Error("Response body is undefined");
      const reader = response.body.getReader();
      let chunks: string = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const message: string = new TextDecoder().decode(value);
        console.log(message);
        try {
          const parsedData = JSON.parse(message);
          if (parsedData.message) {
            // Display the toast
            toast.promise(
              new Promise((resolve) => {
                if (parsedData.success) resolve(parsedData.message);
              }),
              {
                loading: `${parsedData.message}`,
                success: () => {
                  return `${
                    parsedData.message as { message: string | number }
                  } toast has been added`;
                },
                error: "Error",
              }
            );

            // If the message contains 'File generated', display a success toast
            if (
              parsedData.success &&
              parsedData.message === "File link generated"
            ) {
              toast.success("File generated successfully");
              toast.dismiss();
            }
          }
          if (parsedData.data) {
            // Set file data for further display
            setOrgFile(parsedData.data);
            // Handle JSON data as needed
            console.log("Parsed Data:", parsedData.data);
          }
        } catch (error) {
          console.error("Error parsing JSON content:", error);
        }
        chunks += message;
        if (chunks.includes("File generated")) {
          // Reset chunks after 'File generated'
          chunks = "";
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const router = useRouter();
  console.log("orgForm", orgForm);

  const handleUpdateOrgData = async () => {
    toast.loading("Updating...");
    const changes =
      orgForm.name !== org.name || orgForm.description !== org.description;
    if (!changes) {
      toast.info("No changes made.");
      return;
    }

    if (orgForm.name === "") {
      toast.error("Please provide a name.");
      return;
    }
    try {
      const { data } = await axios.put(`${baseURL}/api/organisation`, {
        org: orgForm,
      });
      startTransition(() => {
        if (data) toast.success("Organization data updated successfully.");
        router.refresh();
        setEditMode((preState) => !preState);
      });
    } catch (error) {
      toast.error("Error updating organization data.");
      return;
    }
  };

  const handleSave = () => {
    handleUpdateOrgData();
  };

  const handleFormInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { target } = event;

    setOrgForm((initState) => ({
      ...initState,
      [target.name]: target.value,
    }));
  };

  return (
    <Fragment>
      <p className="text-teal-600 text-2xl font-bold">Org Profile</p>
      <section>
        <div
          className={cn(
            "w-full flex items-center gap-2 justify-between",
            !editMode ? "justify-between" : ""
          )}
        >
          <NextImage
            className="b-dark rounded-full object-cover object-center w-32 h-32"
            width={100}
            height={100}
            src={org.logo}
            alt={org.name}
          />
          <div className="w-full flex items-center gap-3.5">
            {editMode && (
              <label className="dark b-dark p-4 font-bold rounded-lg text-teal-600">
                Upload
                <input type="file" onChange={handleFile} className="w-0 h-0" />
              </label>
            )}
            {!editMode ? (
              <button
                onClick={() => setEditMode((preState) => !preState)}
                className="dark b-dark p-4 font-bold rounded-lg text-teal-600"
              >
                <FileEdit
                  className="text-teal-400"
                  size={26}
                  strokeWidth={0.5}
                />
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="dark b-dark p-4 font-bold rounded-lg text-teal-600"
              >
                {isPending ? (
                  <p>Applying changes</p>
                ) : (
                  <SaveAll
                    className="text-teal-400"
                    size={26}
                    strokeWidth={0.5}
                  />
                )}
              </button>
            )}
          </div>
        </div>

        <div>
          <p>
            <span className="text-gray-300 text-base font-medium%]">Name</span>
            <span className="text-rose-500 text-sm font-medium">*</span>
          </p>
          {editMode ? (
            <fieldset className="flex flex-col">
              <fieldset className="items-stretch flex w-14 max-w-full gap-1"></fieldset>
              <input
                type="text"
                title="Name"
                name="name"
                onChange={handleFormInput}
                value={orgForm?.name}
                placeholder="eg. Pangea"
                className="b-dark text-teal-600 dark outline-none px-4 py-4 rounded-lg"
              />
            </fieldset>
          ) : (
            <p className="b-dark p-3 rounded-lg text-teal-500 text-lg font-bold my-4">
              {org.name}
            </p>
          )}
        </div>

        <div>
          <p>
            <span className="text-gray-300 text-base font-medium%]">
              Description
            </span>
            <span className="text-rose-500 text-sm font-medium">*</span>
          </p>
          {editMode ? (
            <fieldset className="flex flex-col">
              <fieldset className="items-stretch flex w-14 max-w-full gap-1"></fieldset>
              <input
                type="text"
                title="Description"
                name="description"
                onChange={handleFormInput}
                value={orgForm?.description}
                placeholder="Our motto is..."
                className="b-dark text-teal-600 dark outline-none px-4 py-4 rounded-lg"
              />
            </fieldset>
          ) : (
            <p className="b-dark p-3 rounded-lg text-teal-500 text-lg font-bold my-4">
              {org.description}
            </p>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default OrgSettings;
