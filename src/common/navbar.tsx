import React from "react";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Navbar = () => {
  return (
    <div className="bg-black w-full p-2 flex items-center fixed z-50 top-0 ">
      <div className=" px-2 sm:px-6 lg:px-8 ">
        <div className="relative flex p-4 items-center justify-between">
          <div className="absolute inset-y-0  flex items-center sm:hidden">
            <Button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <svg
                className="block size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
            </Button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex  space-x-3">
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger className="text-white hover:text-gray-500 px-3 py-2 mt-1.5 font-medium rounded-md ">
                      <a
                        href="#"
                
                      >
                        Home
                      </a>
                    </MenubarTrigger>
                    <MenubarTrigger className="text-white hover:text-gray-500 px-3 py-2 mt-1.5 font-medium rounded-md ">
                      <a
                        href="#"
                      >
                        Dashboard
                      </a>
                    </MenubarTrigger>
                    <MenubarTrigger className="text-white hover:text-gray-500 px-3 py-2 mt-1.5 font-medium rounded-md ">
                      About
                    </MenubarTrigger>
                    <MenubarContent className="bg-black text-white">
                      <MenubarItem>
                        <a
                          href="#"
                          className="text-white hover:text-gray-500 px-3 py-2  font-medium rounded-md "
                        >
                          Thing1
                        </a>
                      </MenubarItem>
                      <MenubarSeparator className="bg-white"/>
                      <MenubarItem>
                        <a
                          href="#"
                          className="text-white hover:text-gray-500 px-3 py-2  font-medium rounded-md "
                        >
                          Thing2
                        </a>
                      </MenubarItem>
                      <MenubarSeparator className="bg-white"/>
                      <MenubarItem>
                        <a
                          href="#"
                          className="text-white hover:text-gray-500 px-3 py-2 font-medium rounded-md "
                        >
                          Thing3
                        </a>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
