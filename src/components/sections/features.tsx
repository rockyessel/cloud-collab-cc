import React from "react";
import NextImage from "../reusables/next-image";

const FeaturesSection = () => {
  return (
    <div className="self-center w-full max-w-[1071px] mt-20 px-5 max-md:max-w-full max-md:mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-3/12 max-md:w-full max-md:ml-0">
          <div className="flex grow flex-col max-md:mt-10">
            <NextImage
              width={100}
              height={100}
              alt=""
              src="/org.svg"
              className="aspect-[1.03] object-contain object-center w-[33px] justify-center items-center overflow-hidden max-w-full self-start"
            />
            <div className="justify-center text-white text-xl leading-9 self-stretch whitespace-nowrap mt-3">
              For Organizations
            </div>
            <div className="justify-center text-white text-opacity-60 text-base leading-6 self-stretch mt-1.5">
              Effortlessly manage your
              <br />
              organization and files securely.
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch w-[26%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex grow flex-col max-md:mt-10">
            <NextImage
              width={100}
              height={100}
              alt=""
              src="/team.svg"
              className="aspect-[1.03] object-contain object-center w-[33px] justify-center items-center overflow-hidden max-w-full self-start"
            />
            <div className="justify-center text-white text-xl leading-9 whitespace-nowrap mt-3 self-start">
              For Teams & Collaboration
            </div>
            <div className="justify-center text-white text-opacity-60 text-base leading-6 mt-3 self-start">
              Simplify teamwork
              <br />
              and secure file sharing
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch w-[26%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex flex-col max-md:mt-10">
            <NextImage
              width={100}
              height={100}
              alt=""
              src="/security.svg"
              className="aspect-[1.03] object-contain object-center w-[33px] justify-center items-center overflow-hidden max-w-full self-start"
            />
            <div className="justify-center text-white text-xl leading-9 whitespace-nowrap mt-3 self-start">
              For Data Security
            </div>
            <div className="justify-center text-white text-opacity-60 text-base leading-6 mt-3 self-start">
              Protect your information
              <br />
              with top-notch encryption
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch w-[23%] ml-5 max-md:w-full max-md:ml-0">
          <div className="flex grow flex-col max-md:mt-10">
            <NextImage
              width={100}
              height={100}
              alt=""
              src="/effective.svg"
              className="aspect-[1.03] object-contain object-center w-[33px] justify-center items-center overflow-hidden max-w-full self-start"
            />
            <div className="justify-center text-white text-xl leading-9 self-stretch whitespace-nowrap mt-3">
              For Efficiency
            </div>
            <div className="justify-center text-white text-opacity-60 text-base leading-6 self-stretch mt-1.5">
              Streamline your workflow
              <br />
              and get more done
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
