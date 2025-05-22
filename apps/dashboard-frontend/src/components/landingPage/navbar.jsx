"use client";
import logo from "@/assets/logo.svg";

export default function Navbar() {
  const navigation = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Docs", href: "/docs" },
  ];

  //const currentRoute = pathname?.split("/")[1] || "";

  const pathname = window.location.pathname;

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className=" flex items-center justify-between p-4 lg:px-8 border-b border-black/20 border-2 shadow-md"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <p className="font-bold text-p-md">Feedflow</p>
          </a>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
          {navigation.map((item) => (
            <div key={item.name}>
              <a
                href={item.href}
                className={`inline-flex items-center border-b-2 px-1 pt-1  ${pathname === item.href ? "border-orange " : "border-transparent"} `}
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 ml-8">
          <a href="/register">
            <button className="inline-flex justify-center rounded-md  px-4 py-1.5 text-sm font-semibold bg-white w-min border-1 border-orange text-orange shadow-xs cursor-pointer text-nowrap">
              Register
            </button>
          </a>
          <a href="/login">
            <button className="inline-flex justify-center rounded-md  px-4 py-1.5 text-sm font-semibold bg-orange w-min border-1 border-orange text-white shadow-xs cursor-pointer text-nowrap">
              Login
            </button>
          </a>
        </div>
      </nav>
    </header>
  );
}
