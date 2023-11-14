import InviteBtn from "@/components/actions/invite-btn";
import Container from "@/components/reusables/container";

const MemberInvitation = ({ params }: { params: { id: string } }) => {
  return (
    <Container>
      <div>
        <InviteBtn orgId={params.id} />
      </div>
      <p>Pending Invite</p>
      <p>Accepted Invite</p>
      <p>List of invited users</p>
    </Container>
  );
};

export default MemberInvitation;
