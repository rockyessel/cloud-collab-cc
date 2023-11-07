import ExternalImg from "../reusables/external-img";
import NextImage from "../reusables/next-image";
import NextLink from "../reusables/next-link";

const HeroSection = () => {
  return (
    <div className="self-center w-full mt-20 pr-44 max-md:max-w-full max-md:mt-10 max-md:pr-5">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-[52%] max-md:w-full max-md:ml-0">
          <div className="flex flex-col my-auto max-md:max-w-full max-md:mt-10">
            <div className="justify-center text-rose-500 text-6xl font-bold leading-[69.6px] self-start max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
              <span className="text-white">
                Organizational File
                <br />
                Management Simplified.
                <br />
                Elevate Now.
                <br />
              </span>
              <span className="text-rose-500">Powered by Pangea.</span>
            </div>
            <div className="justify-center text-white text-lg leading-8 mt-5 self-start max-md:max-w-full">
              Simplify organization-wide file management and collaboration.
              Create and manage your organization with ease, all while ensuring
              data security through customizable permissions and encryption.
            </div>
            <div className="justify-center text-slate-900 text-center text-base leading-5 whitespace-nowrap items-center bg-rose-500 w-[267px] max-w-full mt-6 pl-4 pr-4 py-5 rounded-2xl self-start">
              Get Started
            </div>
            <div className="justify-center text-white text-opacity-60 text-sm leading-6 whitespace-nowrap mt-3.5 self-start max-md:max-w-full">
              *
              {`Get Authenticated to Begin Your Organization and Team's
                  Journey`}
              .
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch w-[48%] ml-5 max-md:w-full max-md:ml-0">
          <NextImage
            width={500}
            height={500}
            alt=""
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/919a1a99-37d0-42f0-8915-16174dda671b?apiKey=331e0e30f65c4a9dafd410e2c2e475a4&"
            className="aspect-[1.22] object-contain object-center w-full justify-center items-center overflow-hidden grow max-md:max-w-full max-md:mt-10"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
