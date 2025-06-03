import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useState } from "react";

import TabsNavigation from "@/components/tabsNavigation/tabsNavigation";
export default function Installation() {
  const codeStringHTML = "(num) => num + 1";

  const codeStringVue = "(num) => num + 1";
  const codeStringVue2 = "(num) => num + 1";

  const codeStringReact = "(num) => num + 1";
  const codeStringReact2 = "(num) => num + 1";

  const tabs = [
    { label: "Plain HTMl" },
    { label: "Vue/Nuxt" },
    { label: "React/Next" },
  ];

  const [activeTab, setActiveTab] = useState("Plain HTMl");
  return (
    <>
      <div className="shadow-xl border-[1px] border-black/10 rounded-lg p-6 aspect-video  transition-all duration-100 bg-white  ">
        <TabsNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />

        <p className="py-4 text-p-md">
          Add this code to your Project so you can start collection Feedback
        </p>
        {activeTab === "Plain HTMl" && (
          <div>
            <SyntaxHighlighter
              language="javascript"
              style={docco}
              className=" rounded-md"
            >
              {codeStringHTML}
            </SyntaxHighlighter>
          </div>
        )}

        {activeTab === "Vue/Nuxt" && (
          <div>
            <SyntaxHighlighter
              language="javascript"
              style={docco}
              className=" rounded-md"
            >
              {codeStringVue}
            </SyntaxHighlighter>
            <SyntaxHighlighter
              language="javascript"
              style={docco}
              className=" rounded-md"
            >
              {codeStringVue2}
            </SyntaxHighlighter>
          </div>
        )}
        {activeTab === "React/Next" && (
          <div>
            <SyntaxHighlighter
              language="javascript"
              style={docco}
              className=" rounded-md"
            >
              {codeStringReact}
            </SyntaxHighlighter>
            <SyntaxHighlighter
              language="javascript"
              style={docco}
              className=" rounded-md"
            >
              {codeStringReact2}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </>
  );
}
