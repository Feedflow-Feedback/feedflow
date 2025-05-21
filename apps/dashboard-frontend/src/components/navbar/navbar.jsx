"use client";

import logoutIcon from "@/assets/icons/logoutIcon.png";

import { useAuthStore } from "@/stores/authStore";

export default function Navbar() {
  const clearToken = useAuthStore((state) => state.clearToken);

  function handleLogout() {
    clearToken();
    window.location.href = "/";
  }
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
          <div className="cursor-pointer" onClick={handleLogout}>
            <img
              src={logoutIcon}
              alt="logout"
              className="inline-block ml-2 h-4 "
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
