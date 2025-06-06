"use client";

import logoutIcon from "@/assets/icons/logoutIcon.png";

import { useAuthStore } from "@/stores/authStore";

export default function Navbar() {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  function handleLogout() {
    clearAuth();
    window.location.href = "/";
  }
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className=" flex items-center justify-between p-4 lg:px-8 border-b border-black/20 border-2 shadow-md"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Feedflow</span>
            <p className="font-bold">Feedflow</p>
          </a>
        </div>

        <div className="flex items-center">
          <div className="cursor-pointer" onClick={handleLogout}>
            <img
              src={logoutIcon}
              alt="logout"
              className="inline-block ml-4 h-4 "
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
