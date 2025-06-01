import feedbackBubble from "../../assets/keyFeatures/bubble-chat.png";
import click from "../../assets/keyFeatures/click.png";
import code from "../../assets/keyFeatures/code.png";

export default function howItWorks({}) {
  const howItWorks = [
    {
      title: "Client Submits Feedback",
      description:
        "Clients interact with the website, leaving deedback directly on elmenents.",
      icon: click,
    },
    {
      title: "Developer Reviews",
      description:
        "Developer review feedback within the platfrom, prioritizing and addressing issues.",
      icon: feedbackBubble,
    },
    {
      title: "Implemnet Changes",
      description:
        "Developers implement changes based on feedback, ensuring client satisfaction.",
      icon: code,
    },
  ];

  return (
    <>
      <div className="container mx-auto  py-24 px-8 lg:px-x">
        <div className="flex flex-col justify-center col-span-3">
          <p className="text-h-md font-bold">How it works</p>
          <p className="text-p-lg mb-8">
            A simple workflow for efficient feedback collection.
          </p>
        </div>
        <div>
          {/* <img
            src="https://www.feedflow.io/static/media/how-it-works.0c4f3a2b.png"
            alt="How it works"
            className="mb-8 w-full"
          /> */}
          {/* mobile */}
          <div className="md:hidden bg-white p-4 rounded-lg shadow-md border-[0.5px] border-lightGray">
            {howItWorks.map((howItWork, index) => (
              <div key={index} className="mb-4 flex ">
                <div className="flex flex-col items-center mr-4">
                  <img
                    src={howItWork.icon}
                    alt={howItWork.title}
                    className="w-14  z-10 mb-2"
                  />

                  {index < howItWorks.length - 1 && (
                    <div className="w-px bg-black/20 flex-grow mt-1 h-8"></div>
                  )}
                </div>
                <div>
                  <p className="font-bold">{howItWork.title}</p>
                  <p className="text-black/70">{howItWork.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* desktop */}
          <div className="hidden md:flex gap-4">
            {howItWorks.map((howItWork, index) => (
              <div
                key={index}
                className="mb-4 p-4 bg-white rounded-lg shadow-md border-[0.5px] border-lightGray"
              >
                <div className="flex  items-center mr-4 ">
                  <img
                    src={howItWork.icon}
                    alt={howItWork.title}
                    className="w-8  z-10"
                  />
                  <p className="font-bold ml-2">{howItWork.title}</p>
                </div>
                <div className="mt-2">
                  <p className="text-black/70">{howItWork.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
