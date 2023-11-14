import NextLink from "../reusables/next-link";
import UserDropdownMenu from "./user-down-menu";
import { ThemeButton } from "../actions/theme-btn";
import NextImage from "../reusables/next-image";
import LogoSVG from "../reusables/logo";

const DashboardNav = () => {
  return (
    <header className="px-4 py-1 border-b border-[#003143] h-[4.5rem] flex items-center justify-between">
      <NextLink href="/">
        <LogoSVG fill={"#f43f5e"} width={100} height={100} />
      </NextLink>
      <div className="flex items-center grow">
        <div className="ml-auto flex items-center gap-2">
          <UserDropdownMenu />
        </div>
      </div>
    </header>
  );
};

export default DashboardNav;
