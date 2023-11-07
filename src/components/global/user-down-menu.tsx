"use client";

import { FcFolder } from "react-icons/fc";
import * as Popover from "@radix-ui/react-popover";
// import Button from "../reusables/button";
import {
  PersonIcon,
  FilePlusIcon,
  LayersIcon,
  GearIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import NextLink from "../reusables/next-link";
import Button from "../reusables/button";
import { useAuth } from "@pangeacyber/react-auth";

const UserDropdownMenu = () => {
  const { logout, user } = useAuth();

  console.log(user);

  const { email, profile } = user;


  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button className="p-2 rounded-lg bg-[#003143]">
          <PersonIcon width="25px" height="25px" className="text-xl txt-col" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="z-[1000] bg-[#003143] txt-col shadow-lg w-[20rem] flex flex-col items-start py-2 rounded-lg mr-3 mt-6 divide-y divide-slate-900 divide-[1px]">
        <div className="px-2 py-2 w-full">
          <div className="w-full rounded-md p-2 inline-flex flex-col gap-2 hover:bg-slate-900">
            <span className="w-full">
              {profile.first_name} {profile.last_name}
              <span className="text-gray-400">(@{email})</span>
            </span>
            <span className="w-full rounded-md border p-2 inline-flex gap-2 items-center">
              <LayersIcon /> No Organisation
            </span>
          </div>
        </div>
        <div className="px-2 py-2 w-full flex flex-col items-start">
          <Button className="w-full inline-flex gap-2 items-center px-2 py-4 rounded-lg hover:bg-slate-900">
            <LayersIcon /> Create Org
          </Button>
          <Button className="w-full inline-flex gap-2 items-center px-2 py-4 rounded-lg hover:bg-slate-900">
            <FcFolder /> Create Folder
          </Button>
          <Button className="w-full inline-flex gap-2 items-center px-2 py-4 rounded-lg hover:bg-slate-900">
            <FilePlusIcon /> Upload file
          </Button>
        </div>
        <div className="px-2 py-2 w-full flex flex-col items-start gap-2">
          <Button className="w-full inline-flex gap-2 items-center px-2 py-4 rounded-lg hover:bg-slate-900">
            <GearIcon /> Settings
          </Button>
          <Button
            onClick={logout}
            className="w-full inline-flex gap-2 items-center px-2 py-4 rounded-lg hover:bg-slate-900"
          >
            <ExitIcon /> Sign Out
          </Button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};

export default UserDropdownMenu;
