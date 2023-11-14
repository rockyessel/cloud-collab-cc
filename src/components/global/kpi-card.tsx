
const KpiCard = () => {

  return (
    <div className="border border-[#003143] p-4 rounded-lg shadow-sm text-gray-300">
      <div className="flex flex-col gap-2">
        <span>{`Org's Files`}</span>
        <div>
          <p className="font-bold text-4xl">123,323</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Active Users</p>
          <p>2,567 Users</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Storage Usage</p>
          <p>65% Used</p>
        </div>
        <div>
          <p className="text-lg font-semibold">User Engagement</p>
          <p>79% Weekly Active Users</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Data Traffic</p>
          <p>1.2 TB This Month</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Average Response Time</p>
          <p>256 ms</p>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
