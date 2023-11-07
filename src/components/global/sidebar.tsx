"use client";

import NextImage from "../reusables/next-image";
import NextLink from "../reusables/next-link";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  pathname.replaceAll(`"`, "");
  console.log("pathname: ", pathname);

  return (
    <div
      className={"border-r border-[#A0E34D] md:w-[20rem] lg:w-[25rem] shrink-0"}
    >
      <div className="px-4 hover:bg-bttn-rose cursor-pointer flex justify-between pb-[0.20rem] items-center border-b border-[#A0E34D]">
        <div className="flex items-center">
          <NextImage src="/logo.svg" alt="" width={100} height={100} />
          <p className="inline-flex flex-col my-0 gap-0 text-gray-300">
            <span className="font-medium text-xl">Pangea</span>
            <span className="text-xs">11 members</span>
          </p>
        </div>
        <ChevronDownIcon className="" />
      </div>

      <div className="space-y-4 h-full mt-5">
        <div className="px-1 md:px-3 py-2 h-full flex flex-col">
          <div className="space-y-1 grow flex flex-col gap-5">
            <div>
              <p className="text-xs font-normal text-gray-400">Overview</p>
              <div className="flex flex-col gap-5 mt-2">
                <NextLink
                  className="text-[#A0E34D] border border-[#A0E34D] bg-[#A0E34D]/20 rounded-lg p-4"
                  href={`${pathname}/`}
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
                  className="text-[#A0E34D] border border-[#A0E34D] bg-[#A0E34D]/20 rounded-lg p-4"
                  href={`${pathname}/storage`}
                >
                  <span>Storage</span>
                </NextLink>
                <NextLink
                  className="text-[#A0E34D] border border-[#A0E34D] bg-[#A0E34D]/20 rounded-lg p-4"
                  href={`${pathname}/vault-keys`}
                >
                  <span>Vault Keys</span>
                </NextLink>
                <NextLink
                  className="text-[#A0E34D] border border-[#A0E34D] bg-[#A0E34D]/20 rounded-lg p-4"
                  href={`${pathname}/sanitized-files`}
                >
                  <span>Sanitized Files</span>
                </NextLink>
                <NextLink
                  className="text-[#A0E34D] border border-[#A0E34D] bg-[#A0E34D]/20 rounded-lg p-4"
                  href={`${pathname}/unsanitized-files`}
                >
                  <span>Unsanitized Files</span>
                </NextLink>
              </div>
            </div>
            <div>
              <p className="text-xs font-normal text-gray-400">Members</p>
              <div className="flex flex-col gap-5 mt-2">
                <NextLink
                  className="text-[#A0E34D] border border-[#A0E34D] bg-[#A0E34D]/20 rounded-lg p-4"
                  href={`${pathname}/user-managements`}
                >
                  <span>User managements</span>
                </NextLink>
                <NextLink
                  className="text-[#A0E34D] border border-[#A0E34D] bg-[#A0E34D]/20 rounded-lg p-4"
                  href={`${pathname}/invitation`}
                >
                  <span>Invitation</span>
                </NextLink>
              </div>
            </div>
            <div>
              <p className="text-xs font-normal text-gray-400">Account</p>
              <div className="flex flex-col gap-5 mt-2">
                <NextLink
                  className="text-[#A0E34D] border border-[#A0E34D] bg-[#A0E34D]/20 rounded-lg p-4"
                  href={`${pathname}/org-settings`}
                >
                  <span>Org Settings</span>
                </NextLink>
                <NextLink
                  className="text-[#A0E34D] border border-[#A0E34D] bg-[#A0E34D]/20 rounded-lg p-4"
                  href={`${pathname}/bin`}
                >
                  <span>Bin</span>
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
