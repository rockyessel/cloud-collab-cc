"use client";

import { UserProps } from "@/interface";
import { handleCreateSession } from "@/lib/helpers";
import { useAuth } from "@pangeacyber/react-auth";
import { Fragment, useEffect, useState } from "react";

interface Props {
  orgId?: string;
}

// the idea of using a "Ghost Components" is to make request when i users visit the page.
// Can also be used for tracking by placing it in a navbar or sidebar "Ghost Components"
// is just some i came up with it.
const GhostComponents = ({ orgId }: Props) => {
  const { user } = useAuth() as { user: UserProps };
  const [loaded, setLoaded] = useState(false);

  console.log(user);

  useEffect(() => {
    const userSession = {
      orgId,
      userId: user.active_token.id,
      name: `${user.profile.first_name} ${user.profile.last_name}`,
      location: `${user.profile["Last-Login-City"]}, ${user.profile["Last-Login-Country"]}`,
      loginTime: `${user.profile["Login-Time"]}`,
      deviceInfo: `${user.profile["User-Agent"]}`,
      ipAddress: user.profile["Login-From"],
    };
    console.log("userSession: ", userSession);

    let isRecorded = false;

    const isRecordedRaw = window.localStorage.getItem("isSessionRecorded");
    if (isRecordedRaw) {
      isRecorded = JSON.parse(isRecordedRaw);
    }

    if (orgId && !isRecorded) {
      const isSuccess = handleCreateSession(userSession);
      window.localStorage.setItem("isSessionRecorded", JSON.stringify(true));
    }

    setLoaded(true);
  }, [loaded, orgId, user.active_token.id, user.profile]);

  //   Can house other components here
  return <Fragment></Fragment>;
};

export default GhostComponents;
