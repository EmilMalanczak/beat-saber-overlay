export const transformRadiansToAngle = (radians: number): number => {
  const degrees = (180 * radians) / Math.PI

  return (360 + Math.round(degrees)) % 360
}
