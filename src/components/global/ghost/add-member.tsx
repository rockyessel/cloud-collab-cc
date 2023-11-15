"use client";

import { ResObj } from "@/interface";
import { useAuth } from "@pangeacyber/react-auth";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";

const AddMemberGhost = () => {
  const { user } = useAuth();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const addMemberToOrg = async () => {
      const { data } = await axios.post<ResObj>(
        "http://localhost:3000/api/invitation/add",
        { user }
      );
      if (data.success) {
        toast.success(`You'we added successfully.`);
      } else return;
    };
    if (user && loaded) {
      addMemberToOrg();
    }
    setLoaded(true);
  }, [loaded, user]);
  return <Fragment></Fragment>;
};

export default AddMemberGhost;
