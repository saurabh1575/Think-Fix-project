exports.generateResponse = ({ diagnosis }) => {
  let nextSteps = [];
  let priority = "LOW";

  if (diagnosis.errorType === "Conceptual") {
    priority = "HIGH";
    nextSteps = [
      "Revise the basic concept related to this topic",
      "Watch a short concept explanation video",
      "Solve 3 similar conceptual questions"
    ];
  }

  if (diagnosis.errorType === "Procedural") {
    priority = "MEDIUM";
    nextSteps = [
      "Review the correct formula for this type of problem",
      "Practice step-by-step solved examples",
      "Retry this question"
    ];
  }

  if (diagnosis.errorType === "Calculation") {
    priority = "LOW";
    nextSteps = [
      "Recheck arithmetic steps",
      "Practice calculation-focused questions",
      "Focus on signs and units"
    ];
  }

  return {
    message: `Root cause identified: ${diagnosis.misconception}`,
    why: diagnosis.explanation,
    nextSteps,
    priority
  };
};
