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
      <div className="self-center flex w-full max-w-[1600px] flex-col mt-12">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <div className="self-center w-full mt-20 px-5">
          <div className="gap-5 flex">
            <div className="flex flex-col w-[85%]">
              <div className="flex grow flex-col">
                <OverviewSection />
                <HowItWorks />
              </div>
            </div>
          </div>
        </div>
      </div>

      <TakeAction />
      <div className="text-white ml-20 mt-16 mb-14 self-start">
        <LogoSVG fill={"#f43f5e"} width={100} height={100} />
      </div>
    </div>
  );
};

export default Home;
