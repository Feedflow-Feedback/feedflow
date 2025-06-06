import { toPng } from "html-to-image";

export const takeScreenshot = async () => {
  try {
    const dataUrl = await toPng(document.body, {
      cacheBust: true,
      style: {
        transform: "scale(1)",
        transformOrigin: "top left",
      },
    });

    return dataUrl;
  } catch (err) {
    console.error("Screenshot failed:", err);
    return null;
  }
};
