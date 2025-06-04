export default function TutorialOverlayStep({ text, title, step }) {
  return (
    <>
      <div className="flex text-p-lg text-black">
        <p>{step}. </p>
        <p className="ml-1">{title}</p>
      </div>
      <p className="text-black">{text}</p>
    </>
  );
}
