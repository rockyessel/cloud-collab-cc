import { SessionProps } from "@/interface";
import moment from "moment";
import NextLink from "../reusables/next-link";

interface Props {
  data: {
    today: SessionProps[];
    previousDays: SessionProps[];
  };
}

const SessionList = ({ data }: Props) => {
  return (
    <section className="mt-10">
      <div className="flex flex-col gap-5">
        <p className="text-teal-600 text-2xl pt-5 font-bold">Sessions</p>

        <div className="flex flex-col">
          <div className="overflow-x-auto rounded-lg">
            <div className="w-full flex flex-col gap-10">
              {/* Today's Session */}
              <div className="align-middle inline-block min-w-full">
                <div className="shadow rounded-lg overflow-hidden sm:rounded-lg">
                  <p className="text-teal-600 text-xl mb-2 font-medium">{`Today's Sessions`}</p>
                  <table className="dark b-dark !rounded-lg min-w-full divide-y divide-[#376576]">
                    <thead className="dark">
                      <tr className="text-gray-300">
                        <th className="p-4 text-left font-medium tracking-wider">
                          Members
                        </th>
                        <th className="p-4 text-left font-medium tracking-wider">
                          Access type
                        </th>
                        <th className="p-4 text-left font-medium tracking-wider">
                          IP Address
                        </th>
                        <th className="p-4 text-left font-medium tracking-wider">
                          Login Time
                        </th>
                        <th className="p-4 text-left font-medium tracking-wider">
                          More details.
                        </th>
                      </tr>
                    </thead>
                    <tbody className="dark b-dark  text-gray-200 divide-y divide-slate-500">
                      {data?.today?.map((session, index) => (
                        <tr key={index} className="hover:bg-slate-900 group">
                          <td className="p-4 whitespace-nowrap font-normal inline-flex items-center gap-1">
                            {session.name}
                          </td>
                          <td className="p-4 whitespace-nowrap font-normal">
                            regular
                          </td>
                          <td className="p-4 whitespace-nowrap font-normal text-gray-500">
                            {session.ipAddress}
                          </td>
                          <td className="p-4 whitespace-nowrap font-semibold">
                            {moment(session.loginTime).format("LT")}
                          </td>
                          <td className="p-4 whitespace-nowrap font-semibold">
                            <NextLink
                              href={`/dashboard/org/${session.orgId}/org-settings/s/${session._id}`}
                            >
                              Details
                            </NextLink>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Previous Days Sessions */}
              <div className="align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden sm:rounded-lg">
                  <p className="text-teal-600 text-xl mb-2 font-medium">{`Previous Days Sessions`}</p>
                  <table className="dark b-dark rounded-lg min-w-full divide-y divide-[#376576]">
                    <thead className="dark">
                      <tr className="text-gray-300">
                        <th className="p-4 text-left font-medium tracking-wider">
                          Members
                        </th>
                        <th className="p-4 text-left font-medium tracking-wider">
                          Access type
                        </th>
                        <th className="p-4 text-left font-medium tracking-wider">
                          IP Address
                        </th>
                        <th className="p-4 text-left font-medium tracking-wider">
                          Login Time
                        </th>
                        <th className="p-4 text-left font-medium tracking-wider">
                          More details.
                        </th>
                      </tr>
                    </thead>
                    <tbody className="dark b-dark  text-gray-200 divide-y divide-slate-500">
                      {data?.previousDays?.map((session, index) => (
                        <tr key={index} className="hover:bg-slate-900 group">
                          <td className="p-4 whitespace-nowrap font-normal inline-flex items-center gap-1">
                            {session.name}
                          </td>
                          <td className="p-4 whitespace-nowrap font-normal">
                            regular
                          </td>
                          <td className="p-4 whitespace-nowrap font-normal text-gray-500">
                            {session.ipAddress}
                          </td>
                          <td className="p-4 whitespace-nowrap font-semibold">
                            {moment(session.loginTime).format("LT")}
                          </td>
                          <td className="p-4 whitespace-nowrap font-semibold">
                            <NextLink
                              href={`/dashboard/org/${session.orgId}/org-settings/s/${session._id}`}
                            >
                              Details
                            </NextLink>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionList;
