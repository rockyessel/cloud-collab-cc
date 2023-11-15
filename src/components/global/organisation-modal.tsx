"use client";

import axios from "axios";
import Button from "../reusables/button";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { useAuth } from "@pangeacyber/react-auth";
import { initialOrganizationData } from "@/lib/constants";
import { LayersIcon, UploadIcon } from "@radix-ui/react-icons";
import {
  ChangeEvent,
  Fragment,
  SyntheticEvent,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";
import NextImage from "../reusables/next-image";
import { FileProps, UserProps } from "@/interface";
import { baseURL } from "@/lib/helpers";

const OrganisationModal = () => {
  const [isPending, startTransition] = useTransition();
  const [orgForm, setOrgForm] = useState(initialOrganizationData);
  const [orgFile, setOrgFile] = useState<FileProps>();
  const { user } = useAuth();

  const router = useRouter();
  const currentUser = { ...user } as UserProps;

  console.log("currentUser: ", currentUser);
  console.log("orgFile: ", orgFile);

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

  const handleSubmission = (event: SyntheticEvent) => {
    toast.loading("Creating...");
    event.preventDefault();

    if (!orgFile) {
      toast.error("Still generating image link.");
      return;
    }

    initialOrganizationData.description = orgForm.description;
    initialOrganizationData.name = orgForm.name;
    initialOrganizationData.owner = currentUser.active_token.id;
    initialOrganizationData.logo = `${baseURL}/api/temp/files/${orgFile?.proxyURL}`;

    if (initialOrganizationData.members.includes(currentUser.active_token.id))
      return;
    else initialOrganizationData.members.push(`${currentUser.active_token.id}`);

    if (!initialOrganizationData.owner) toast.error("User ID not provided.");
    else if (!initialOrganizationData.name) toast.error("Name required.");
    else if (!initialOrganizationData.description) toast.error("Description .");
    else if (!initialOrganizationData.logo)
      toast.error("Please upload a logo.");

    startTransition(async () => {
      const { data } = await axios.post(`${baseURL}/api/organisation`, {
        org: initialOrganizationData,
      });
      router.refresh();
      if (data.success) {
        toast.success("Created.");
        const file = { ...orgFile };
        await axios.put(
          `${baseURL}/api/files?orgId=${data.data._id}&uploadedBy=${currentUser.active_token.id}`,
          { file }
        );
      }
    });
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

  const handleFormInput = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { target } = event;
    try {
      setOrgForm((preValues) => ({
        ...preValues,
        [target.name]: target.value,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {isPending ? (
          <p>Loading...</p>
        ) : (
          <Button className="w-24 bg-gray-100 inline-flex gap-2 items-center px-2 py-2 rounded-lg hover:bg-white">
            <LayersIcon /> Create
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/70 fixed inset-0" />
        <Dialog.Content className="border border-rose-600 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-5 rounded-lg shadow-xl">
          <Dialog.Title className="text-gray-200 m-0 text-[17px] font-medium">
            Create Organisation
          </Dialog.Title>
          <Dialog.Description className="text-gray-300 mt-[10px] mb-5 text-[15px] leading-normal">
            Fill the field below to get started.
          </Dialog.Description>
          <form className="flex flex-col gap-4">
            <fieldset className="flex flex-col gap-2">
              <label className="text-gray-300 font-medium">
                Organisation Logo
              </label>
              <fieldset className="flex items-start gap-4">
                <div className="bttn bttn-rose w-[10rem] h-[10rem] flex flex-col gap-2">
                  {orgFile ? (
                    <NextImage
                      width={200}
                      height={200}
                      alt=""
                      src={`${baseURL}/api/temp/files/${orgFile?.proxyURL}`}
                      className="object-cover object-center w-full h-full"
                    />
                  ) : (
                    <Fragment>
                      <UploadIcon color="#f43f5e" width="30px" height="30px" />
                      <span className="font-bold text-gray-200">Logo</span>
                    </Fragment>
                  )}
                </div>
                <div>
                  <label className="bttn bttn-rose w-40 p-2 rounded-lg">
                    <span className="font-medium text-gray-200">Upload</span>
                    <input
                      type="file"
                      accept=".jpg, .png, .txt"
                      onChange={handleFile}
                      className="h-0 w-0"
                    />
                  </label>
                  <span className="text-xs text-gray-400">
                    Upload a picture from your computer.
                  </span>
                </div>
              </fieldset>
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label className="text-gray-300 font-medium">
                Organisation Name
              </label>
              <input
                type="text"
                onChange={handleFormInput}
                title="Name"
                name="name"
                placeholder="eg. Pangea"
                className="b-rose dark text-gray-300 outline-none px-4 py-2 rounded-lg"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label className="text-gray-300 font-medium">
                Organisation Description
              </label>
              <textarea
                onChange={handleFormInput}
                className="b-rose dark text-gray-300 outline-none px-4 py-2 rounded-lg h-32"
                name="description"
                title="Description"
                placeholder="Pangae is a SaaS that offers..."
              />
            </fieldset>

            <Dialog.Close asChild>
              <Button
                onClick={handleSubmission}
                type="submit"
                className="text-gray-300 rose p-3 rounded-lg b-rose"
                // disabled={}
              >
                Create
              </Button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default OrganisationModal;
