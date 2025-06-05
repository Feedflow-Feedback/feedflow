export default function TutorialOverlayStep({ text, title, step }) {
  return (
    <>
      <div className="flex md:text-p-lg text-p-md text-black">
        <p>{step}. </p>
        <p className="ml-1">{title}</p>
      </div>
      <p className="text-black  text-p-sm">{text}</p>
    </>
  );
}
