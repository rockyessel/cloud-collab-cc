"use client";

import { useEffect, useState } from "react";
import NextImage from "../reusables/next-image";
import NextLink from "../reusables/next-link";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { InitialOrganizationData } from "@/interface";
import { baseURL, cn } from "@/lib/helpers";
import GhostComponents from "./ghost/ghost-components";
import AddMemberGhost from "./ghost/add-member";

interface Props {
  orgId: string | undefined;
}

const Sidebar = ({ orgId }: Props) => {
  const [organisation, setOrganisation] = useState<InitialOrganizationData>();
  const [selectedList, setSelectedList] = useState(`/dashboard/org/${orgId}/`);
  const [loading, setLoading] = useState(true);
  console.log("organisation: ", organisation);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/organisation/${orgId}`);

        if (res.status === 200) {
          setOrganisation(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (orgId) getUserData();
    setLoading(false);
  }, [orgId]);

  return (
    <div
      className={
        "border-r border-[#003143] md:w-[20rem] overflow-y-auto lg:w-[25rem] shrink-0"
      }
    >
      <div className="px-4 hover:bg-bttn-rose cursor-pointer flex justify-between pb-[0.20rem] items-center border-b border-[#003143]">
        <NextLink href="/dashboard" className="flex items-center">
          {organisation?.logo && (
            <NextImage
              src={organisation.logo}
              alt=""
              width={100}
              height={100}
            />
          )}
          <p className="inline-flex flex-col my-0 gap-0 text-gray-300 ml-4">
            <span className="font-medium text-xl">{organisation?.name}</span>
            <span className="text-xs">
              {organisation?.members.length} members
            </span>
          </p>
        </NextLink>
        <ChevronDownIcon className="" />
      </div>

      <div className="space-y-4 h-full mt-5">
        <div className="px-1 md:px-3 py-2 h-full flex flex-col">
          <div className="space-y-undefined1 grow flex flex-col gap-5">
            <div>
              <p className="text-xs font-normal text-gray-400">Overview</p>
              <div
                onClick={() => setSelectedList(`/dashboard/org/${orgId}/`)}
                className="flex flex-col gap-5 mt-2"
              >
                <NextLink
                  className={cn(
                    "text-slate-400 border border-transparent rounded-lg p-4",
                    selectedList === `/dashboard/org/${orgId}/`
                      ? " border-slate-00 bg-[#003143]/20"
                      : ""
                  )}
                  href={`/dashboard/org/${orgId}/`}
                >
                  <span>Dashboard</span>
                </NextLink>
              </div>
            </div>
            <div>
              <p className="text-xs font-normal text-gray-400">
                Scan & Security
              </p>
              <div className="flex flex-col gap-5 mt-2">
                <NextLink
                  onClick={() =>
                    setSelectedList(`/dashboard/org/${orgId}/storage`)
                  }
                  className={cn(
                    "text-slate-400 border border-transparent rounded-lg p-4",
                    selectedList === `/dashboard/org/${orgId}/storage`
                      ? " border-slate-00 bg-[#003143]/20"
                      : ""
                  )}
                  href={`/dashboard/org/${orgId}/storage`}
                >
                  <span>Storage</span>
                </NextLink>
                <NextLink
                  onClick={() =>
                    setSelectedList(`/dashboard/org/${orgId}/vault-keys`)
                  }
                  className={cn(
                    "text-slate-400 border border-transparent rounded-lg p-4",
                    selectedList === `/dashboard/org/${orgId}//vault-keys`
                      ? " border-slate-00 bg-[#003143]/20"
                      : ""
                  )}
                  href={`/dashboard/org/${orgId}/vault-keys`}
                >
                  <span>Vault Keys</span>
                </NextLink>
                <NextLink
                  onClick={() =>
                    setSelectedList(`/dashboard/org/${orgId}/sanitized-files`)
                  }
                  className={cn(
                    "text-slate-400 border border-transparent rounded-lg p-4",
                    selectedList === `/dashboard/org/${orgId}/sanitized-files`
                      ? " border-slate-00 bg-[#003143]/20"
                      : ""
                  )}
                  href={`/dashboard/org/${orgId}/sanitized-files`}
                >
                  <span>Sanitized Files</span>
                </NextLink>
                <NextLink
                  onClick={() =>
                    setSelectedList(`/dashboard/org/${orgId}/unsanitized-files`)
                  }
                  className={cn(
                    "text-slate-400 border border-transparent rounded-lg p-4",
                    selectedList === `/dashboard/org/${orgId}/unsanitized-files`
                      ? " border-slate-00 bg-[#003143]/20"
                      : ""
                  )}
                  href={`/dashboard/org/${orgId}/unsanitized-files`}
                >
                  <span>Unsanitized Files</span>
                </NextLink>
              </div>
            </div>
            <div>
              <p className="text-xs font-normal text-gray-400">Members</p>
              <div className="flex flex-col gap-5 mt-2">
                <NextLink
                  onClick={() =>
                    setSelectedList(`/dashboard/org/${orgId}/user-managements`)
                  }
                  className={cn(
                    "text-slate-400 border border-transparent rounded-lg p-4",
                    selectedList === `/dashboard/org/${orgId}/user-managements`
                      ? " border-slate-00 bg-[#003143]/20"
                      : ""
                  )}
                  href={`/dashboard/org/${orgId}/user-managements`}
                >
                  <span>User managements</span>
                </NextLink>
                <NextLink
                  onClick={() =>
                    setSelectedList(`/dashboard/org/${orgId}/invitation`)
                  }
                  className={cn(
                    "text-slate-400 border border-transparent rounded-lg p-4",
                    selectedList === `/dashboard/org/${orgId}/invitation`
                      ? " border-slate-00 bg-[#003143]/20"
                      : ""
                  )}
                  href={`/dashboard/org/${orgId}/invitation`}
                >
                  <span>Invitation</span>
                </NextLink>
              </div>
            </div>
            <div>
              <p className="text-xs font-normal text-gray-400">Account</p>
              <div className="flex flex-col gap-5 mt-2">
                <NextLink
                  onClick={() =>
                    setSelectedList(`/dashboard/org/${orgId}/org-settings`)
                  }
                  className={cn(
                    "text-slate-400 border border-transparent rounded-lg p-4",
                    selectedList === `/dashboard/org/${orgId}/org-settings`
                      ? " border-slate-00 bg-[#003143]/20"
                      : ""
                  )}
                  href={`/dashboard/org/${orgId}/org-settings`}
                >
                  <span>Org Settings</span>
                </NextLink>
                <NextLink
                  onClick={() => setSelectedList(`/dashboard/org/${orgId}/bin`)}
                  className={cn(
                    "text-slate-400 border border-transparent rounded-lg p-4",
                    selectedList === `/dashboard/org/${orgId}/bin`
                      ? " border-slate-00 bg-[#003143]/20"
                      : ""
                  )}
                  href={`/dashboard/org/${orgId}/bin`}
                >
                  <span>Bin</span>
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GhostComponents orgId={orgId} />
    </div>
  );
};

export default Sidebar;
