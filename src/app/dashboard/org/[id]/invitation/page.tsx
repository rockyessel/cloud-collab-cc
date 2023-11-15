import InviteBtn from "@/components/actions/invite-btn";
import Container from "@/components/reusables/container";

const MemberInvitation = ({ params }: { params: { id: string } }) => {
  return (
    <Container className="text-teal-600">
      <div>
        <InviteBtn orgId={params.id} />
      </div>
      <div>Pending Invite</div>
      <p>Accepted Invite</p>
      <p>List of invited users</p>
    </Container>
  );
};

export default MemberInvitation;
