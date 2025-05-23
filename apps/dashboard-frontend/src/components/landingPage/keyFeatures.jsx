import Feature from "./feature";
import feedbackBubble from "../../assets/keyFeatures/bubble-chat.png";
import click from "../../assets/keyFeatures/click.png";
import code from "../../assets/keyFeatures/code.png";

export default function KeyFeatures() {
  const features = [
    {
      title: "In Context Feedback",
      description:
        "Clients can provide feedback on the content they are viewing, allowing for more relevant and contextual discussions.",
      icon: click,
    },
    {
      title: "Collaborative Discussion",
      description:
        "Engage in real-time discussions with clients, clarifying feedback and addressing concerns promptly.",
      icon: feedbackBubble,
    },
    {
      title: "Open Source",
      description:
        "Our platfrom is open source, allowing for customization and community-driven improvements.",
      icon: code,
    },
  ];

  return (
    <>
      <div className="bg-lightBlue">
        <div className="container mx-auto py-24 px-8 lg:px-x">
          <div className="text-white">
            <h2 className="text-h-md ">Key feautres</h2>
            <p className="text-p-lg">
              Enhance your website with these powerful tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {features.map((feature, index) => (
              <Feature
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
