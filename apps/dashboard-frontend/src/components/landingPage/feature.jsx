export default function feature({ title, description, icon }) {
  return (
    <>
      <div className="bg-white rounded-md md:p-8 p-6">
        <div className="flex items-center mb-2">
          <img src={icon} alt={title} className="w-8 h-8" />
          <p className="text-p-lg font-bold ml-4">{title}</p>
        </div>

        <p className="text-p-md text-black/70">{description}</p>
      </div>
    </>
  );
}
