import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Installation() {
  const codeString = "(num) => num + 1";
  return (
    <>
      <div className="shadow-xl border-[1px] border-black/10 rounded-lg p-6 aspect-video  transition-all duration-100 bg-white  ">
        <p className="text-p-lg font-bold">Install snippet</p>
        <p className="text-p-md">
          Copy and paste this project's script code into the head element of
          your site
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={docco}
          className="mt-4 rounded-md"
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </>
  );
}
