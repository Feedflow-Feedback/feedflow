import { useState } from "react";
import "./styles.css";
export default function projectPreview({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  const mountedStyle = {
    animation: "inAnimation 250ms ease-in",
  };
  const unmountedStyle = {
    animation: "outAnimation 270ms ease-out",
    animationFillMode: "forwards",
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`shadow-xl border-[1px] border-black/10 rounded-lg p-6 aspect-video  transition-all duration-100 bg-white ${isHovered ? "blur-[3px]" : ""}`}
      >
        <div className="flex justify-between flex-col h-full ">
          <div>
            <p className="text-p-lg font-bold">{project.name}</p>
            <p className="text-p-sm mt-2">{project.description}</p>
          </div>

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
              />
            </svg>

            <p className="text-p-sm ml-1">{project.url}</p>
          </div>
        </div>
      </div>
      <div
        className={`w-full h-full absolute top-0 left-0  justify-center items-center transition-all duration-300 transition-discrete hidden ${isHovered ? "!flex" : "opacity-0"}`}
        style={isHovered ? mountedStyle : unmountedStyle}
      >
        <a href={`/project/${project.id}`}>
          <button className="text-white bg-orange px-4 py-2 rounded-md cursor-pointer">
            View Project
          </button>
        </a>
      </div>
    </div>
  );
}
