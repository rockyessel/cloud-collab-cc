import { Fragment } from "react";

const HowItWorks = () => {
  return (
    <Fragment>
      <div className="justify-center text-white text-center text-5xl font-bold leading-[50.4px] self-center whitespace-nowrap mt-24 max-md:mt-10">
        How does it work?
      </div>
      <div className="self-center flex w-full max-w-[1026px] items-start justify-between gap-5 mt-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
        <div className="justify-center text-white text-center text-lg leading-8 grow shrink basis-auto self-start">
          Create an account with us.
        </div>
        <div className="justify-center text-white text-center text-lg leading-8 grow shrink basis-auto self-start">
          Then, create or register your organisation, and add members.
        </div>
        <div className="justify-center text-white text-center text-lg leading-8 grow shrink basis-auto self-start">
          {`And you're done. You can upload and share files securely.`}
        </div>
      </div>
    </Fragment>
  );
};

export default HowItWorks;
