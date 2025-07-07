import { type DashboardContextType } from "./dashboardContext";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from "@headlessui/react";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { DashboardContext } from "./dashboardContext";
import { ChatContext, type ChatContextType } from "../chat/chatProvider";
import { Link } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Sidebar = () => {
  const { sidebarOpen, handleSidebarOpen } = useContext(DashboardContext) as DashboardContextType;
  const { chats } = useContext(ChatContext) as ChatContextType;

  return (
    <>
      {/* Sidebar móvil */}
      <Dialog open={sidebarOpen} onClose={handleSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button type="button" onClick={() => handleSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <div className="text-xs font-semibold text-gray-400">Chats</div>
                    <ul className="-mx-2 mt-2 space-y-1">
                      {chats.map((chat) => (
                        <li key={chat.id}>
                          <Link
                            to={`/chat/${chat.id}`}
                            className={classNames(
                              "text-gray-400 hover:bg-gray-800 hover:text-white",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                            )}
                          >
                            <span className="truncate ml-2">{chat.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <a
                      href="#"
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                    >
                      <Cog6ToothIcon className="size-6 shrink-0" />
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Sidebar desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-gray-900 px-6 pb-4">
        <div className="flex h-16 items-center">
          <img
            className="h-8 w-auto"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul className="-mx-2 space-y-1"></ul>
            </li>
            <li>
              <div className="text-xs font-semibold text-gray-400">Your teams</div>
              <ul className="-mx-2 mt-2 space-y-1">
                <li>
                  <Link
                    to={`/`}
                    className={classNames(
                      "text-gray-400 hover:bg-gray-800 hover:text-white",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                    )}
                  >
                    <span className="truncate ml-2">New chat</span>
                  </Link>
                </li>
                {chats.slice(0, 10).map((chat) => (
                  <li key={chat.id}>
                    <Link
                      to={`/chat/${chat.id}`}
                      className={classNames(
                        "text-gray-400 hover:bg-gray-800 hover:text-white",
                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                      )}
                    >
                      <span className="truncate ml-2">{chat.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <a
                href="#"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <Cog6ToothIcon className="size-6 shrink-0" />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
