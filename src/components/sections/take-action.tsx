import React from "react";
import NextImage from "../reusables/next-image";

const TakeAction = () => {
  return (
    <div className="self-stretch flex w-full flex-col pt-36 pb-1 px-20 max-md:max-w-full max-md:pt-24 max-md:px-5">
      <div className="w-full flex justify-center items-center">
        <NextImage
          width={100}
          height={100}
          alt=""
          src="/point.svg"
          className="rotate-90"
        />
      </div>
      <div className="self-center flex w-[492px] max-w-full grow flex-col">
        <div className="justify-center text-rose-500 text-center text-5xl font-bold leading-[61px] self-stretch max-md:max-w-full max-md:text-4xl max-md:leading-[53px]">
          <span className="text-white">
            Manage Your Organisation now.
            <br />
          </span>
          <span className="text-rose-500">Take action.</span>
        </div>
        <div className="justify-center text-white text-center text-lg leading-8 self-center whitespace-nowrap mt-3">
          And it is completely free.
        </div>
        <div className="justify-center text-slate-900 text-center text-base leading-5 self-center whitespace-nowrap items-center bg-rose-500 w-[122px] max-w-full mt-9 px-4 py-5 rounded-2xl">
          Register
        </div>
      </div>
    </div>
  );
};

export default TakeAction;
