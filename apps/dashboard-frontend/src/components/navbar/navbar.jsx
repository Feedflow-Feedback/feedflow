"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";

const navigation = [{ name: "Docs", href: "/documentation" }];

export default function Navbar() {
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className=" flex items-center justify-between p-4 lg:px-8 bg-black/10"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <p className="font-bold">Feedflow</p>
          </a>
        </div>

        <div className="flex items-center">
          <a className="text-right mr-6" href="/documentation">
            Docs
          </a>
          <p className="rounded-full aspect-square w-8 bg-lightBlue flex justify-center items-center">
            {/* User initial or avatar could go here */}Y
          </p>
        </div>
      </nav>
    </header>
  );
}
