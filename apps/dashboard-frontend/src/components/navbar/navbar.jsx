"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";

const navigation = [{ name: "Docs", href: "/documentation" }];

export default function Navbar() {
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 bg-black/10"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <p className="font-bold">Feedflow</p>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <div className="flex items-center">
          <a className="text-right mr-6" href="/documentation">
            Docs
          </a>
          <p className="rounded-full aspect-square w-8 bg-lightBlue flex justify-center items-center">
            Y
          </p>
        </div>
      </nav>
    </header>
  );
}
