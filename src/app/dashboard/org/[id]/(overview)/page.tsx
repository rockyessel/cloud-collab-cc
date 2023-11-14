import KpiCard from "@/components/global/kpi-card";

const OrganisationOverviewPage = () => {
  return (
    <div className="p-5 flex flex-col gap-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <KpiCard />
        <KpiCard />
        <KpiCard />
        <KpiCard />
      </div>

      <div className="border rounded-lg p-5">{/* Analytics */}</div>










      
    </div>
  );
};

export default OrganisationOverviewPage;
