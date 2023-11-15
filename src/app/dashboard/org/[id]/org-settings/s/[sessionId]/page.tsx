import Container from "@/components/reusables/container";
import { SessionProps } from "@/interface";
import { baseURL } from "@/lib/helpers";
import { Copy } from "lucide-react";

const UserSessionPage = async ({
  params,
}: {
  params: { sessionId: string };
}) => {
  const response = await fetch(`${baseURL}/api/session/${params.sessionId}`, {
    next: { revalidate: 0 },
  });
  const data: { data: SessionProps } = await response.json();
  console.log(data.data);
  return (
    <Container className="text-teal-600 flex items-center">
      <div>
        <p className="text-xls">
          IP:
          <span className="text-7xl font-black tracking-tighter leading-none inline-flex items-end">
            <span>212.323.32.32</span>
            <span className="ml-2 mb-1">
              <Copy size={28} strokeWidth={2} />
            </span>
          </span>
        </p>

        <div className="b-dark dark rounded-lg p-4 mt-10">
          <p className="text-xl">
            ID: <span className="text-bold">Rocky Essel</span>
          </p>
          <p className="text-xl">
            Name: <span className="text-bold">Rocky Essel</span>
          </p>
          <p className="text-xl">
            Login Time: <span className="text-bold">Rocky Essel</span>
          </p>
          <p className="text-xl">
            Device Information: <span className="text-bold">Rocky Essel</span>
          </p>
          <p className="text-xl">
            Name: <span className="text-bold">Rocky Essel</span>
          </p>
        </div>
      </div>
      <div></div>
    </Container>
  );
};

export default UserSessionPage;
