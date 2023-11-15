"use client";

import axios from "axios";
import { toast } from "sonner";
import { ResObj } from "@/interface";
import Button from "../reusables/button";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import * as Dialog from "@radix-ui/react-dialog";
import { baseURL } from "@/lib/helpers";

interface Props {
  orgId: string;
}

const InviteBtn = ({ orgId }: Props) => {
  console.log("ID: ", orgId);
  const [isPending, startTransition] = useTransition();
  const [inviteeEmail, setInviteeEmail] = useState("");

  console.log("inviteeEmail: ", inviteeEmail);

  const router = useRouter();

  const handleSendInvite = async () => {
    const loadId = toast.loading("Sending invite...");
    if (orgId && inviteeEmail !== "") {
      const inviteObj = {
        orgId,
        email: inviteeEmail,
      };
      const { data: data } = await axios.post<ResObj>(`${baseURL}/api/invitation`,{ invite: inviteObj }
      );
      startTransition(() => {
        if (data.success) {
          toast.dismiss(loadId);
          toast.success(data.msg);
        }
        router.refresh();
      });

      if (!data.success) {
        toast.error(data.msg);
        console.error(data.msg);
      }
    } else {
      toast.error("Check input again.");
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {isPending ? (
          <Button className="text-xs font-normal button-outline-small gap-1">
            Refreshing
          </Button>
        ) : (
          <Button className="inline-flex items-center gap-1 font-normal button-outline-small">
            <FcOpenedFolder className="text-xl" />
            Invite a member
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/70 fixed inset-0" />
        <Dialog.Content className="border border-rose-600 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-5 rounded-lg shadow-xl">
          <Dialog.Title className="text-gray-200 m-0 text-[17px] font-medium">
            Invitation
          </Dialog.Title>
          <Dialog.Description className="text-gray-300 mt-[10px] mb-5 text-[15px] leading-normal">
            Fill the field below to get your invitation sent.
          </Dialog.Description>
          <form className="flex flex-col gap-4">
            <fieldset className="flex flex-col gap-2">
              <label className="text-gray-300 font-medium">Email</label>
              <input
                type="text"
                title="Name"
                name="name"
                value={inviteeEmail}
                onChange={(e) => setInviteeEmail(e.target.value)}
                placeholder="eg. Pangea"
                className="b-rose dark text-gray-300 outline-none px-4 py-2 rounded-lg"
              />
            </fieldset>

            <Dialog.Close asChild>
              <Button
                type="submit"
                className="text-gray-300 rose p-3 rounded-lg b-rose"
                onClick={handleSendInvite}
              >
                Send
              </Button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default InviteBtn;
