export const getScoreAngle = (angle: number, maxScoreRotate = 10): number => {
  const absAngle = Math.abs(angle > 180 ? angle - 180 : angle)
  // indicates if we rotate left / right
  const multiplier = absAngle < 90 ? 1 : -1

  const biggerAngle = absAngle > 90 ? absAngle : 180 - absAngle

  const rotate = biggerAngle - maxScoreRotate < 90 ? biggerAngle - 90 : maxScoreRotate

  return rotate * multiplier
}
