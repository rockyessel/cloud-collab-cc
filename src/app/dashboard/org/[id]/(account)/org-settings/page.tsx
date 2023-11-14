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

  const dataSession = await orgSessionRes.json()

  console.log(dataSession);

  console.log("data", data);
  return (
    <Container className="pt-20 overflow-y-auto">
      <OrgSettings org={data.data} />
    </Container>
  );
};

export default OrgSetting;
