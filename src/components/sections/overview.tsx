import { Fragment } from "react";

const OverviewSection = () => {
  return (
    <Fragment>
      <div className="self-stretch flex flex-col pt-16 rounded-2xl max-md:max-w-full">
        <div className="justify-center text-rose-500 text-center text-5xl font-bold leading-[50.4px] self-center whitespace-nowrap max-md:max-w-full">
          <span className="text-white">Organizational Insight </span>
          <span className="text-rose-500">Tool And Security.</span>
        </div>
        <div className="justify-center text-white text-center text-lg leading-8 self-center whitespace-nowrap mt-4 max-md:max-w-full">
          Gain Full Control and Security Over Your Files and Sharing
        </div>
      </div>
      <div className="self-stretch mt-24 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-2/5 max-md:w-full max-md:ml-0">
            <div className="flex flex-col my-auto max-md:max-w-full max-md:mt-10">
              <div className="justify-center text-rose-500 text-5xl font-bold leading-[50.4px] self-stretch max-md:max-w-full">
                <span className="text-white">Effortless Organization:</span>
                <span className="text-rose-500">Creation</span>
              </div>
              <div className="justify-center text-white text-lg leading-8 self-stretch mt-7 max-md:max-w-full">
                CloudCollab simplifies the process of organizing your team or
                department by allowing you to create and manage organizations
                effortlessly. Within these organizations, you can manage team
                members with ease, assigning specific roles and permissions, and
                effortlessly onboarding new employees or collaborators.
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-3/5 ml-5 max-md:w-full max-md:ml-0">
            {/* className="aspect-[0.94] object-contain object-center w-full overflow-hidden grow max-md:max-w-full max-md:mt-10" */}
          </div>
        </div>
      </div>
      <div className="self-stretch mt-24 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[57%] max-md:w-full max-md:ml-0">
            {/* className="aspect-[1.09] object-contain object-center w-full overflow-hidden grow max-md:max-w-full max-md:mt-10" */}
          </div>
          <div className="flex flex-col items-stretch w-[43%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex flex-col my-auto max-md:max-w-full max-md:mt-10">
              <div className="justify-center text-white text-5xl font-bold leading-[50.4px] self-stretch max-md:max-w-full">
                <span className="text-rose-500">Secure </span>
                <span className="text-white">File Storage</span>
              </div>
              <div className="justify-center text-white text-lg leading-8 self-stretch mt-7 max-md:max-w-full">
                Our platform provides a secure and reliable space for uploading
                and storing various file types, including documents, images,
                videos, and more. Automatic data redundancy and backups are
                implemented to ensure data integrity, enabling access to your
                files from anywhere, at any time.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch mt-24 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[48%] max-md:w-full max-md:ml-0">
            <div className="flex flex-col my-auto max-md:max-w-full max-md:mt-10">
              <div className="justify-center text-rose-500 text-5xl font-bold leading-[50.4px] self-stretch max-md:max-w-full">
                <span className="text-white">Granular </span>
                <span className="text-rose-500">Access Control:</span>
              </div>
              <div className="justify-center text-white text-lg leading-8 self-stretch mt-7 max-md:max-w-full">
                Access control is a priority with CloudCollab. You can define
                granular permissions to protect your data, allowing you to
                control who can view, edit, or share specific files and folders.
                This ensures that sensitive data remains securely in the right
                hands.
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[52%] ml-5 max-md:w-full max-md:ml-0">
            {/* className="aspect-[1.17] object-contain object-center w-full overflow-hidden grow max-md:max-w-full max-md:mt-10" */}
          </div>
        </div>
      </div>
      <div className="self-stretch mt-24 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[57%] max-md:w-full max-md:ml-0">
            {/* className="aspect-[1.09] object-contain object-center w-full overflow-hidden grow max-md:max-w-full max-md:mt-10" */}
          </div>
          <div className="flex flex-col items-stretch w-[43%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex flex-col my-auto max-md:max-w-full max-md:mt-10">
              <div className="justify-center text-white text-5xl font-bold leading-[50.4px] self-stretch max-md:max-w-full">
                <span className="text-rose-500">Robust </span>
                <span className="text-white">Data Security:</span>
              </div>
              <div className="justify-center text-white text-lg leading-8 self-stretch mt-7 max-md:max-w-full">
                We prioritize your data security. With industry-standard
                encryption protocols, your data is continuously protected.
                Monitored and powered by Pangae, our platform safeguards your
                data with ongoing monitoring and regular security updates.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OverviewSection;
