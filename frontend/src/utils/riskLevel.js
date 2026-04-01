export function getRiskLevel(score, threshold) {
  const numericScore = Number(score);
  const numericThreshold = Number(threshold);

  if (numericScore < numericThreshold) {
    return '안전';
  }

  if (numericScore < 0.75) {
    return '위험';
  }

  return '매우 위험';
}

export function getRiskClass(score, threshold) {
  const level = getRiskLevel(score, threshold);
  if (level === '안전') return 'safe';
  if (level === '위험') return 'warning';
  return 'critical';
}

export function isThresholdExceeded(score, threshold) {
  return Number(score) >= Number(threshold);
}
