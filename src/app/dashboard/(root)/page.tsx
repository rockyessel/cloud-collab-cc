import Container from "@/components/reusables/container";
import CreateOrgBtn from "@/components/actions/create-org-btn";
import AddMemberGhost from "@/components/global/ghost/add-member";
import OrganisationSection from "@/components/sections/organisation";

const MainDashboard = () => {
  return (
    <Container className="">
      <main className="w-full flex flex-col">
        <section className="w-full mt-4">
          <div className="w-full flex items-center justify-between">
            <p className="font-semibold text-gray-300 text-xl">
              Organisation Lists
            </p>
            <CreateOrgBtn />
          </div>
        </section>
        <OrganisationSection />
      </main>
      <AddMemberGhost />
    </Container>
  );
};

export default MainDashboard;
