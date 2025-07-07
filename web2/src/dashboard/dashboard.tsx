"use client";

import { useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Chat } from "../chat/Chat";
import { Sidebar } from "./sidebar";
import { DashboardContext } from "./dashboardContext";
import type { DashboardContextType } from "./dashboardContext";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function Dashboard() {
  const { handleSidebarOpen } = useContext(DashboardContext) as DashboardContextType;

  return (
    <div className="h-full flex overflow-hidden bg-gray-100">
      <Sidebar />
      {/* Contenido principal */}
      <div className="flex flex-col flex-1 lg:pl-72 overflow-hidden">
        {/* Navbar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button onClick={() => handleSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
            <Bars3Icon className="size-6" />
          </button>
          <div className="h-6 w-px bg-gray-900/10 lg:hidden" />
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form className="flex-1 grid grid-cols-1">
              <input
                type="search"
                placeholder="Search"
                className="col-start-1 row-start-1 block w-full pl-8 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm"
              />
              <MagnifyingGlassIcon className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400" />
            </form>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                <BellIcon className="size-6" />
              </button>
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />
              <Menu as="div" className="relative">
                <MenuButton className="-m-1.5 flex items-center p-1.5">
                  <img
                    className="size-8 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt=""
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span className="ml-4 text-sm font-semibold text-gray-900">Tom Cook</span>
                    <ChevronDownIcon className="ml-2 size-5 text-gray-400" />
                  </span>
                </MenuButton>
                <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5">
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a className="block px-3 py-1 text-sm text-gray-900 hover:bg-gray-50" href={item.href}>
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-hidden p-4 my-2">
          <div className="p-2 h-full">
            <Chat />
          </div>
        </main>
      </div>
    </div>
  );
}
