import React from "react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h2 className="text-p-lg">404 Error</h2>
      <p>Oops! The page you're looking for does not exist.</p>
      <a href="/" className="text-white bg-orange py-2 px-4 rounded-md">
        <button>Go Back</button>
      </a>
    </div>
  );
};

export default PageNotFound;
