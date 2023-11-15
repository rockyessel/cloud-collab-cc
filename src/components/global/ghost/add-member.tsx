"use client";

import { ResObj } from "@/interface";
import { baseURL } from "@/lib/helpers";
import { useAuth } from "@pangeacyber/react-auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";

const AddMemberGhost = () => {
  const { user } = useAuth();
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const addMemberToOrg = async () => {
      const { data } = await axios.post<ResObj>(
        `${baseURL}/api/invitation/add`,
        { user }
      );
      console.log("data", data);
      if (data.success) {
        toast.success(`You'we added successfully.`);
        window.location.reload() // reload the page after adding the user.
      } else return;
    };
    if (user && loaded) {
      addMemberToOrg();
    }
    setLoaded(true);
  }, [loaded, router, user]);
  return <Fragment></Fragment>;
};

export default AddMemberGhost;
