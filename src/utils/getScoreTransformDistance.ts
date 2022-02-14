// Any point (x,y) on the path of the circle is x=r∗sin(θ),y=r∗cos(θ)

export const getScoreTransformDistance = (angle: number, scoreCutShift = 15) => {
  const radians = (angle * Math.PI) / 180

  const x = Math.cos(radians) * scoreCutShift
  const y = Math.sin(radians) * scoreCutShift

  return {
    x0: -x,
    y0: y,
    x1: x,
    y1: -y
  }
}
