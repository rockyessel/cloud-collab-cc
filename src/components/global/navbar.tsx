"use client";

import { useState } from "react";
import { ThemeButton } from "../actions/theme-btn";
import Container from "../reusables/container";
import AuthBtn from "../actions/auth-btn";
import NextImage from "../reusables/next-image";
import Button from "../reusables/button";

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <nav className="">
      <Container className="flex items-center justify-between">
        <div className="flex items-center" aria-label="Home" role="img">
          <NextImage
            width={100}
            height={100}
            className="cursor-pointer w-16 h-16"
            src="/logo.svg"
            alt="logo"
          />
          <p className="ml-2 lg:ml-4 text-base lg:text-2xl font-bold text-gray-800">
            MaaCloud
          </p>
        </div>
        <div>
          <Button
            onClick={() => setShow(!show)}
            className="sm:block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            menu
          </Button>
          <div
            id="menu"
            className={`md:block lg:block ${show ? "" : "hidden"}`}
          >
            <Button
              onClick={() => setShow(!show)}
              className="block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white md:bg-transparent z-30 top-0 mt-3"
            >
              <NextImage
                width={100}
                height={100}
                className="h-8 w-8"
                src="/logo.svg"
                alt="hide"
              />
            </Button>
            <ul className="flex text-3xl md:text-base items-center py-8 md:flex flex-col md:flex-row justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-white md:bg-transparent  z-20">
              <li className="text-gray-600 text-lg hover:text-gray-800 cursor-pointer md:ml-10 pt-10 md:pt-0">
                <AuthBtn />
              </li>
              <li className="text-gray-600 text-lg hover:text-gray-800 cursor-pointer md:ml-10 pt-10 md:pt-0">
                <ThemeButton />
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
