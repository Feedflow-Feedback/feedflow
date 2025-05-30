import IndividualFeedback from "./individualFeedback";

export default function feedbacks({ feedbacks, update }) {
  return (
    <div>
      {feedbacks.map((feedback, index) => {
        return (
          <div className="pt-6 px-4 " key={index}>
            <IndividualFeedback feedback={feedback} update={update} />
          </div>
        );
      })}
    </div>
  );
}
