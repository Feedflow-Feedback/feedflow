import landingPageImage from "@/assets/images/landingPage.png";
export default function HeroSection() {
  return (
    <>
      <div className="container mx-auto  py-40 px-8 lg:px-x">
        <div className="grid grid-cols-7  ">
          <div className="flex flex-col justify-center col-span-3">
            <h1 className="text-h-l font-bold mb-4">Welcome to Feedflow</h1>
            <p className="text-p-lg  mb-8">
              Your one-stop solution for all your feedfack management needs.
            </p>
            <a href="/register">
              <button className="inline-flex justify-center rounded-md  px-8 py-2 text-sm font-semibold bg-orange w-min text-white shadow-xs cursor-pointer text-nowrap">
                Get Started
              </button>
            </a>
          </div>
          <div className="flex flex-col justify-end col-span-4">
            <img
              src={landingPageImage}
              alt="2 Person talking"
              className="mb-8 w-2xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}
