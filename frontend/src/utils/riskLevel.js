export function getRiskLevel(score, threshold) {
  const numericScore = Number(score);
  const numericThreshold = Number(threshold);

  if (numericScore < numericThreshold) {
    return '낮음';
  }

  if (numericScore < 0.75) {
    return '보통';
  }

  return '높음';
}

export function isThresholdExceeded(score, threshold) {
  return Number(score) >= Number(threshold);
}
