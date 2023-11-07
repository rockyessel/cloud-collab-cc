"use client";

import { LayersIcon, UploadIcon } from "@radix-ui/react-icons";
import Button from "../reusables/button";
import { initialOrganizationData } from "@/lib/constants";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useState,
  useTransition,
} from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { IdGen } from "@/lib/helpers";

const OrganisationModal = () => {
  const [isPending, startTransition] = useTransition();
  const [orgForm, setOrgForm] = useState(initialOrganizationData);

  const store = IdGen("file");

  console.log("store: ", store);
  const router = useRouter();
  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const file = event!.target!.files[0]!;

    if (file) {
      const formData = new FormData();

      formData.append("file", file);

      const data = fetchFile(formData)
        .then((res) => res)
        .catch((error) => error);
      console.log(data);
    }
  };

  const handleSubmission = (event: SyntheticEvent) => {
    event.preventDefault();
    initialOrganizationData.description = orgForm.description;
    initialOrganizationData.name = orgForm.name;
    initialOrganizationData.owner = "user.id;";
    startTransition(async () => {
      const { data } = await axios.post(
        `http://localhost:3000/api/organisation`,
        { org: initialOrganizationData }
      );
      router.refresh();
      if (data.status) {
        router.push(`/dashboard/org/${data.data.id}/`);
      }
    });
  };

  const fetchFile = async (formData: FormData) => {
    const res = await fetch("http://localhost:3000/api/files", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data;
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
                  <UploadIcon color="#f43f5e" width="30px" height="30px" />
                  <span className="font-bold text-gray-200">Logo</span>
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
