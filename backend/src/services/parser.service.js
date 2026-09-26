exports.parseAnswer = (answerText) => {
  const lower = answerText.toLowerCase();

  return {
    raw: answerText,
    normalized: lower,
    usedVelocityEq: lower.includes("v = u + at"),
    usedDisplacementEq: lower.includes("s = ut"),
  };
};
