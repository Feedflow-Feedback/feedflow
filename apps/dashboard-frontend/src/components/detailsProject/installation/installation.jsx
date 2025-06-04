import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useState } from "react";

import TabsNavigation from "@/components/tabsNavigation/tabsNavigation";
export default function Installation() {
  const codeStringHTML =
    "<script src='YOUR_FEEDBACK_DOMAIN/feedback-widget.iife.js'></script>";
  const codeStringHTML2 = `<script>
    window.PROJECT_ID = 'YOUR_PROJECT_ID';
    FeedbackWidget?.init?.({container: 'feedback-widget-container'});
</script>`;

  const codeStringVue = `onMounted(() => {
  if (window.FeedbackWidget) {
    window.PROJECT_ID = "YOUR_PROJECT_ID";
    window.FeedbackWidget.init();
  }
});`;
  const codeStringVue2 = `script: [{
      src: "YOUR_FEEDBACK_DOMAIN/feedback-widget.iife.js",
      defer: true,
      type: "text/javascript",
    },
  ],`;

  const codeStringReact = `useEffect(() => {
    const script = document.createElement("script");
    script.src = "YOUR_FEEDBACK_DOMAIN/feedback-widget.iife.js";
    script.async = true;

    script.onload = () => {
      window.PROJECT_ID = "YOUR_PROJECT_ID";
      window.FeedbackWidget?.init?.({ container: "feedback-widget-container" });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);`;

  const tabs = [
    { label: "Plain HTMl" },
    { label: "Vue/Nuxt" },
    { label: "React" },
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
          <div className="space-y-2">
            <SyntaxHighlighter
              language="javascript"
              style={docco}
              className=" rounded-md"
            >
              {codeStringHTML}
            </SyntaxHighlighter>
            <SyntaxHighlighter
              language="javascript"
              style={docco}
              className=" rounded-md"
            >
              {codeStringHTML2}
            </SyntaxHighlighter>
          </div>
        )}

        {activeTab === "Vue/Nuxt" && (
          <div className="space-y-2">
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
        {activeTab === "React" && (
          <div>
            <SyntaxHighlighter
              language="javascript"
              style={docco}
              className=" rounded-md"
            >
              {codeStringReact}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </>
  );
}
