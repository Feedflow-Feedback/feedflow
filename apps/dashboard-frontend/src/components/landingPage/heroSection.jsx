export default function HeroSection() {
  return (
    <>
      <div>
        <div className="flex flex-col justify-center  h-screen  ">
          <div>
            <h1 className="text-4xl font-bold text-center mb-4">
              Welcome to Feedflow
            </h1>
            <p className="text-lg text-center mb-8">
              Your one-stop solution for all your feedfack management needs.
            </p>
          </div>
          <img
            src="https://via.placeholder.com/150"
            alt="Feedflow Logo"
            className="mb-8"
          />
          <button className="inline-flex justify-center rounded-md  px-8 py-2 text-sm font-semibold bg-orange w-min text-white shadow-xs cursor-pointer text-nowrap">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}
