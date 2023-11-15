import SessionList from "@/components/global/session-list";
import Container from "@/components/reusables/container";
import OrgSettings from "@/components/sections/org-settings";

const OrgSetting = async ({ params }: { params: { id: string } }) => {
  const response = await fetch(
    `http://localhost:3000/api/organisation/${params.id}`,
    { next: { revalidate: 0 } }
  );
  const data = await response.json();

  const orgSessionRes = await fetch(
    `http://localhost:3000/api/session?orgId=${params.id}`,
    { next: { revalidate: 0 } }
  );
  const dataSession = await orgSessionRes.json();
  return (
    <Container className="py-20 overflow-y-auto">
      <OrgSettings org={data.data} />
      <SessionList data={dataSession.data} />
    </Container>
  );
};

export default OrgSetting;
