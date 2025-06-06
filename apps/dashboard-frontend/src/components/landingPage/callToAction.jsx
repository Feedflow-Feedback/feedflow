export default function callToAction() {
  return (
    <>
      <div className="container mx-auto  py-24 px-8 lg:px-x pb-48">
        <div className="flex justify-center ">
          <div className="flex flex-col justify-center max-w-lg">
            <h5 className="text-h-md font-bold mb-4 text-center">
              Ready to stremline your feedback process?
            </h5>
            <p className="text-p-lg text-center mb-8">
              Join our community and start collectioing feedback directly on
              your website today.
            </p>
            <a href="/register " className="w-full flex justify-center">
              <button className="inline-flex justify-center rounded-md  px-8 py-2 text-sm font-semibold bg-orange w-min text-white shadow-xs cursor-pointer text-nowrap">
                Get Started
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
