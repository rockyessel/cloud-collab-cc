import NextLink from "../reusables/next-link";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-blue-400 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023 <NextLink href="/">MaaCloud™</NextLink>. All Rights Reserved.
      </span>
      <div className="flex flex-wrap items-center mt-3 text-sm font-medium dark:text-gray-400 sm:mt-0">
        <p>
          File security and encryption is powered by{" "}
          <NextLink href="/">Pangea</NextLink>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
