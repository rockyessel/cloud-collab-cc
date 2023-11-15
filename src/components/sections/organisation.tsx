"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@pangeacyber/react-auth";
import OrganisationCard from "../global/organisation-card";
import { InitialOrganizationData, UserProps } from "@/interface";
import { baseURL } from "@/lib/helpers";

const OrganisationSection = () => {
  const { user } = useAuth();
  const currentUser = { ...user } as UserProps;
  const [organisations, setOrganisations] =
    useState<InitialOrganizationData[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/organisation?memberId=${currentUser.active_token.id}`
        );

        if (res.status === 200) {
          setOrganisations(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.active_token.id) getUserData();
    setLoading(false);
  }, [currentUser.active_token.id]);

  return (
    <section className="mt-10">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          "loading"
        ) : organisations?.length === 0 ? (
          <i className="font-normal text-gray-200">
            No Organisation created yet.
          </i>
        ) : (
          organisations?.map((org, index) => (
            <OrganisationCard key={index} org={org} />
          ))
        )}
      </div>
    </section>
  );
};

export default OrganisationSection;
