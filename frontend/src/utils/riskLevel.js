export function getRiskLevel(score, threshold) {
  const numericScore = Number(score);
  const numericThreshold = Number(threshold);

  if (numericScore < numericThreshold) {
<<<<<<< HEAD
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
=======
    return '낮음';
  }

  if (numericScore < 0.75) {
    return '보통';
  }

  return '높음';
>>>>>>> 4523a0d1596787f772943c7a86dec937ab52ccd0
}

export function isThresholdExceeded(score, threshold) {
  return Number(score) >= Number(threshold);
}
