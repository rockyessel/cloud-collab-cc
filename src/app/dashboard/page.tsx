"use client";

import CreateOrgBtn from "@/components/actions/create-org-btn";
import OrganisationCard from "@/components/global/organisation-card";
import Container from "@/components/reusables/container";
import React from "react";

const MainDashboard = () => {
  const handle = async () => {
    const res = await fetch("http://localhost:3000/api/test1", {
      method: "POST",
      body: "hello world",
    });
    const data = await res.json();

    console.log("Data: ", data);
  };
  return (
    <Container className="px-10 py-5">
      <main className="w-full flex flex-col">
        <section className="w-full mt-4">
          <div className="w-full flex items-center justify-between">
            <p>Create an Organisation</p>

            <CreateOrgBtn />
          </div>
        </section>

        <button
          onClick={async () => await handle()}
          className="bg-white text-black text-xl p-4 rounded-lg"
        >
          get token
        </button>

        <section className="mt-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <OrganisationCard />
            <OrganisationCard />
            <OrganisationCard />
            <OrganisationCard />
            <OrganisationCard />
          </div>

          <i className="font-normal">No Organisation created yet.</i>
        </section>
      </main>
    </Container>
  );
};

export default MainDashboard;
