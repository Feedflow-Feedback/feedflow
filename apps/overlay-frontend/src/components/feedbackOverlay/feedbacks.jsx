import { useState } from "preact/hooks";
import IndividualFeedback from "./individualFeedback";

export default function feedbacks({ feedbacks }) {
  return (
    <div>
      {feedbacks.map((feedback, index) => {
        return (
          <div className="pt-6 px-4 " key={index}>
            <IndividualFeedback feedback={feedback} />
          </div>
        );
      })}
    </div>
  );
}
