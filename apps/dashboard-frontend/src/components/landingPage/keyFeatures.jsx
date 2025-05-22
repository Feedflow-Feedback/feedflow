import Feature from "./feature";
export default function KeyFeatures() {
  const features = [
    {
      title: "In Context Feedback",
      description:
        "Clients can provide feedback on the content they are viewing, allowing for more relevant and contextual discussions.",
      icon: "icon1.png",
    },
    {
      title: "Collaborative Discussion",
      description: "Description of feature 2",
      icon: "icon2.png",
    },
    {
      title: "Open Source",
      description: "Description of feature 3",
      icon: "icon3.png",
    },
  ];

  return (
    <>
      <div>
        <p>Key feautres</p>
        <p>Enhance your website with these powerful tools.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </>
  );
}
