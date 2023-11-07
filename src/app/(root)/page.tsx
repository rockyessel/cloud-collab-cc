import Navbar from "@/components/global/navbar";
import LogoSVG from "@/components/reusables/logo";
import NextImage from "@/components/reusables/next-image";
import FeaturesSection from "@/components/sections/features";
import HeroSection from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import OverviewSection from "@/components/sections/overview";
import TakeAction from "@/components/sections/take-action";

const Home = () => {
  return (
    <div className="bg-slate-900 flex flex-col">
      <div className="self-center flex w-full max-w-[1600px] flex-col mt-12 max-md:max-w-full max-md:mt-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <div className="self-center w-full mt-20 px-5 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[85%] max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col max-md:max-w-full max-md:mt-10">
                <OverviewSection />
                <HowItWorks />
              </div>
            </div>
          </div>
        </div>
      </div>

      <TakeAction />
      <div className="justify-center text-white text-lg leading-7 whitespace-nowrap ml-20 mt-16 mb-14 self-start max-md:ml-2.5 max-md:my-10">
        <LogoSVG fill={"#f43f5e"} width={100} height={100} />
      </div>
    </div>
  );
};

export default Home;
