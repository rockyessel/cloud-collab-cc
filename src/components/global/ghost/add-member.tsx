"use client";

import { useAuth } from "@pangeacyber/react-auth";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

const AddMemberGhost = () => {
  const { user } = useAuth();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const addMemberToOrg = async () => {
      const { data } = await axios.post(
        "http://localhost:3000/api/invitation/add",
        { user }
      );
    };

    if (user && loaded) {
      addMemberToOrg();
    }

    setLoaded(true);
  }, [loaded, user]);
  return <Fragment></Fragment>;
};

export default AddMemberGhost;
