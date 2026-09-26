exports.diagnose = ({ parsedAnswer, questionMeta }) => {
  // questionMeta = backend-defined info about question
  // example: { needsDisplacement: true }

  // Case 1: Conceptual mistake
  if (
    questionMeta.needsDisplacement &&
    parsedAnswer.usedVelocityEq
  ) {
    return {
      errorType: "Conceptual",
      misconception: "Velocity vs Displacement",
      explanation:
        "You used velocity equation where displacement equation was required."
    };
  }

  // Case 2: Procedural mistake
  if (
    !parsedAnswer.usedVelocityEq &&
    !parsedAnswer.usedDisplacementEq
  ) {
    return {
      errorType: "Procedural",
      misconception: "Incorrect formula selection",
      explanation:
        "Correct formula was not applied for this type of question."
    };
  }

  // Default: Calculation / minor error
  return {
    errorType: "Calculation",
    misconception: "Arithmetic / sign error",
    explanation:
      "Your approach seems correct, but there may be a calculation mistake."
  };
};
